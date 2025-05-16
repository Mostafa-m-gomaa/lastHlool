

// import React from 'react';
// import { useField, useFormikContext } from 'formik';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { format } from 'date-fns';
// import FormikError from './FormikError';
// // import { useFormikContext } from "formik";

// const Custom = ({ name, label, err }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   const isDateField = label.includes("تاريخ");

//   // const handleChange = (val) => {
//   //   setFieldValue(name, val);
//   // };

//   const handleChange = (date) => {
//     const formattedDate = date ? format(date, "dd-MM-yyyy") : "";
//     setFieldValue(field.name, formattedDate);
//   };
//   return (
//     <div className="">
//       <div className="relative flex flex-row items-center [--clr:#1f1f1f] dark:[--clr:#999999]">
//         {isDateField ? (
//           <DatePicker
//             selected={field.value ? new Date(field.value) : null}
//             onChange={handleChange}
//             dateFormat="dd/MM/yyyy"
//             className={`${
//               err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
//             } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
//           />
//         ) : (
//           <input
//             {...field}
//             type="text"
//             className={`${
//               err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
//             } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
//           />
//         )}

//         <label className="absolute left-2 top-[-10px] text-sm text-[--clr] bg-white rounded-md px-3 dark:bg-zinc-800 px-1">
//           {label}
//         </label>
//       </div>

//       {meta.touched && meta.error && (
//         <FormikError>{meta.error}</FormikError>
//       )}
//     </div>
//   );
// };

// export default Custom;


"use client";

import React from "react";
import { useField, useFormikContext } from "formik";
import { format, isValid, parse } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import FormikError from "./FormikError";
import { cn } from "@/lib/utils";

const Custom = ({ name, label, err }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const isDateField = label.includes("تاريخ");

  // ✅ دالة ذكية لتحويل قيمة التاريخ لأي تنسيق إلى كائن Date
  const parseDateValue = (value) => {
    if (!value) return null;

    if (value instanceof Date && isValid(value)) return value;

    // إذا كانت القيمة بصيغة dd-MM-yyyy
    if (typeof value === "string" && /^\d{2}-\d{2}-\d{4}$/.test(value)) {
      const parsed = parse(value, "dd-MM-yyyy", new Date());
      return isValid(parsed) ? parsed : null;
    }

    // إذا كانت القيمة بصيغة ISO
    const parsed = new Date(value);
    return isValid(parsed) ? parsed : null;
  };

  const dateValue = parseDateValue(field.value);

  const handleDateChange = (selectedDate) => {
    if (isValid(selectedDate)) {
      const formatted = format(selectedDate, "dd-MM-yyyy");
      setFieldValue(name, formatted);
    } else {
      setFieldValue(name, "");
    }
  };

  return (
    <div className="mb-4">
      <div className="relative">
        {isDateField ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-white dark:bg-zinc-800 text-black dark:text-white h-[40px] rounded-[10px]",
                  !dateValue && "text-muted-foreground",
                  err || (meta.touched && meta.error)
                    ? "border-red-500 border-[2px]"
                    : ""
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue ? format(dateValue, "dd-MM-yyyy") : "اختر تاريخ"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={handleDateChange}
                initialFocus
                captionLayout="dropdown"
                fromYear={1970}
                toYear={new Date().getFullYear() + 10}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <input
            {...field}
            type="text"
            className={cn(
              "text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border",
              err || (meta.touched && meta.error)
                ? "border-red-500 border-[2px]"
                : ""
            )}
          />
        )}
        <label className="absolute left-3 -top-2.5 text-xs px-1 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
          {label}
        </label>
      </div>

      {meta.touched && meta.error && <FormikError>{meta.error}</FormikError>}
    </div>
  );
};

export default Custom;



// "use client";

// import React from "react";
// import { useField, useFormikContext } from "formik";
// import { format, isValid } from "date-fns";

// import { Calendar as CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import FormikError from "./FormikError";
// import { cn } from "@/lib/utils";

// const Custom = ({ name, label, err }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   const isDateField = label.includes("تاريخ");

//   // تحويل قيمة النص إلى كائن Date صالح
//   // const parseDateValue = (value) => {
//   //   if (!value) return null;

//   //   if (value instanceof Date && isValid(value)) return value;

//   //   if (typeof value === "string" && value.includes("-")) {
//   //     const [day, month, year] = value.split("-");
//   //     const parsedDate = new Date(`${year}-${month}-${day}`);
//   //     return isValid(parsedDate) ? parsedDate : null;
//   //   }

//   //   return null;
//   // };


//   const parseDateValue = (value) => {
//   if (!value) return null;

//   const date = new Date(value);
//   return isValid(date) ? date : null;
// };

//   const dateValue = parseDateValue(field.value);

//   const handleDateChange = (selectedDate) => {
//     if (isValid(selectedDate)) {
//       const formatted = format(selectedDate, "dd-MM-yyyy");
//       setFieldValue(name, formatted);
//     } else {
//       setFieldValue(name, "");
//     }
//   };

//   return (
//     <div className="mb-4">
//       <div className="relative">
//         {isDateField ? (
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"}
//                 className={cn(
//                   "w-full justify-start text-left font-normal bg-white dark:bg-zinc-800 text-black dark:text-white h-[40px] rounded-[10px]",
//                   !dateValue && "text-muted-foreground",
//                   err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {dateValue ? format(dateValue, "dd-MM-yyyy") : "اختر تاريخ"}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={dateValue}
//                 onSelect={handleDateChange}
//                 initialFocus
//                      captionLayout="dropdown"
//           fromYear={1970}
//           toYear={new Date().getFullYear() + 10}
//               />
//             </PopoverContent>
//           </Popover>
//         ) : (
//           <input
//             {...field}
//             type="text"
//             className={`${
//               err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
//             } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
//           />
//         )}

//         <label className="absolute left-3 -top-2.5 text-xs px-1 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
//           {label}
//         </label>
//       </div>

//       {meta.touched && meta.error && (
//         <FormikError>{meta.error}</FormikError>
//       )}
//     </div>
//   );
// };

// export default Custom;






// import React from 'react';
// import { useField, useFormikContext } from 'formik';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { format } from 'date-fns';
// import FormikError from './FormikError';

// const Custom = ({ name, label, err }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   const isDateField = label.includes("تاريخ");

//   const handleDateChange = (date) => {
//     const formattedDate = date ? format(date, "dd-MM-yyyy") : "";
//     setFieldValue(name, formattedDate);
//   };

//   return (
//     <div className="mb-4">
//       <div className="relative">
//         {isDateField ? (
//           <DatePicker
//             selected={field.value ? new Date(field.value.split("-").reverse().join("-")) : null}
//             onChange={handleDateChange}
//             showYearDropdown
//              yearDropdownItemNumber={100} 
//             dateFormat="dd-MM-yyyy"
//             className={`${
//               err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
//             } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
//           />
//         ) : (
//           <input
//             {...field}
//             type="text"
//             className={`${
//               err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
//             } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
//           />
//         )}
//         <label className="absolute left-3 -top-2.5 text-xs px-1 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
//           {label}
//         </label>
//       </div>

//       {meta.touched && meta.error && (
//         <FormikError>{meta.error}</FormikError>
//       )}
//     </div>
//   );
// };

// export default Custom;
