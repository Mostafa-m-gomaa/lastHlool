"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/api/users"
import { DatePickerDemo } from "./DatePicker"
import  InputSearch from "./inputSearch"
import { getProducts } from "@/api/products"
import regions from "@/regions/regions_lite.json"
import cities from "@/regions/cities.json"
import { useState } from "react"

import { getCountries } from '@/api/users';

export function AnalyseFilter({filterChange}) {
const [superVisor, setSupervisor] = React.useState("")
const [salesPerson, setSalesPerson] = React.useState("")
const [validator, setValidator] = React.useState("")
const [country, setCountry] = React.useState("")
  const {data : allUsers} =useQuery({
    queryKey:["users"] ,
    queryFn:getUsers
  })

  const users =allUsers?.data || []
  const [cities, setCities] = useState([]);

  const {data : products} =useQuery({
    queryKey:["products"] ,
    queryFn:getProducts
  })

  const productsItems =products?.data || []
  const [regionId,setRegionId] = React.useState("")
  const [city, setCity] = useState("")
  

    const { data: countries } = useQuery({
      queryKey: ['countries'],
      queryFn: getCountries
    })
    const regions = countries?.data || [];
  return (
<div className="transition-all flex gap-8 relative z-10 bg-white w-full justify-center p-2 items-center shadow-md  "> 
<div className="transition-all max-w-[95%] relative z-10 flex gap-8 bg-white w-full justify-start py-2 px-4 items-center overflow-x-auto ">

    {/* ccccccccccccccccccccccccccccccccccccccccccccccccccc */}
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium">{salesPerson || " المندوب "}</span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{
                filterChange("salesPerson" ,"")
                setSalesPerson("")
            }}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users?.map((item, i) =>
  item?.role === "sales" &&
      <li key={i}>
        <label htmlFor={`salesPerson-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`salesPerson-${i}`} // Unique ID for each radio
            name="salesPerson" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => {
                filterChange("salesPerson", item._id)
                setSalesPerson(item.name)
            }}
          />

          <span className="text-sm font-medium text-gray-700">
            {item.name}
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
    {/* ccccccccccccccccccccccccccccccccccccccccccccccccccc */}
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {validator || "المطابق"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{
                filterChange("validator" ,"")
                setValidator("")
            }}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users?.map((item, i) =>
  item?.role === "validator" &&
      <li key={i}>
        <label htmlFor={`validator-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`validator-${i}`} // Unique ID for each radio
            name="validator" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            checked={validator === item.name}
            onChange={() => {
                filterChange("validator", item._id)
                setValidator(item.name)
            }}
          />

          <span className="text-sm font-medium text-gray-700">
            {item.name}
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
    {/* ccccccccccccccccccccccccccccccccccccccccccccccccccc */}
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {superVisor || "المشرف"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{
                filterChange("supervisor" ,"")
                setSupervisor("")
            }}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users?.map((item, i) =>
  item?.role === "supervisor" &&
      <li key={i}>
        <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`supervisor-${i}`} // Unique ID for each radio
            name="supervisor" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => {
                filterChange("supervisor", item._id)
                setSupervisor(item.name)
            }}
          />

          <span className="text-sm font-medium text-gray-700">
            {item.name}
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
    {/* ccccccccccccccccccccccccccccccccccccccccccccccccccc */}
{/* <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {country || "البلد"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{
                filterChange("country" ,"")
                setCountry("")
            }}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {regions?.map((item, i) =>
  
      <li key={i}>
        <label htmlFor={`country-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`country-${i}`} // Unique ID for each radio
            name="country" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => {
                filterChange("country", item.name_ar)
                setCountry(item.name_ar)
            }}
          />

          <span className="text-sm font-medium text-gray-700">
            {item.name_ar}
          </span>
        </label>
      </li>
   
    
  ) }
</ul>

        </div>
      </div>
    </details>
  </div> */}


  {/* dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}


{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {country || "المنطقة"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{
                filterChange("country" ,"")
                setCountry("")
            }}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {regions?.map((item, i) =>
  
      <li key={i}>
        <label htmlFor={`country-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`country-${i}`} // Unique ID for each radio
            name="country" // Ensure all radios belong to the same group
            checked = {item?.title === country}
            className="size-5 rounded-sm border-gray-300"
            onChange={() => {
                filterChange("country", item.title)
                setCountry(item?.title)
                setCities(item?.cities)
            }}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.title}
          </span>
        </label>
      </li>
   
    
  ) }
</ul>

        </div>
      </div>
    </details>
  </div>

{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {city || "المدينة"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{
                filterChange("city" ,"")
                setCity("")
            }}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {cities?.map((item, i) =>
      <li key={i}>
        <label htmlFor={`city-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`city-${i}`} // Unique ID for each radio
            name="city" // Ensure all radios belong to the same group
                        checked = {item === city}

            className="size-5 rounded-sm border-gray-300"
            onChange={() => {
                filterChange("city", item)
                setCity(item)
               
            }}
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

{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}





 
</div>

 
</div>
  )
}


