import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import clsx from "clsx"




export function OrdersTable({orders}) {
  const theOrders = orders || []


 
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

console.log(orders)
  return (
    <div className="h-[70vh] overflow-y-auto bg-white">

   
    <Table className="w-[95%] mx-auto rtl p-2 table-fixed relative">
      <TableHeader className=" bg-gray-100 ">
        <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold *:w-[200px] *:border-2">
          <TableHead className ="">رقم الطلب</TableHead>
          <TableHead className="">المنتج</TableHead>
          <TableHead className="">اسم العميل الاول</TableHead>
          <TableHead className="">رقم هاتف العميل الاول</TableHead>
          <TableHead className="">تاريخ ميلاد العميل الاول</TableHead>
          <TableHead className="">جنس العميل الاول</TableHead>
          <TableHead className="">اسم العميل الثاني</TableHead>
          <TableHead className="">رقم هاتف العميل الثاني</TableHead>
          <TableHead className="">تاريخ ميلاد العميل الثاني</TableHead>
          <TableHead className="">جنس العميل الثاني</TableHead>
          <TableHead className="">اسم العميل الثالث</TableHead>
          <TableHead className="">رقم هاتف العميل الثالث</TableHead>
          <TableHead className="">تاريخ ميلاد العميل الثالث</TableHead>
          <TableHead className="">جنس العميل الثالث</TableHead>
      
       
          <TableHead className="">رقم سند العربون</TableHead>
          
          <TableHead className="">المتبقي علي انتهاء المنتج</TableHead>
    
          <TableHead className="">اسم المشرف</TableHead>
          <TableHead className="">اسم المندوب</TableHead>
          <TableHead className="">تاريخ البيع</TableHead>
          <TableHead className="">الكمية</TableHead>
          <TableHead className="">سعر المنتج</TableHead>
          <TableHead className="">المتبقي منذ دفع العربون</TableHead>
     
          <TableHead className="">العربون</TableHead>
          <TableHead className="">طريقة دفع العربون</TableHead>
          <TableHead className ="">المبلغ المتبقي للطلب</TableHead>
          <TableHead className="">تاريخ التسليم المتوقع</TableHead>
          <TableHead className="">تاريخ التسليم الفعلي</TableHead>
          <TableHead className="">سند التسليم</TableHead>
          <TableHead className="">اصدار البطاقة</TableHead>
         
          <TableHead className="">عمولة المشرف</TableHead>
          <TableHead className="">عمولة المندوب</TableHead>
          <TableHead className ="">مسئول التوصيل</TableHead>
          <TableHead className ="">عمولة التوصيل</TableHead>
          <TableHead className="">حالة التوصيل</TableHead>
          <TableHead className="">المنطة</TableHead>
          <TableHead className="">المدينة</TableHead>
          <TableHead className="">ملاحظات</TableHead>
          <TableHead className="">تاريخ التحديث</TableHead>
          <TableHead className="">تاريخ الانشاء</TableHead>
          <TableHead className ="">تاريخ انتهاء المنتج</TableHead>
          <TableHead className ="">عربون اضافي 1 </TableHead>
          <TableHead className ="">سند عربون اضافي 1</TableHead>
          <TableHead className ="">طريقة دفع عربون اضافي 1</TableHead>
          <TableHead className ="">عربون اضافي 2 </TableHead>
          <TableHead className ="">سند عربون اضافي 2</TableHead>
          <TableHead className ="">طريقة دفع عربون اضافي 2</TableHead>
          <TableHead className ="">عربون اضافي 3 </TableHead>
          <TableHead className ="">سند عربون اضافي 3</TableHead>
          <TableHead className ="">طريقة دفع عربون اضافي 3</TableHead>
          
        </TableRow>
        </TableHeader>
   

<TableBody >
  {theOrders.length > 0 ? (
    theOrders.map((item, index) => (
      <TableRow key={item._id || index} className="text-[14px] lg:text-[18px] *:w-[200px]">
        <TableCell>{index +1}</TableCell>
        <TableCell> {item?.product || "لايوجد"}</TableCell>

{/* <TableCell >
        {item?.customersData?.map((customer, i) => (
          <div key={i}  className="flex flex-col py-[10px] bg-white">
           <span> {customer?.customerName || "لايوجد"}</span> 
           <span> {customer?.phone || "لايوجد"}</span> 
           <span> {customer?.gender || "لايوجد"}</span> 
           <span> {customer?.birthDate ? formatDate(customer?.birthDate) : "لايوجد"}</span> 
            </div>
        ))}
</TableCell> */}
<TableCell >
  {item?.customersData[0]?.customerName || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[0]?.phone || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[0]?.birthDate || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[0]?.gender || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[1]?.customerName || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[1]?.phone || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[1]?.birthDate || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[1]?.gender || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[2]?.customerName || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[2]?.phone || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[2]?.birthDate || "لايوجد"}
   
</TableCell>
<TableCell >
  {item?.customersData[2]?.gender || "لايوجد"}
   
</TableCell>


     
    
        <TableCell>{item?.receipt || "لايوجد"}</TableCell>
   
        <TableCell>{item?.expireAfter || "لايوجد"}</TableCell>
      
        <TableCell>{item?.supervisor?.name || "لايوجد"}</TableCell>
        <TableCell>{item?.salesPerson?.name || "لايوجد"}</TableCell>
        <TableCell>{formatDate(item?.sellingDate)}</TableCell>
        <TableCell>{item?.quantity || "لايوجد"}</TableCell>
        <TableCell>{item?.productPrice || "لايوجد"}</TableCell>
        <TableCell>{item?.daysAgo}</TableCell>
        <TableCell>{item?.deposit || "لايوجد"}</TableCell>
        <TableCell>{item?.depositPaymentMethod || "لايوجد"}</TableCell>
        <TableCell>{ item?.remainingAmount || "لايوجد"}</TableCell>
       
        <TableCell>{formatDate(item?.deliveryDate)}</TableCell>
        <TableCell>{item?.actualDeliveryDate? formatDate(item?.actualDeliveryDate) : "لم يتم التسليم"}</TableCell>
        <TableCell>{item?.DeliveryReceipt || "لايوجد"}</TableCell>
      
        <TableCell>{item?.productIssuanceDate ?formatDate(item.productIssuanceDate) : "لا يوجد"}</TableCell>
        {/* <TableCell>{item?.restMoneyPaymentMethod || "لايوجد"}</TableCell> */}
        <TableCell>{item?.supervisorCommission || "لايوجد"}</TableCell>
        <TableCell>{item?.salesManCommission || "لايوجد"}</TableCell>
        <TableCell>{item?.deliveryMan?.name || "لايوجد"}</TableCell>
        <TableCell>{item?.deliveryCommission || "لايوجد"}</TableCell>
        <TableCell>{item?.deliveryStatus || "لايوجد"}</TableCell>
        <TableCell>{item?.country || "لايوجد"}</TableCell>
        <TableCell>{item?.city || "لايوجد"}</TableCell>
        <TableCell>{item?.notes || "لايوجد"}</TableCell>
        <TableCell>{formatDate(item?.updatedAt)}</TableCell>
 
        <TableCell>{formatDate(item?.createdAt)}</TableCell>
        <TableCell>{formatDate(item?.productEndDate) || "لايوجد"}</TableCell>
        {item?.extraDeposits?.length > 0 ?
        item?.extraDeposits?.map((item,i)=>(
          <>
          <TableCell>{item?.deposit || "لايوجد"}</TableCell>
          <TableCell>{item?.receipt || "لايوجد"}</TableCell>
          <TableCell>{item?.paymentMethod || "لايوجد"}</TableCell>
          </>
        ))
       
        :
       <>
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
          <TableCell>لا يوجد</TableCell> 
        </>
                 }
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={16} className="text-center">
        No orders available.
      </TableCell>
    </TableRow>
  )}
</TableBody>


    </Table>
    </div>
  )
}






