import { getHistory } from "@/api/orders";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react"

import { Link } from "react-router-dom"
import Loader from "./Loader";
import { HistoryFilter } from "./HistoryFilter";
import { useEffect } from "react";



export function HistoryDialog({id}) {
    
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
const [filters,setFilters]= useState({
paidAt : "" ,
createdAt :""

})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};


    const [open, setOpen] = useState(false);

    const {data , isLoading } =useQuery({
      queryKey: ['history', filters,id],
      queryFn:({queryKey})=>{
        const param = queryKey[1] || []

        return getHistory(id , param)
      },
      enabled: open, // Only fetch when the dialog is open
    })
    const history = data?.data || []; 
useEffect(() => {
  if (!open) {
    setFilters({ paidAt: "", createdAt: "" });
  }
}, [open]);
    // if (isLoading) {  
    //  return <Loader />
    // }
  return (
    <Dialog  open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button >السجل</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto"   disableOutsidePointerEvents>
        <DialogHeader>
          <DialogTitle>سجل الاموال</DialogTitle>
 
        </DialogHeader>
           <HistoryFilter filterChange={handleFilterChange} />


<div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {history?.map((item,index)=>( 
              history.length === 0 ? <div> لا يوجد سجل لهذا المشرف</div> :
            <div className="flex bg-slate-400 p-4 rounded-md w-[90%] mx-auto my-2 flex-col gap-2 items-end" key={index}>
                <span>{item?.amount}</span>
                <span>{item?.type}</span>
                <span>{item?.paidAt ?formatDate(item?.paidAt) : "لم يتم الدفع بعد" } : تاريخ الدفع</span>
                <span>{formatDate(item?.createdAt)} : تاريخ الانشاء</span>
                {item?.reason && <span className="flex "> {item?.reason} <span>: السبب</span></span>}
                {item.report &&  <Button>
<Link to={`/home/onereport/${item?.report}`}>
        التقرير
</Link>
    </Button> }
                </div>
          ))}
            </div>

    
   
      </DialogContent>
    </Dialog>
  )
}
