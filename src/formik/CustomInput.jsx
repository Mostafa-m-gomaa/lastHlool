

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


import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import FormikError from './FormikError';

const Custom = ({ name, label, err }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const isDateField = label.includes("تاريخ");

  const handleDateChange = (date) => {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : "";
    setFieldValue(name, formattedDate);
  };

  return (
    <div className="mb-4">
      <div className="relative">
        {isDateField ? (
          <DatePicker
            selected={field.value ? new Date(field.value.split("-").reverse().join("-")) : null}
            onChange={handleDateChange}
            showYearDropdown
             yearDropdownItemNumber={100} 
            dateFormat="dd-MM-yyyy"
            className={`${
              err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
            } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
          />
        ) : (
          <input
            {...field}
            type="text"
            className={`${
              err || (meta.touched && meta.error) ? "border-red-500 border-[2px]" : ""
            } text-black dark:text-white pl-2 h-[40px] pr-[40px] w-full bg-white dark:bg-zinc-800 rounded-[10px] border`}
          />
        )}
        <label className="absolute left-3 -top-2.5 text-xs px-1 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
          {label}
        </label>
      </div>

      {meta.touched && meta.error && (
        <FormikError>{meta.error}</FormikError>
      )}
    </div>
  );
};

export default Custom;
