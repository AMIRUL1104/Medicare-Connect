/**
 * generateTimeSlots — derives bookable time slots from a doctor's
 * workingHours + slotDuration. NEVER hardcoded, NEVER stored in DB.
 *
 * @param {Array<{start: string, end: string}>} workingHours - e.g. [{ start: "10:00", end: "13:00" }]
 * @param {number} slotDuration - in minutes, e.g. 30
 * @returns {string[]} array of formatted slots, e.g. ["10:00 AM", "10:30 AM", ...]
 */
export function generateTimeSlots(workingHours = [], slotDuration = 30) {
  const slots = [];

  for (const range of workingHours) {
    const [startH, startM] = range.start.split(":").map(Number);
    const [endH, endM] = range.end.split(":").map(Number);

    let current = startH * 60 + startM; // minutes since midnight
    const end = endH * 60 + endM;

    while (current + slotDuration <= end) {
      slots.push(minutesToLabel(current));
      current += slotDuration;
    }
  }

  return slots;
}

/** Converts minutes-since-midnight to a "h:mm AM/PM" label. */
function minutesToLabel(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const minutesStr = String(minutes).padStart(2, "0");
  return `${hours}:${minutesStr} ${period}`;
}

/**
 * getAvailableSlots — the core booking-truth rule:
 *   generatedSlots - bookedSlots = availableSlots
 *
 * @param {Array<{start: string, end: string}>} workingHours
 * @param {number} slotDuration
 * @param {string[]} bookedSlots - from the appointments collection, NOT the doctor model
 * @returns {{ slot: string, isBooked: boolean }[]}
 */
export function getAvailableSlots(
  workingHours,
  slotDuration,
  bookedSlots = [],
) {
  const allSlots = generateTimeSlots(workingHours, slotDuration);
  return allSlots.map((slot) => ({
    slot,
    isBooked: bookedSlots.includes(slot),
  }));
}

/**
 * getBookableDates — next N days, filtered to only the doctor's
 * availableDays (weekday names like "Monday", "Saturday").
 *
 * @param {string[]} availableDays - e.g. ["Saturday", "Monday", "Wednesday"]
 * @param {number} rangeDays - how many days ahead to generate (14–30)
 * @returns {Date[]} array of bookable Date objects
 */
export function getBookableDates(availableDays = [], rangeDays = 21) {
  const WEEKDAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < rangeDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const weekday = WEEKDAY_NAMES[date.getDay()];

    if (availableDays.includes(weekday)) {
      dates.push(date);
    }
  }

  return dates;
}

/** Formats a Date to "YYYY-MM-DD" — matches the appointments API's date format. */
export function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
