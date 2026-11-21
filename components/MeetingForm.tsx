'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { createMeeting, updateMeeting, type State } from '../lib/actions';
import type { SacramentMeeting } from '../lib/types';

const initialState: State = { message: null, errors: {} };

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const isEditMode = Boolean(meeting);
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(action, initialState);

  const [date, setDate] = useState(meeting?.date ?? '');
  const [meetingType, setMeetingType] = useState(
    meeting?.meetingType ?? 'regular'
  );
  const [presiding, setPresiding] = useState(meeting?.presiding ?? '');
  const [conducting, setConducting] = useState(meeting?.conducting ?? '');
  const [openingHymnNumber, setOpeningHymnNumber] = useState(
    meeting ? String(meeting.openingHymn.number) : ''
  );
  const [openingHymnTitle, setOpeningHymnTitle] = useState(
    meeting?.openingHymn.title ?? ''
  );
  const [openingPrayer, setOpeningPrayer] = useState(
    meeting?.openingPrayer ?? ''
  );
  const [sacramentHymnNumber, setSacramentHymnNumber] = useState(
    meeting ? String(meeting.sacramentHymn.number) : ''
  );
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState(
    meeting?.sacramentHymn.title ?? ''
  );
  const [closingHymnNumber, setClosingHymnNumber] = useState(
    meeting ? String(meeting.closingHymn.number) : ''
  );
  const [closingHymnTitle, setClosingHymnTitle] = useState(
    meeting?.closingHymn.title ?? ''
  );
  const [closingPrayer, setClosingPrayer] = useState(
    meeting?.closingPrayer ?? ''
  );
  const [announcements, setAnnouncements] = useState(
    (meeting?.announcements ?? []).join('\n')
  );
  const [wardBusiness, setWardBusiness] = useState(
    (meeting?.wardBusiness ?? []).map((item) => item.description).join('\n')
  );
  const [speakers, setSpeakers] = useState(
    (meeting?.speakers ?? [])
      .map((item) => `${item.name} | ${item.topic} | ${item.type}`)
      .join('\n')
  );
  const [stakeBusiness, setStakeBusiness] = useState(
    meeting?.stakeBusiness ?? false
  );

  const inputClass =
    'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700';

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900">
          Meeting Details
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Meeting Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
              aria-describedby="date-error"
              aria-invalid={Boolean(state.errors?.date?.length)}
              required
            />
            <div id="date-error" aria-live="polite" aria-atomic="true">
              {state.errors?.date?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="meetingType"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Meeting Type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              value={meetingType}
              onChange={(e) =>
                setMeetingType(e.target.value as SacramentMeeting['meetingType'])
              }
              className={inputClass}
              aria-describedby="meetingType-error"
              aria-invalid={Boolean(state.errors?.meetingType?.length)}
              required
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
            </select>
            <div id="meetingType-error" aria-live="polite" aria-atomic="true">
              {state.errors?.meetingType?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="presiding"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Presiding
            </label>
            <input
              id="presiding"
              name="presiding"
              type="text"
              value={presiding}
              onChange={(e) => setPresiding(e.target.value)}
              placeholder="e.g., Bishop Thompson"
              className={inputClass}
              aria-describedby="presiding-error"
              aria-invalid={Boolean(state.errors?.presiding?.length)}
              required
            />
            <div id="presiding-error" aria-live="polite" aria-atomic="true">
              {state.errors?.presiding?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="conducting"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Conducting
            </label>
            <input
              id="conducting"
              name="conducting"
              type="text"
              value={conducting}
              onChange={(e) => setConducting(e.target.value)}
              placeholder="e.g., Brother Miller"
              className={inputClass}
              aria-describedby="conducting-error"
              aria-invalid={Boolean(state.errors?.conducting?.length)}
              required
            />
            <div id="conducting-error" aria-live="polite" aria-atomic="true">
              {state.errors?.conducting?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t border-gray-200 pt-4">
        <legend className="text-lg font-semibold text-gray-900">
          Hymns &amp; Prayers
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Opening Hymn #
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min={1}
              max={1200}
              value={openingHymnNumber}
              onChange={(e) => setOpeningHymnNumber(e.target.value)}
              className={inputClass}
              aria-describedby="openingHymnNumber-error"
              aria-invalid={Boolean(state.errors?.openingHymnNumber?.length)}
              required
            />
            <div
              id="openingHymnNumber-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.openingHymnNumber?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="openingHymnTitle"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              value={openingHymnTitle}
              onChange={(e) => setOpeningHymnTitle(e.target.value)}
              className={inputClass}
              aria-describedby="openingHymnTitle-error"
              aria-invalid={Boolean(state.errors?.openingHymnTitle?.length)}
              required
            />
            <div
              id="openingHymnTitle-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.openingHymnTitle?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="openingPrayer"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            value={openingPrayer}
            onChange={(e) => setOpeningPrayer(e.target.value)}
            className={inputClass}
            aria-describedby="openingPrayer-error"
            aria-invalid={Boolean(state.errors?.openingPrayer?.length)}
            required
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingPrayer?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-700">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Sacrament Hymn #
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min={1}
              max={1200}
              value={sacramentHymnNumber}
              onChange={(e) => setSacramentHymnNumber(e.target.value)}
              className={inputClass}
              aria-describedby="sacramentHymnNumber-error"
              aria-invalid={Boolean(state.errors?.sacramentHymnNumber?.length)}
              required
            />
            <div
              id="sacramentHymnNumber-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.sacramentHymnNumber?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              value={sacramentHymnTitle}
              onChange={(e) => setSacramentHymnTitle(e.target.value)}
              className={inputClass}
              aria-describedby="sacramentHymnTitle-error"
              aria-invalid={Boolean(state.errors?.sacramentHymnTitle?.length)}
              required
            />
            <div
              id="sacramentHymnTitle-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.sacramentHymnTitle?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Closing Hymn #
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min={1}
              max={1200}
              value={closingHymnNumber}
              onChange={(e) => setClosingHymnNumber(e.target.value)}
              className={inputClass}
              aria-describedby="closingHymnNumber-error"
              aria-invalid={Boolean(state.errors?.closingHymnNumber?.length)}
              required
            />
            <div
              id="closingHymnNumber-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.closingHymnNumber?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="closingHymnTitle"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              value={closingHymnTitle}
              onChange={(e) => setClosingHymnTitle(e.target.value)}
              className={inputClass}
              aria-describedby="closingHymnTitle-error"
              aria-invalid={Boolean(state.errors?.closingHymnTitle?.length)}
              required
            />
            <div
              id="closingHymnTitle-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.closingHymnTitle?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            value={closingPrayer}
            onChange={(e) => setClosingPrayer(e.target.value)}
            className={inputClass}
            aria-describedby="closingPrayer-error"
            aria-invalid={Boolean(state.errors?.closingPrayer?.length)}
            required
          />
          <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingPrayer?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-700">
                {error}
              </p>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t border-gray-200 pt-4">
        <legend className="text-lg font-semibold text-gray-900">
          Program &amp; Business (Optional)
        </legend>

        <div>
          <label
            htmlFor="speakers"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Speakers &amp; Musical Numbers
          </label>
          <p id="speakers-hint" className="mb-1 text-xs text-gray-600">
            One per line in the format: Name | Topic | speaker (or
            musical-number)
          </p>
          <textarea
            id="speakers"
            name="speakers"
            rows={3}
            value={speakers}
            onChange={(e) => setSpeakers(e.target.value)}
            placeholder="Sister Clark | Faith in Action | speaker"
            className={inputClass}
            aria-describedby="speakers-hint speakers-error"
            aria-invalid={Boolean(state.errors?.speakers?.length)}
          />
          <div id="speakers-error" aria-live="polite" aria-atomic="true">
            {state.errors?.speakers?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-700">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="announcements"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Announcements
          </label>
          <p id="announcements-hint" className="mb-1 text-xs text-gray-600">
            Enter one announcement per line.
          </p>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            value={announcements}
            onChange={(e) => setAnnouncements(e.target.value)}
            className={inputClass}
            aria-describedby="announcements-hint announcements-error"
            aria-invalid={Boolean(state.errors?.announcements?.length)}
          />
          <div id="announcements-error" aria-live="polite" aria-atomic="true">
            {state.errors?.announcements?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-700">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="wardBusiness"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Ward Business
          </label>
          <p id="wardBusiness-hint" className="mb-1 text-xs text-gray-600">
            Enter one business item per line.
          </p>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={2}
            value={wardBusiness}
            onChange={(e) => setWardBusiness(e.target.value)}
            className={inputClass}
            aria-describedby="wardBusiness-hint wardBusiness-error"
            aria-invalid={Boolean(state.errors?.wardBusiness?.length)}
          />
          <div id="wardBusiness-error" aria-live="polite" aria-atomic="true">
            {state.errors?.wardBusiness?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-700">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            checked={stakeBusiness}
            onChange={(e) => setStakeBusiness(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-2 focus:ring-blue-700"
            aria-describedby="stakeBusiness-error"
          />
          <label
            htmlFor="stakeBusiness"
            className="text-sm font-medium text-gray-800"
          >
            Includes Stake Business
          </label>
        </div>
        <div id="stakeBusiness-error" aria-live="polite" aria-atomic="true">
          {state.errors?.stakeBusiness?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-700">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" aria-atomic="true">
        {state.message ? (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800"
          >
            {state.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? isEditMode
              ? 'Updating...'
              : 'Saving...'
            : isEditMode
              ? 'Update Meeting'
              : 'Create Meeting'}
        </button>
        <Link
          href="/meetings"
          className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}