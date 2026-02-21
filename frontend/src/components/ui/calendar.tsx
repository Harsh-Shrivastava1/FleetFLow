import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import "react-day-picker/style.css"

type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, ...props }: CalendarProps) {
    return (
        <DayPicker
            className={cn("p-3 relative", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-2 relative mt-4",
                month: "flex flex-col gap-4",
                month_caption: "flex justify-center pt-1 relative items-center text-sm font-medium",
                nav: "flex items-center justify-between absolute w-full z-10 top-1 left-0 right-0 px-1 pointer-events-none",
                button_previous: "h-7 w-7 bg-transparent p-0 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 transition-colors pointer-events-auto",
                button_next: "h-7 w-7 bg-transparent p-0 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 transition-colors pointer-events-auto",
                month_grid: "w-full border-collapse",
                weekdays: "flex",
                weekday: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                week: "flex w-full mt-2",
                day: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center rounded-md transition-colors hover:bg-gray-100 cursor-pointer",
                day_button: "h-9 w-9 flex items-center justify-center rounded-md text-sm",
                selected: "bg-black text-white hover:bg-gray-800 focus:bg-black",
                today: "bg-gray-100 text-gray-900 font-semibold",
                outside: "text-gray-300",
                disabled: "text-gray-300 cursor-not-allowed",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation }) =>
                    orientation === "left" ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    ),
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
