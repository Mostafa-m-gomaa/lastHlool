"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/api/users"
import { DatePickerDemo } from "./DatePicker"
import  InputSearch from "./inputSearch"
import { getProducts } from "@/api/products"


export function UsersFilter({filterChange}) {
const roles = ["supervisor", "admin", "sales", "manager", "validator" ]

  const {data : allUsers} =useQuery({
    queryKey:["users"] ,
    queryFn:getUsers
  })

  const users =allUsers?.data || []

  const {data : products} =useQuery({
    queryKey:["products"] ,
    queryFn:getProducts
  })

  const productsItems =products?.data || []


  return (
<div className="transition-all flex gap-8 relative z-10 bg-white w-full justify-center p-2 items-center shadow-md  "> 
<div className="transition-all max-w-[95%] relative z-10 flex gap-8 bg-white w-full justify-start py-2 px-4 items-center overflow-x-auto ">

    {/* ccccccccccccccccccccccccccccccccccccccccccccccccccc */}
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> الدور </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 transition-all group-open:relative group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded-sm border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("supervisor" ,"")}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {roles?.map((item, i) =>
   
      <li key={i}>
        <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`supervisor-${i}`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("role", item)}
          />

          <span className="text-sm font-medium text-gray-700">
            {item}
          </span>
        </label>
      </li>
    
  ) }
</ul>

        </div>
      </div>
    </details>
  </div>


  {/* dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}



<InputSearch title="اسم الموظف" searchFunc={filterChange} type={"name"} />





 
</div>

 
</div>
  )
}


