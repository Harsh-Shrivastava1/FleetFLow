import * as React from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"
import { cn } from "../../lib/utils"

interface ComboboxOption {
    value: string
    label: string
}

interface ComboboxProps {
    options: ComboboxOption[]
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string
    className?: string
    required?: boolean
}

export function Combobox({
    options,
    value,
    onValueChange,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyText = "No items found.",
    className,
    required,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    const filtered = React.useMemo(() => {
        if (!search) return options
        const q = search.toLowerCase()
        return options.filter(o => o.label.toLowerCase().includes(q))
    }, [options, search])

    const selectedLabel = options.find(o => o.value === value)?.label

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    data-required={required || undefined}
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-50",
                        !selectedLabel && "text-gray-400",
                        className
                    )}
                >
                    <span className="truncate">{selectedLabel || placeholder}</span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="z-50 w-[var(--radix-popover-trigger-width)] rounded-lg border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                    sideOffset={4}
                    align="start"
                >
                    {/* Search input */}
                    <div className="flex items-center border-b border-gray-100 px-3">
                        <Search className="h-4 w-4 shrink-0 text-gray-400" />
                        <input
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex h-9 w-full bg-transparent py-3 pl-2 text-sm outline-none placeholder:text-gray-400"
                        />
                    </div>

                    {/* Options list */}
                    <div className="max-h-60 overflow-y-auto p-1">
                        {filtered.length === 0 ? (
                            <p className="py-6 text-center text-sm text-gray-400">{emptyText}</p>
                        ) : (
                            filtered.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onValueChange(option.value === value ? "" : option.value)
                                        setOpen(false)
                                        setSearch("")
                                    }}
                                    className={cn(
                                        "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-gray-100",
                                        option.value === value && "bg-gray-50 font-medium"
                                    )}
                                >
                                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                        {option.value === value && <Check className="h-4 w-4 text-black" />}
                                    </span>
                                    {option.label}
                                </button>
                            ))
                        )}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
