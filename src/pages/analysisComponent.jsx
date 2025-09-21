import HomeCard from '@/components/HomeCard'
import React , {useState}from 'react'
import { Users } from 'lucide-react';
import MyChart from '@/components/MyChart';
import AreaChartComponent from '@/components/AreaChartFillByValue';
import CustomBarChart from '@/components/CustomBarChart';
import Orders from './Orders';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuery ,useQueryClient } from '@tanstack/react-query';
import { getAnalytics, getOrdersAnalytics } from '@/api/orders';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from '@/components/Loader';
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format, isValid, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { AnalyseFilter } from '@/components/AnalysisFilter';



const AnalyseComp = () => {


const [filters,setFilters]= useState({
salesPerson : "" ,
supervisor :  "",
validator : "" ,
country : "",
city : ""

})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};

const [endDate, setEndDate] = React.useState(() => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
});

const [startDate, setStartDate] = React.useState(() => {
  const end = new Date();
  end.setDate(end.getDate() - 7);
  const day = String(end.getDate()).padStart(2, "0");
  const month = String(end.getMonth() + 1).padStart(2, "0");
  const year = end.getFullYear();
  return `${day}-${month}-${year}`;
});

const {data , isLoading , isError} = useQuery({
    queryKey:['ordersAnalytics',filters,startDate,endDate],
    queryFn:({queryKey})=>{
      const param = queryKey[1] || []
      return getAnalytics(startDate,endDate , param)
    }
})
const parseDate = (str) => {
  const [day, month, year] = str.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return isValid(date) ? date : null;
};

const formatDate = (date) => format(date, "dd-MM-yyyy");
console.log(data)
  return (
    <div className="flex flex-col py-8 gap-4 w-[95%] mx-auto lg:w-[48%] bg-white shadow-md">
      <div className="flex w-[90%]  mx-auto flex-col ">
<div className="flex border-2 border-[#d7d7d7] items-center rounded-md p-2 gap-4 flex-col lg:flex-row mx-auto">
 
<div className="input flex flex-col w-fit static">
  <label
    for="input"
    className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
    >Start Date</label>
 <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none",
        !startDate && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {startDate ? startDate : "اختر التاريخ"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={parseDate(startDate)}
      onSelect={(selectedDate) => {
        if (isValid(selectedDate)) {
          setStartDate(formatDate(selectedDate));
        }
      }}
      initialFocus
      captionLayout="dropdown"
      fromYear={1970}
      toYear={new Date().getFullYear() + 10}
    />
  </PopoverContent>
</Popover>
</div>
<div className="input flex flex-col w-fit static">
  <label
    for="input"
    className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
    >End Date</label>
 <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none",
        !endDate && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {endDate ? endDate : "اختر التاريخ"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={parseDate(endDate)}
      onSelect={(selectedDate) => {
        if (isValid(selectedDate)) {
          setEndDate(formatDate(selectedDate));
        }
      }}
      initialFocus
      captionLayout="dropdown"
      fromYear={1970}
      toYear={new Date().getFullYear() + 10}
    />
  </PopoverContent>
</Popover>
</div>
</div>
<AnalyseFilter filterChange={handleFilterChange}/>
      </div>




    {isLoading ? <Loader />: 
        <div className="flex  flex-col-reverse w-[100%]  p-4 mx-auto ">
          <div className="w-full  p-4 flex flex-col gap-4">
            <AreaChartComponent sales={data?.createdOrdersAnalytics || []}  />
            <CustomBarChart delivered={data?.deliveredOrdersAnalytics || []} />
          </div>
          <div className="w-full flex justify-center flex-wrap  gap-4  p-4 rounded-md ">


            <HomeCard link="/home/manageOrders" icon ={<Users/>} number={data?.categorizedOrders?.created || 0} title="مبيعات  " subTitle="المجموع " color={"bg-[#012af9]"} />
            <HomeCard link="/home/manageOrders" icon ={<Users/>} number={data?.categorizedOrders?.readyToBeDelivered || 0} title="الطلبات الجاهزة" subTitle="المجموع" color={"bg-[#d73364]"} />
            <HomeCard link="/home/manageOrders" icon ={<Users/>} number={data?.categorizedOrders?.delivered || 0} title="التسليمات" subTitle="المجموع" color={"bg-[#d7ab33]"} />
            <HomeCard link="/home/manageOrders" icon ={<Users/>} number={data?.categorizedOrders?.notReadyToBeDelivered || 0} title="الطلبات الغير جاهزة للتسليم" subTitle="المجموع " color={"bg-[#483c80]"} />
            <HomeCard link="/home/manageOrders" icon ={<Users/>} number={data?.categorizedOrders?.delivering || 0} title="طلبات قيد التوصيل" subTitle="المجموع " color={"bg-[#483c80]"} />
            <HomeCard link="/home/reports" icon ={<Users/>} number={data?.categorizedReports?.completed || 0} title="تقارير تمت مطابفتها" subTitle="المجموع " color={"bg-[#51e1b6]"} />
            <HomeCard link="/home/reports" icon ={<Users/>} number={data?.categorizedReports?.pending || 0} title="تقارير لم يتم مطابقتها" subTitle="المجموع " color={"bg-[#51e1b6]"} />
            <HomeCard link="/home/reports" icon ={<Users/>} number={data?.categorizedReports?.processing || 0} title="تقارير قيد المطابقة" subTitle="المجموع " color={"bg-[#51e1b6]"} />
    
  
           
          </div>
        
        </div>}
    </div>
  )
}

export default AnalyseComp