"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import colleges from "@/constants/collegename.json";

export function ExampleCombobox({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[280px] overflow-hidden justify-between"
        >
          {value
            ? colleges.find((college) => college.value === value)?.label
            : "Select college..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search college..." />
          <CommandList>
            <CommandEmpty>No college found.</CommandEmpty>
            <CommandGroup>
              {colleges.map((college, index) => (
                <CommandItem
                  key={index}
                  value={college.value}
                  onSelect={() => {
                    onChange?.(college.value)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === college.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {college.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
