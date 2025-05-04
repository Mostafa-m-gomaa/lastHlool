"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

const frameworks = [
  {
    value: "country",
    label: "البلد",
  },
  {
    value: "createdAt",
    label: "تاريخ الانشاء",
  },
  {
    value: "customerName",
    label: "اسم العميل",
  },
  {
    value: "deliveryDate",
    label: "تاريخ التوصيل",
  },
  {
    value: "salesPerson",
    label: "اسم البائع	",
  },
  {
    value: "sellingDate",
    label: "تاريخ البيع	",
  },
  {
    value: "supervisor",
    label: "المشرف",
  },
  {
    value: "phone",
    label: "رقم الهاتف",
  },
  {
    value: "deliveryStatus",
    label: "حالة التوصيل",
  },

]

export function ComboboxDemo({setVar}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [label, setLabel] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
            {label ? label:"اختر الفلتر" }
      
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
         
          <CommandList>
            
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false) ,
                    setVar(currentValue)
                    setLabel(framework.label)
                    
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
