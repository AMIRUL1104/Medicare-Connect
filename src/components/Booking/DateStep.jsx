"use client";

import { DatePicker } from "@heroui/react"; // Hero UI v3 Date Picker
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { formatDateKey, getBookableDates } from "./slotUtils";

/**
 * DateStep — Step 1 of the booking flow.
 *
 * Uses Hero UI's DatePicker, restricted to the doctor's bookable dates
 * (next 14–30 days, filtered to availableDays). Past dates and
 * non-available weekdays are disabled via `isDateUnavailable`.
 */
export default function DateStep({
  availableDays,
  selectedDate,
  onSelectDate,
}) {
  const bookableDates = getBookableDates(availableDays, 21);
  const bookableDateKeys = new Set(bookableDates.map((d) => formatDateKey(d)));

  const minDate = today(getLocalTimeZone());
  const maxDate = bookableDates.length
    ? parseDate(formatDateKey(bookableDates[bookableDates.length - 1]))
    : minDate;

  function isDateUnavailable(calendarDate) {
    const jsDate = calendarDate.toDate(getLocalTimeZone());
    const key = formatDateKey(jsDate);
    return !bookableDateKeys.has(key);
  }

  function handleChange(calendarDate) {
    if (!calendarDate) {
      onSelectDate(null);
      return;
    }
    const jsDate = calendarDate.toDate(getLocalTimeZone());
    onSelectDate(jsDate);
  }

  const valueAsCalendarDate = selectedDate
    ? parseDate(formatDateKey(selectedDate))
    : null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0EA5E9] text-white text-xs font-bold">
          1
        </span>
        <h3 className="font-semibold text-[#1E293B] text-sm">Select a Date</h3>
      </div>

      <DatePicker
        aria-label="Select appointment date"
        value={valueAsCalendarDate}
        onChange={handleChange}
        minValue={minDate}
        maxValue={maxDate}
        isDateUnavailable={isDateUnavailable}
        granularity="day"
        classNames={{
          base: "w-full",
          inputWrapper:
            "border-[1.5px] border-[#E2E8F0] rounded-[10px] hover:border-[#0EA5E9] data-[focus=true]:border-[#0EA5E9]",
        }}
      />

      <p className="text-xs text-[#94A3B8] mt-2">
        {`Only the doctor's available days within the next 3 weeks are selectable.`}
      </p>
    </div>
  );
}
