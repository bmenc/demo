"use client";
import * as React from "react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type DropdownProps = {
  name?: string;
  value?: string | number;
};

const Dropdown = React.memo(function Dropdown(dropdownProps: DropdownProps) {
  // Ensure name prop is always defined
  const { name = "months", value } = dropdownProps;

  const { fromYear, fromMonth, fromDate, toYear, toMonth, toDate } =
    useDayPicker();
  const { currentMonth, goToMonth } = useNavigation();

  const selectValues = React.useMemo(() => {
    let values: { value: string; label: string }[] = [];
    if (name === "months") {
      values = Array.from({ length: 12 }, (_, i) => ({
        value: i.toString(),
        label: format(new Date(new Date().getFullYear(), i, 1), "MMM"),
      }));
    } else if (name === "years") {
      const earliestYear =
        fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
      const latestYear =
        toYear || toMonth?.getFullYear() || toDate?.getFullYear();

      if (earliestYear && latestYear) {
        const yearLength = latestYear - earliestYear + 1;
        values = Array.from({ length: yearLength }, (_, i) => ({
          value: (earliestYear + i).toString(),
          label: (earliestYear + i).toString(),
        }));
      }
    }
    return values;
  }, [name, fromYear, fromMonth, fromDate, toYear, toMonth, toDate]);

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      const newDate = new Date(currentMonth);
      if (name === "months") {
        newDate.setMonth(parseInt(newValue));
      } else if (name === "years") {
        newDate.setFullYear(parseInt(newValue));
      }
      goToMonth(newDate);
    },
    [currentMonth, name, goToMonth]
  );

  const caption = format(currentMonth, name === "months" ? "MMM" : "yyyy");

  return (
    <Select
      name={name}
      onValueChange={handleValueChange}
      value={value?.toString()}
    >
      <SelectTrigger>{caption}</SelectTrigger>
      <SelectContent>
        {selectValues.map((selectValue) => (
          <SelectItem key={selectValue.value} value={selectValue.value}>
            {selectValue.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

const Calendar = React.memo(function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-white dark:bg-black z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium hidden",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        caption_dropdowns: "flex gap-1",
      }}
      components={{
        Dropdown: Dropdown,
      }}
      {...props}
    />
  );
});

Calendar.displayName = "Calendar";

export { Calendar };
