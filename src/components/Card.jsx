import React from 'react'
import { Button } from './ui/button';
import { PopoverDemo } from './PopOver';
import manIcon from '../assets/man.png'
import womanIcon from '../assets/woman.png'
import { ShowPopOver } from './showCardPopOver';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { cancelTheOrder, deleteOrder, makeOrderAttheDeliver, retrieveOrder } from '@/api/orders';
import { toast } from 'react-hot-toast';
import { Loader2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {ShowImage} from './ShowImage';


const Card = ({number ,item , anim , ...props}) => {
const role = localStorage.getItem("role")

const formatDate = (date) => {
  if (!date) return "لايوجد"; // Return a default value if the date is undefined
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    return date; // Return a fallback value if the date is invalid
  }

  // Extract month, day, and year
  const month = validDate.getMonth() + 1; // Months are zero-based
  const day = validDate.getDate();
  const year = validDate.getFullYear();

  return `${day}/${month}/${year}`;
};
const queryClient = useQueryClient()
const mutation = useMutation({
    mutationKey: "orders",
    mutationFn: () => makeOrderAttheDeliver(item._id),
    onSuccess: (res) => {
    toast.success("تم تحديث حالة الطلب بنجاح");
    queryClient.invalidateQueries("orders")
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
const cancelMutation = useMutation({
    mutationKey: "orders",
    mutationFn: () => cancelTheOrder(item._id),
    onSuccess: (res) => {
    toast.success("تم تحديث حالة الطلب بنجاح");
    queryClient.invalidateQueries("orders")
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
const retrieveMutation = useMutation({
    mutationKey: "orders",
    mutationFn: () => retrieveOrder(item._id),
    onSuccess: (res) => {
    toast.success("تم تحديث حالة و نقله الي غير جاهز للتسليم");
    queryClient.invalidateQueries("orders")
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
const deleteMutation = useMutation({
    mutationKey: "deleteorders",
    mutationFn: () => deleteOrder(item._id),
    onSuccess: (res) => {
    
      if(res?.status === "success"){

        queryClient.invalidateQueries("orders")
        toast.success("تم حذف الطلب بنجاح");
      }
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
   


          return (
            
        <div
        onClick={props.click ? ()=>props.click(item) : null }
        // data-aos={anim ? "fade-right" : ""}
        className=" min-h-fit w-[90%] mx-auto bg-white hover:bg-[#3891da] transition-all shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-2 px-4 space-y-3 relative overflow-hidden"
        >
          <div className="w-14 h-14 lg:w-20 lg:h-20 bg-myBlue rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-1 left-3  lg:bottom-4 lg:left-5 text-white text-[16px] lg:text-[20px]">{number < 10 ? `0${number}`: number}</p>
          </div>
   
   <div className="flex w-[95%] mx-auto justify-between flex-row-reverse  items-center">
    
    <img src={item?.customersData[0]?.gender === "ذكر" ? manIcon : womanIcon} alt=""  className='w-[50px] lg:w-[80px]'/>
    <div className="flex flex-col items-end gap-3 w-[70%]">
    <h2 className="font-bold text-[15px] lg:text-xl">{item?.product || "not-found"}</h2>
                  <div className="max-w-full flex-wrap justify-end flex flex-col lg:flex-row gap-2 text-[10px] lg:text-[15px] px-1 items-end lg:items-center *:min-w-fit  *:flex   *:rounded-md  *:text-center  *:gap-2   ">
                    <div className="flex flex-col items-end gap-2">
                    <div><span>رقم سند العربون</span> : <span>{item.receipt || "لا يوجد رقم سند"}</span> </div>
                    <div><span> اسم العميل الاول</span> : <span>{item?.customersData[0]?.customerName}</span> </div>
                    <div><span> رقم الهاتف</span> : <span>{item?.customersData[0]?.phone}</span> </div>
                    <div><span>تاريخ الميلاد</span> : <span>{item?.customersData[0]?.birthDate}</span> </div>
                    <div><span>تاريخ البيع</span> : <span>{formatDate(item?.sellingDate)}</span> </div>
                    {item?.receiptImage && <ShowImage image={item?.receiptImage} />}                  
                    </div>
                 
                    

                  </div>
    </div>
    {item?.customersData[1]?.customerName &&  <img src={item?.customersData[1]?.gender === "ذكر" ? manIcon : womanIcon} alt=""  className='w-[50px] lg:w-[80px]'/>}
{item?.customersData[1]?.customerName &&     <div className="flex flex-col items-end gap-3 w-[70%]">
                  <div className="max-w-full flex-wrap justify-end flex flex-col lg:flex-row gap-2 text-[10px] lg:text-[15px] px-1 items-end lg:items-center *:min-w-fit  *:flex   *:rounded-md  *:text-center  *:gap-2   ">
                    <div className="flex flex-col items-end gap-2">
                    {item?.customersData[1]?.customerName &&    <div><span> اسم العميل الثاني</span> : <span>{item?.customersData[1]?.customerName}</span> </div> }
                    {item?.customersData[1]?.customerName &&    <div><span>رقم الهاتف</span> : <span>{item?.customersData[1]?.phone}</span> </div> }
                    {item?.customersData[1]?.customerName &&    <div><span>تاريخ الميلاد</span> : <span>{item?.customersData[1]?.birthDate}</span> </div> }
                    </div>
                 
                    

                  </div>
    </div>} 

                <div className="flex flex-col lg:flex-row items-center gap-2">

                  {["manager" , "admin"].includes(role) ? <PopoverDemo id={item._id} /> : null}
                  {/* {["manager" , "admin"].includes(role) && props.deliveryStatus === "جاهز للتسليم" ? <PopoverDemo id={item._id} /> : null} */}
                  {["manager" , "admin"].includes(role) && props.deliveryStatus === "جاهز للتسليم" ? <Button type="button" disabled={mutation.isPending} onClick={mutation.mutate}>{mutation.isPending ? <Loader2Icon className='animate-spin' />:"جعله قيد التوصيل"}</Button> : null}
                  {["manager" , "admin"].includes(role) &&  !["ملغي"].includes(props.deliveryStatus) ? <Button className="bg-red-500" type="button" disabled={cancelMutation.isPending} onClick={cancelMutation.mutate}>{cancelMutation.isPending ? <Loader2Icon className='animate-spin' />:"الغاء الطلب"}</Button> : null}
                  {["manager" , "admin"].includes(role) &&  ["ملغي"].includes(props.deliveryStatus) ? <Button  type="button" disabled={retrieveMutation.isPending} onClick={retrieveMutation.mutate}>{retrieveMutation.isPending ? <Loader2Icon className='animate-spin' />:"استرجاع الطلب"}</Button> : null}
                  {[ "admin"].includes(role)  ? <Button className="bg-red-500" type="button" disabled={deleteMutation.isPending} onClick={deleteMutation.mutate}>{deleteMutation.isPending ? <Loader2Icon className='animate-spin' />:"حذف"}</Button> : null}
                  <ShowPopOver item={item} />
                 <Button onClick ={()=>{localStorage.setItem("theOrder" , JSON.stringify(item))}}><Link to={`/home/editorder/${item._id}`}>تعديل</Link></Button>
                </div>

   </div>
         
    </div>
        
          )
      }


export default Card