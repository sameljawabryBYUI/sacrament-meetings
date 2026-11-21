'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';
import type { SacramentMeeting, SpeakerItem, WardBusinessItem } from './types';

const MeetingFormSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Please enter a valid meeting date (YYYY-MM-DD).'
    ),
  meetingType: z.enum(['regular', 'testimony', 'stake', 'general'], {
    error: 'Please select a valid meeting type.',
  }),
  presiding: z
    .string()
    .trim()
    .min(2, 'Presiding leader name must be at least 2 characters.'),
  conducting: z
    .string()
    .trim()
    .min(2, 'Conducting leader name must be at least 2 characters.'),
  openingHymnNumber: z.coerce
    .number({ error: 'Opening hymn number must be a valid number.' })
    .int('Opening hymn number must be a whole number.')
    .min(1, 'Opening hymn number must be at least 1.')
    .max(1200, 'Opening hymn number must be 1200 or less.'),
  openingHymnTitle: z
    .string()
    .trim()
    .min(2, 'Opening hymn title must be at least 2 characters.'),
  openingPrayer: z
    .string()
    .trim()
    .min(2, 'Opening prayer name must be at least 2 characters.'),
  sacramentHymnNumber: z.coerce
    .number({ error: 'Sacrament hymn number must be a valid number.' })
    .int('Sacrament hymn number must be a whole number.')
    .min(1, 'Sacrament hymn number must be at least 1.')
    .max(1200, 'Sacrament hymn number must be 1200 or less.'),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(2, 'Sacrament hymn title must be at least 2 characters.'),
  closingHymnNumber: z.coerce
    .number({ error: 'Closing hymn number must be a valid number.' })
    .int('Closing hymn number must be a whole number.')
    .min(1, 'Closing hymn number must be at least 1.')
    .max(1200, 'Closing hymn number must be 1200 or less.'),
  closingHymnTitle: z
    .string()
    .trim()
    .min(2, 'Closing hymn title must be at least 2 characters.'),
  closingPrayer: z
    .string()
    .trim()
    .min(2, 'Closing prayer name must be at least 2 characters.'),
  announcements: z.string().optional().default(''),
  wardBusiness: z.string().optional().default(''),
  speakers: z.string().optional().default(''),
  stakeBusiness: z.boolean().default(false),
});

export type MeetingFormField = keyof z.infer<typeof MeetingFormSchema>;

export type State = {
  errors?: Partial<Record<MeetingFormField, string[]>>;
  message?: string | null;
};

function extractRawMeetingForm(formData: FormData) {
  return {
    date: String(formData.get('date') ?? ''),
    meetingType: String(formData.get('meetingType') ?? ''),
    presiding: String(formData.get('presiding') ?? ''),
    conducting: String(formData.get('conducting') ?? ''),
    openingHymnNumber: formData.get('openingHymnNumber') ?? '',
    openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
    openingPrayer: String(formData.get('openingPrayer') ?? ''),
    sacramentHymnNumber: formData.get('sacramentHymnNumber') ?? '',
    sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),
    closingHymnNumber: formData.get('closingHymnNumber') ?? '',
    closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
    closingPrayer: String(formData.get('closingPrayer') ?? ''),
    announcements: String(formData.get('announcements') ?? ''),
    wardBusiness: String(formData.get('wardBusiness') ?? ''),
    speakers: String(formData.get('speakers') ?? ''),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
  };
}

function parseAnnouncements(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseWardBusiness(raw: string): WardBusinessItem[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((description) => ({ description }));
}

function parseSpeakers(raw: string): SpeakerItem[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', topic = '', rawType = ''] = line
        .split('|')
        .map((part) => part.trim());
      const type: SpeakerItem['type'] =
        rawType.toLowerCase() === 'musical-number'
          ? 'musical-number'
          : 'speaker';
      return {
        name,
        topic: topic || 'General',
        type,
      };
    });
}

function buildMeetingPayload(
  data: z.infer<typeof MeetingFormSchema>
): Omit<SacramentMeeting, 'id'> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: parseAnnouncements(data.announcements),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: parseWardBusiness(data.wardBusiness),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: parseSpeakers(data.speakers),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(
    extractRawMeetingForm(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Please fix the highlighted fields before saving the meeting.',
    };
  }

  try {
    await addMeeting(buildMeetingPayload(validatedFields.data));
  } catch (error) {
    console.error('Error creating meeting:', error);
    return {
      message: 'Database Error: Failed to create meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: State,
  formData: FormData
): Promise<State> {
  if (!Number.isInteger(id) || id <= 0) {
    return {
      message: 'Invalid meeting ID.',
    };
  }

  const validatedFields = MeetingFormSchema.safeParse(
    extractRawMeetingForm(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Please fix the highlighted fields before updating the meeting.',
    };
  }

  try {
    const updated = await updateMeetingInDb(
      id,
      buildMeetingPayload(validatedFields.data)
    );
    if (!updated) {
      return {
        message: 'Meeting not found. It may have already been deleted.',
      };
    }
  } catch (error) {
    console.error('Error updating meeting:', error);
    return {
      message: 'Database Error: Failed to update meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/meetings/current');
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid meeting ID.');
  }

  try {
    const deleted = await deleteMeetingInDb(id);
    if (!deleted) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
}