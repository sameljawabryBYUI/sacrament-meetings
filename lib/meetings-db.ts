import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Bishop Smith',
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Brother Allen',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [],
    closingHymn: { number: 143, title: 'Let the Holy Spirit Guide' },
    closingPrayer: 'Sister Allen',
    announcements: ['Fast Sunday today', 'Tithing settlement sign-ups available']
  },
  {
    id: 2,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' },
      { name: 'Brother Davis', topic: 'Enduring to the End', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: Nov 10']
  },
  {
    id: 3,
    date: '2026-11-15',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Carter',
    openingHymn: { number: 270, title: 'I\'ll Go Where You Want Me to Go' },
    openingPrayer: 'Brother Miller',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'Sister Garcia', topic: 'Family History', type: 'speaker' },
      { name: 'Brother Garcia', topic: 'Temple Service', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Miller'
  },
  {
    id: 4,
    date: '2026-11-22',
    meetingType: 'stake',
    presiding: 'Stake President Adams',
    conducting: 'Stake President Adams',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Evans',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'President Adams', topic: 'Stake Vision', type: 'speaker' }
    ],
    closingHymn: { number: 213, title: 'The First Noel' },
    closingPrayer: 'Brother Evans',
    announcements: ['Stake Conference General Session']
  },
  {
    id: 5,
    date: '2026-11-29',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 200, title: 'Christ the Lord Is Risen Today' },
    openingPrayer: 'Sister Lee',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 188, title: 'Thy Will, O Lord, Be Done' },
    speakers: [
      { name: 'Brother Kim', topic: 'Gratitude', type: 'speaker' },
      { name: 'Sister Kim', topic: 'Ministering', type: 'speaker' }
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Lee'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}