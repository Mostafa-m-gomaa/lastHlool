

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getDeliveringOrders } from "@/api/orders"
import { useQuery } from "@tanstack/react-query"
import { ComboboxDemo } from "@/components/CompoBox"
import { DatePickerDemo } from "@/components/DatePicker"
import { PaginationDemo } from "@/components/Pagination"
import SpecCard from "./SpecCard"
import { OrdersFilter } from "./OrdersFilter"

export function DialogDemo({ setOrder, excludedOrderIds = []  , ...props}) {
  const [page, setPage] = useState(1);
 const [filters,setFilters]= useState({
   DeliveryReceipt :"",
   ValidityPeriod :"",
   birthDate:"",
   country:"",
   createdAt:"",
   customerName:"",
   deliveryCommission:"",
   deliveryDate:"",
   deliveryMan:"",
   deliveryStatus:"",
   gender:"",
   orderNumber:"",
   orderPrice:"",
   phone:"",
   productId:"",
   receipt:"",
   salesManCommission:"",
   salesPerson:"",
   sellingDate:"",
   supervisor:"",
   supervisorCommission:"",
   daysAgo:"",
   city:"",
   day :"",
   dateKey: "sellingDate"
 })
 

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const { data: orders, isLoading, isFetching, isError } = useQuery({
    queryKey: ["readyToDeliverOrders", filters, page],
    queryFn: ({ queryKey }) => {
      const params = queryKey[1] || {};
      const page = queryKey[2];
      return getDeliveringOrders(params, page);
    },
  });

  const [theVariable, setTheVariable] = useState("")
  const [queryObj, setQueryObject] = useState({})
  const [activeOrder, setActiveOrder] = useState("")
  const [orderNum, setOrderNum] = useState("")
  const [open, setOpen] = useState(false);
useEffect(() => {
  if(props.name){
    setOrderNum(props.name)
  }
},[])
  const handleSearchChange = (value) => {
    if (theVariable === "") {
      toast.error("اختر الفلتر اولا")
    }
    setQueryObject({ [theVariable]: value })
  }

  const orderItems = orders?.data || [];

  // ✅ فلترة الطلبات المستبعدة
  const filteredOrders = orderItems.filter(
    (item) => !excludedOrderIds.includes(item._id)
  );

  if (isError) {
    return <div>Internet Error</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{orderNum === "" ? "اختر الطلب" : orderNum}</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>الطلبات الخاصة بك</DialogTitle>
        </DialogHeader>

        <div className="max-w-[94%] mx-auto overflow-auto">
          <OrdersFilter filterChange={handleFilterChange} />
        </div>

        <div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
          {filteredOrders.length === 0 && (
            <div className="text-center w-full text-gray-500 mt-4">لا يوجد طلبات متاحة للاختيار</div>
          )}
          {filteredOrders.map((item, index) => (
            <SpecCard
              key={index}
              number={index + 1}
              item={item}
              anim={false}
              click={(item) => {
                setOrder(item)
                setActiveOrder(item._id)
                setOrderNum(item?.product)
                setOpen(false)
              }}
              role="supervisor"
            />
          ))}
        </div>

        <PaginationDemo
          page={page}
          setPage={setPage}
          numberOfPages={orders?.paginationResult?.numberOfPages}
        />
      </DialogContent>
    </Dialog>
  )
}
