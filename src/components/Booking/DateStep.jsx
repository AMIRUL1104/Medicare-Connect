"use client";

import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { formatDateKey, getBookableDates } from "./slotUtils";

/**
 * DateStep — Step 1 of the booking flow.
 *
 * HeroUI v3's DatePicker is composition-based (unlike v2/NextUI) —
 * it requires explicit children: DateField.Group (the text input
 * segments), DatePicker.Trigger (the calendar icon button), and
 * DatePicker.Popover wrapping a full <Calendar> with its own Header/
 * Grid/Cell parts. There's no single "DatePicker" black box — see
 * https://heroui.com/en/docs/react/components/date-picker#anatomy
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
        className="w-full gap-1.5"
      >
        <Label className="sr-only">Appointment date</Label>

        <DateField.Group
          fullWidth
          className="rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white px-1 data-[focus-within=true]:border-[#0EA5E9] data-[focus-within=true]:shadow-[0_0_0_3px_rgba(14,165,233,0.12)] data-[hovered=true]:border-[#0EA5E9]/60 transition-all duration-200"
        >
          <DateField.Input className="flex-1 px-2.5 py-2.5 text-sm text-[#1E293B]">
            {(segment) => (
              <DateField.Segment
                segment={segment}
                className="px-0.5 rounded text-[#1E293B] data-[placeholder=true]:text-[#94A3B8] data-[focused=true]:bg-[#E0F2FE] data-[focused=true]:text-[#0EA5E9] outline-none"
              />
            )}
          </DateField.Input>
          <DateField.Suffix className="pr-2">
            <DatePicker.Trigger className="flex items-center justify-center w-8 h-8 rounded-lg text-[#64748B] hover:bg-[#F0F9FF] hover:text-[#0EA5E9] transition-colors duration-200">
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>

        <DatePicker.Popover className="z-50 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.14)]">
          <Calendar aria-label="Choose appointment date" className="w-full">
            <Calendar.Header className="flex items-center justify-between px-1 pb-2 mb-1 border-b border-[#F1F5F9]">
              <Calendar.YearPickerTrigger className="flex items-center gap-1 text-sm font-semibold text-[#1E293B] rounded-md px-1.5 py-1 hover:bg-[#F0F9FF] transition-colors">
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator className="text-[#64748B]" />
              </Calendar.YearPickerTrigger>
              <div className="flex items-center gap-1">
                <Calendar.NavButton
                  slot="previous"
                  className="flex items-center justify-center w-7 h-7 rounded-md text-[#64748B] hover:bg-[#F0F9FF] hover:text-[#0EA5E9] transition-colors"
                />
                <Calendar.NavButton
                  slot="next"
                  className="flex items-center justify-center w-7 h-7 rounded-md text-[#64748B] hover:bg-[#F0F9FF] hover:text-[#0EA5E9] transition-colors"
                />
              </div>
            </Calendar.Header>
            <Calendar.Grid className="w-full border-collapse">
              <Calendar.GridHeader>
                {(day) => (
                  <Calendar.HeaderCell className="text-[11px] font-semibold text-[#94A3B8] uppercase pb-2">
                    {day}
                  </Calendar.HeaderCell>
                )}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => (
                  <Calendar.Cell
                    date={date}
                    className={[
                      "w-9 h-9 text-sm rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-150",
                      "text-[#1E293B] hover:bg-[#F0F9FF]",
                      "data-[selected=true]:bg-[#0EA5E9] data-[selected=true]:text-white data-[selected=true]:font-semibold",
                      "data-[disabled=true]:text-[#CBD5E1] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:hover:bg-transparent",
                      "data-[unavailable=true]:text-[#CBD5E1] data-[unavailable=true]:line-through data-[unavailable=true]:cursor-not-allowed data-[unavailable=true]:hover:bg-transparent",
                      "data-[outside-month=true]:text-[#E2E8F0]",
                      "data-[today=true]:font-semibold data-[today=true]:text-[#0EA5E9]",
                    ].join(" ")}
                  />
                )}
              </Calendar.GridBody>
            </Calendar.Grid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>

      <p className="text-xs text-[#94A3B8] mt-2">
        {`Only the doctor's available days within the next 3 weeks are selectable.`}
      </p>
    </div>
  );
}
