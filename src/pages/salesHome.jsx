import HomeCard from '@/components/HomeCard'
import React from 'react'
import { Users } from 'lucide-react';
import MyChart from '@/components/MyChart';
import AreaChartComponent from '@/components/AreaChartFillByValue';
import CustomBarChart from '@/components/CustomBarChart';
import Orders from './Orders';
import { useQuery  , useQueryClient} from '@tanstack/react-query';
import { cashVerify, getDuesOverMe, getMineDues } from '@/api/orders';
import { Coins } from 'lucide-react';
import SalesMoneyCard from '@/components/SalesMoneyCard';
import { DollarSign } from 'lucide-react';
import SalesTargets from './SalesTargets';
import Loader from '@/components/Loader';
import { getOrdersAnalytics } from '@/api/orders';
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isValid, parse } from "date-fns";
import { cn } from "@/lib/utils";

const SalesHome = () => {

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
    queryKey:['ordersAnalyticsSales',startDate,endDate],
    queryFn:()=>getOrdersAnalytics(startDate,endDate)
})


    const {data : myCash , isLoading :myCashLoadin , isError : myCahError}=useQuery({
        queryKey:["myCash"],
        queryFn: cashVerify ,
    })
    const {data : myDues ,  isFetching: myDuesFetching,  isLoading : myDuesLoading , isError : myDuesError , refetch   }=useQuery({
        queryKey:["myDues"],
        queryFn: getMineDues,
        retry: 3,
     
    })
    const amount = (myDues?.data || [])
    .filter(item => typeof item.dues === "number") // Ensure it's a number
    .map(item => item.dues)
    .reduce((a, b) => a + b, 0);


    const {data : duesOverMe}=useQuery({
      queryKey :["duesForCompany"],
      queryFn:getDuesOverMe
    })
const cashItems = myCash?.data || []

const parseDate = (str) => {
  const [day, month, year] = str.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return isValid(date) ? date : null;
};

const formatDate = (date) => format(date, "dd-MM-yyyy");
  return (
    <div className="flex flex-col py-8 gap-4">
            <div className="flex w-[90%] mx-auto flex-col lg:flex-row">
<div className="flex border-2 border-[#d7d7d7] items-center rounded-md p-2 gap-4 flex-col lg:flex-row">
 
<div  className="input flex flex-col w-fit static">
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
<div  className="input flex flex-col w-fit static">
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
        <h1 className='bg-white p-4 rounded-md '>لوحة القيادة</h1>
      </div>


      {isLoading ?<Loader /> :     <div className="flex lg:flex-row flex-col-reverse w-[96%] lg:w-[90%]  p-4 mx-auto justify-between ">
          <div className="w-full lg:w-[45%] p-4 flex flex-col gap-4">
            <div className="flex w-full flex-col gap-4 bg-white p-4 rounded-md shadow-lg">
                <div className="flex border-b-2 pb-2 border-black">
                <span className='p-2  rounded-md bg-[#ffd257] text-white'><Coins /></span>
                <h2>تأكيد استلام عمولات</h2>
                </div>
                
                {cashItems?.length > 0 ? 
                <div className="flex flex-col gap-3">
{cashItems?.map((item , i)=>(
    // <div className="flex flex-col gap-2 bg-[black] text-white" key={i}>
    //     <span>المبلغ : {item.amount}</span>
    // </div>
<SalesMoneyCard amount={item?.amount} user={item?.supervisor?.name} id={item?._id}/>
    
))}
                </div>
                : "لا يوجد لديك اي مبالغ للتحصيل"}
            </div>
          
         
          </div>
          <div className="w-full flex flex-col gap-4 lg:w-[55%]  p-4 rounded-md ">
    <div className="flex w-full justify-end gap-4 flex-wrap">

            <HomeCard link={"/home/myorders"} icon ={<Users/>} number={data?.categorizedOrders?.created || 0} title="طلباتك " subTitle="المجموع " color={"bg-[#012af9]"} />
            <HomeCard link={"/home/myorders"} icon ={<Users/>} number={data?.categorizedOrders?.readyToBeDelivered || 0} title="طلباتك التي تم تجهيزها" subTitle="المجموع " color={"bg-[#012af9]"} />
            <HomeCard link={"/home/myorders"} icon ={<Users/>} number={data?.categorizedOrders?.delivered || 0} title="طلباتك المسلمة" subTitle="المجموع " color={"bg-[#d73364]"} />
            <HomeCard link={"/home/myorders"} icon ={<Users/>} number={data?.categorizedOrders?.delivering || 0} title="طلباتك قيد توصيل" subTitle="المجموع " color={"bg-[#d73364]"} />
            <HomeCard link={"/home/myorders"} icon ={<Users/>} number={data?.categorizedOrders?.notReadyToBeDelivered || 0} title="طلباتك غير جاهزة للاستلام" subTitle="المجموع " color={"bg-[#d73364]"} />
            {localStorage.getItem("role") === "supervisor" &&     <HomeCard icon ={<DollarSign />} number={duesOverMe?.dues} title="اموال عليك" subTitle="المحفظة" color={"bg-[#f5b951]"} />}
               <HomeCard icon ={<DollarSign />} number={amount} title="اموالك" subTitle="المحفظة" color={"bg-[#f5b951]"} />
      


    </div>
     {localStorage.getItem("role") === "sales" && <SalesTargets />}
    <CustomBarChart delivered={data?.deliveredOrdersAnalytics || []} />
    {/* <AreaChartComponent /> */}
    <AreaChartComponent sales={data?.createdOrdersAnalytics || []}  />
          </div>
        
        </div>}
    
    </div>
  )
}

export default SalesHome