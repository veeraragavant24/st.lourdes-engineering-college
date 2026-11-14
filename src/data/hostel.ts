/* =========================================================
   HOSTEL DATA  →  save as  src/data/hostel.ts
   The hostel office edits only this file (until an admin
   panel with a database is added).
   ========================================================= */

export type RoomType = {
  type: string;
  totalBeds: number;
  vacantBeds: number;
};

export type HostelBlock = {
  name: string;
  totalRooms: number;
  occupiedRooms: number;
  roomTypes: RoomType[];
  features: string[];
};

export type MessRow = {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export const hostelData = {
  updatedOn: '[DATE]',
  heroImage: '', // paste an image URL here, leave '' for a placeholder box

  boys: {
    name: 'Boys Hostel',
    totalRooms: 0,
    occupiedRooms: 0,
    roomTypes: [
      { type: 'Single', totalBeds: 0, vacantBeds: 0 },
      { type: '2-sharing', totalBeds: 0, vacantBeds: 0 },
      { type: '3-sharing', totalBeds: 0, vacantBeds: 0 },
    ],
    features: [
      '[Feature: warden and security hours]',
      '[Feature: Wi-Fi and study hall]',
      '[Feature: sports and recreation]',
      '[Feature: laundry and power backup]',
    ],
  } as HostelBlock,

  girls: {
    name: 'Girls Hostel',
    totalRooms: 0,
    occupiedRooms: 0,
    roomTypes: [
      { type: 'Single', totalBeds: 0, vacantBeds: 0 },
      { type: '2-sharing', totalBeds: 0, vacantBeds: 0 },
      { type: '3-sharing', totalBeds: 0, vacantBeds: 0 },
    ],
    features: [
      '[Feature: lady warden and CCTV]',
      '[Feature: entry and visitor rules]',
      '[Feature: Wi-Fi and study hall]',
      '[Feature: laundry and power backup]',
    ],
  } as HostelBlock,

  mess: {
    timings: '[BREAKFAST] · [LUNCH] · [DINNER]',
    monthlyFee: '[AMOUNT]',
    menu: [
      { day: 'Monday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
      { day: 'Tuesday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
      { day: 'Wednesday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
      { day: 'Thursday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
      { day: 'Friday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
      { day: 'Saturday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
      { day: 'Sunday', breakfast: '[Items]', lunch: '[Items]', dinner: '[Items]' },
    ] as MessRow[],
  },

  contact: {
    phone: '[PHONE]',
    email: '[EMAIL]',
  },
};