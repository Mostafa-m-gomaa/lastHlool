

"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({searchFunc , ...props}) {
  const [date, setDate] = React.useState()


  const formatDate = (dateObj) => {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // الشهر صفر-مبني
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
};

    const [open, setOpen] = React.useState(false); // تحكم يدوي
 const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      searchFunc(props.type, formatDate(selectedDate));
      setOpen(false); // ✅ اقفل البوب اوفر بعد الاختيار
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{props.title || "اختر تاريخ"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50">
        <Calendar
          mode="single"
          selected={date}

         onSelect={handleDateChange}
             initialFocus
          // يجعل المستخدم قادر على اختيار السنة بسهولة
          captionLayout="dropdown"
          fromYear={1970}
          toYear={new Date().getFullYear() + 10}
        />
      </PopoverContent>
    </Popover>
  )
}




          // onSelect={(selectedDate)=>{
          //   setDate (selectedDate) ;
          //   searchFunc(props.type, formatDate(selectedDate)) ;

          // }}
//           onSelect={(selectedDate) => {
//   setDate(selectedDate),
//   searchFunc(props.type, formatDate(selectedDate))
// }}