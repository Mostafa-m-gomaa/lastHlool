"use client"

import * as React from "react"

import { DatePickerDemo } from "./DatePicker"


export function HistoryFilter({filterChange}) {




  return (
<div className="flex gap-8 bg-white w-full justify-center p-2 items-center shadow-md z-50"> 


  <DatePickerDemo searchFunc={filterChange} title ="تاريخ الدفع" type={"paidAt"} /> 
  {/* <DatePickerDemo searchFunc={filterChange} title ="تاريخ الانشاء" type={"createdAt"} />  */}

 
</div>
  )
}


