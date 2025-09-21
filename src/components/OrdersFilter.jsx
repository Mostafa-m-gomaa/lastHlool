"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { getSalesMan, getUsers } from "@/api/users"
import { DatePickerDemo } from "./DatePicker"
import  InputSearch from "./inputSearch"
import { getAvailableProducts, getProducts } from "@/api/products"

import { useState } from "react"
import { getCountries } from '@/api/users';

export function OrdersFilter({filterChange}) {
const [regionId, setRegionId] = useState(null);
const [city, setCity] = useState("")
const [country, setCountry] = useState("")
const [supervisor, setSupervisor] = useState("")
const [salesMan,setSalesMan] = useState("")
const [deliveryMan,setDeliveryMan] = useState("")
const [product,setProduct]=useState("")

  const [cities, setCities] = useState([]);


  const {data : allUsers} =useQuery({
    queryKey:["users"] ,
    queryFn:getUsers
  })
  const {data : salesMen} =useQuery({
    queryKey:["salesUsers"] ,
    queryFn:getSalesMan
  })
  const users =allUsers?.data || []
  const salesData =salesMen?.data || []
  const {data : products} =useQuery({
    queryKey:["products"] ,
    queryFn:getAvailableProducts
  })

  const productsItems =products?.data || []

    const { data: countries } = useQuery({
      queryKey: ['countries'],
      queryFn: getCountries
    })
    const regions = countries?.data || [];


  return (
<div className="transition-all flex gap-8 relative z-10 bg-white w-full justify-center p-2 items-center shadow-md  "> 
<div className="transition-all max-w-[95%] relative z-10 flex gap-8 bg-white w-full justify-start py-2 px-4 items-center overflow-x-auto ">
{! ["sales" , "supervisor"].includes(localStorage.getItem("role")) &&
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {supervisor || "المشرف"} </span>

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
  {users.length > 0 ? users?.map((item, i) =>
    item.role === "supervisor" && (
      <li key={item._id || i}>
        <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`supervisor-${i}`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            checked = {item?.name === supervisor}
            onChange={() => {filterChange("supervisor", item?._id) ; setSupervisor(item?.name)}}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.name}
          </span>
        </label>
      </li>
    )
  ) : <li className="text-gray-500">لا يوجد مشرفين</li>}
</ul>

        </div>
      </div>
    </details>
  </div>
}

{! ["sales" , "supervisor"].includes(localStorage.getItem("role")) && <div className="relative">
    <details className=" group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="min-w-[100px] text-sm font-medium"> {deliveryMan || "مسئول التوصيل "}</span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{filterChange("deliveryMan" ,"") ; setDeliveryMan("")}}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users.length > 0 ? users?.map((item, i) =>
    item.role === "supervisor" && (
      <li key={item._id || i}>
        <label htmlFor={`delivery-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`delivery-${i}`} // Unique ID for each radio
            name="deliveryFilte" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            checked = {item?.name === deliveryMan}
            onChange={() => {filterChange("deliveryMan", item?._id) ; setDeliveryMan(item?.name)}}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.name}
          </span>
        </label>
      </li>
    )
  ) : <li className="text-gray-500">لا يوجد مسئولين توصيل</li>}
</ul>

        </div>
      </div>
    </details>
  </div>}


{! ["sales" ].includes(localStorage.getItem("role")) && <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {salesMan || "المندوب"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{filterChange("supervisor" ,"") ; setSalesMan("")}}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {salesData.length >  0 ?  salesData?.map((item, i) =>
    
      <li key={item._id || i}>
        <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`supervisor-${i}`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            checked = {item?.name === salesMan}
            onChange={() => {filterChange("salesPerson", item?._id) ; setSalesMan(item?.name)}}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.name}
          </span>
        </label>
      </li>
    
  ) : <li className="text-gray-500">لا يوجد مندوبيين</li>}
</ul>

        </div>
      </div>
    </details>
  </div>}



<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> {product || "المنتج"} </span>

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
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>{filterChange("productId" ,"") ; setProduct("")}}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {productsItems?.map((item, i) =>
    
      <li key={item._id || i}>
        <label htmlFor={`product-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`product-${i}`} // Unique ID for each radio
            name="productFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            checked = {item?.title === product}
            onChange={() => {filterChange("productId", item?._id) ; setProduct(item?.title)}}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.title}
          </span>
        </label>
      </li>
    
  )}
</ul>

        </div>
      </div>
    </details>
  </div>

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
                filterChange("country", item?.title)
                setCountry(item?.title)
                setCities(item.cities)
            }}
          />

          <span className="text-sm font-medium text-gray-700">
            {item.title}
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

{/* <InputSearch title="المنطقة" searchFunc={filterChange} type={"country"} />
<InputSearch title="المدينة" searchFunc={filterChange} type={"city"} /> */}
<InputSearch title="اسم العميل" searchFunc={filterChange} type={"customerName"} />
{! ["sales" , "supervisor"].includes(localStorage.getItem("role")) && <InputSearch title="عمولة التوصيل" searchFunc={filterChange} type={"deliveryCommission"} />}
{! ["sales" , "supervisor"].includes(localStorage.getItem("role")) && <InputSearch title="عمولة المندوب" searchFunc={filterChange} type={"salesManCommission"} />}
{! ["sales" , "supervisor"].includes(localStorage.getItem("role")) && <InputSearch title="عمولة المشرف" searchFunc={filterChange} type={"supervisorCommission"} />}
{! ["sales" , "supervisor"].includes(localStorage.getItem("role")) && <InputSearch title="سعر الطلب" searchFunc={filterChange} type={"orderPrice"} />}
{/* {localStorage.getItem("role") != "sales" && <InputSearch title="مده الصلاحية" searchFunc={filterChange} type={"ValidityPeriod"} />} */}
<InputSearch title="رقم الطلب" searchFunc={filterChange} type={"orderNumber"} />
<InputSearch title="رقم الهاتف" searchFunc={filterChange} type={"phone"} />

  {/* <DatePickerDemo searchFunc={filterChange} title ="تاريخ الانشاء" type={"day"} />  */}
  <DatePickerDemo searchFunc={filterChange} title ="تاريخ البيع" type={"day"} /> 

 
</div>

 
</div>
  )
}



