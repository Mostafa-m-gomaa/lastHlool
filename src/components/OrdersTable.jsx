// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"






// export function OrdersTable({orders}) {
//   const theOrders = orders || []
// console.log(theOrders)

 
//  const formatDate = (date) => {
//   if (!date) return "لايوجد"; // Return a default value if the date is undefined
//   const validDate = new Date(date);

//   if (isNaN(validDate.getTime())) {
//     return date; // Return a fallback value if the date is invalid
//   }

//   // Extract month, day, and year
//   const month = validDate.getMonth() + 1; // Months are zero-based
//   const day = validDate.getDate();
//   const year = validDate.getFullYear();

//   return `${day}/${month}/${year}`;
// };

//   return (
//     <div className="h-[70vh] overflow-y-auto bg-white">

   
//     <Table className="w-[95%] mx-auto rtl p-2 table-fixed relative">
//       <TableHeader className=" bg-gray-100 ">
//         <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold *:w-[200px] *:border-2">
//           <TableHead className ="">رقم الطلب</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">المنتج</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">اسم العميل الاول</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">رقم هاتف العميل الاول</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ ميلاد العميل الاول</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">جنس العميل الاول</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">اسم العميل الثاني</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">رقم هاتف العميل الثاني</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ ميلاد العميل الثاني</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">جنس العميل الثاني</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">اسم العميل الثالث</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">رقم هاتف العميل الثالث</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ ميلاد العميل الثالث</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">جنس العميل الثالث</TableHead>
      
       
//           <TableHead className="sticky top-0 z-10 bg-gray-100">رقم سند العربون</TableHead>
          
//           <TableHead className="sticky top-0 z-10 bg-gray-100">المتبقي علي انتهاء المنتج</TableHead>
    
//           <TableHead className="sticky top-0 z-10 bg-gray-100">اصدار البطاقة</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">اسم المشرف</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">اسم المندوب</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ البيع</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">الكمية</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">سعر المنتج</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">المتبقي منذ دفع العربون</TableHead>
     
//           <TableHead className="sticky top-0 z-10 bg-gray-100">العربون</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">طريقة دفع العربون</TableHead>
//           <TableHead className ="">المبلغ المتبقي للطلب</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ التسليم المتوقع</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ التسليم الفعلي</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">سند التسليم</TableHead>
         
//           <TableHead className="sticky top-0 z-10 bg-gray-100">عمولة المشرف</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">عمولة المندوب</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">مسئول التوصيل</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">عمولة التوصيل</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">حالة التوصيل</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">المنطة</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">المدينة</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">ملاحظات</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ التحديث</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ الانشاء</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">تاريخ انتهاء المنتج</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">عربون اضافي 1 </TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">سند عربون اضافي 1</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">طريقة دفع عربون اضافي 1</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">عربون اضافي 2 </TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">سند عربون اضافي 2</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">طريقة دفع عربون اضافي 2</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">عربون اضافي 3 </TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">سند عربون اضافي 3</TableHead>
//           <TableHead className="sticky top-0 z-10 bg-gray-100">طريقة دفع عربون اضافي 3</TableHead>
          
//         </TableRow>
//         </TableHeader>
   

// <TableBody >
//   {theOrders.length > 0 ? (
//     theOrders.map((item, index) => (
//       <TableRow key={item._id || index} className="text-[14px] lg:text-[18px] *:w-[200px]">
//         <TableCell>{item?.orderNumber || 0}</TableCell>
//         <TableCell> {item?.product || "لايوجد"}</TableCell>

// {/* <TableCell >
//         {item?.customersData?.map((customer, i) => (
//           <div key={i}  className="flex flex-col py-[10px] bg-white">
//            <span> {customer?.customerName || "لايوجد"}</span> 
//            <span> {customer?.phone || "لايوجد"}</span> 
//            <span> {customer?.gender || "لايوجد"}</span> 
//            <span> {customer?.birthDate ? formatDate(customer?.birthDate) : "لايوجد"}</span> 
//             </div>
//         ))}
// </TableCell> */}
// <TableCell >
//   {item?.customersData[0]?.customerName || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[0]?.phone || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[0]?.birthDate || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[0]?.gender || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[1]?.customerName || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[1]?.phone || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[1]?.birthDate || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[1]?.gender || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[2]?.customerName || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[2]?.phone || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[2]?.birthDate || "لايوجد"}
   
// </TableCell>
// <TableCell >
//   {item?.customersData[2]?.gender || "لايوجد"}
   
// </TableCell>


     
    
//         <TableCell>{item?.receipt || "لايوجد"}</TableCell>
   
//         <TableCell>{item?.expireAfter || "لايوجد"}</TableCell>
//         <TableCell>{item?.productIssuanceDate ?formatDate(item.productIssuanceDate) : "لا يوجد"}</TableCell>
      
//         <TableCell>{item?.supervisor?.name || "لايوجد"}</TableCell>
//         <TableCell>{item?.salesPerson?.name || "لايوجد"}</TableCell>
//         <TableCell>{formatDate(item?.sellingDate)}</TableCell>
//         <TableCell>{item?.quantity || "لايوجد"}</TableCell>
//         <TableCell>{item?.productPrice || "لايوجد"}</TableCell>
//         <TableCell>{item?.daysAgo}</TableCell>
//         <TableCell>{item?.deposit || "لايوجد"}</TableCell>
//         <TableCell>{item?.depositPaymentMethod || "لايوجد"}</TableCell>
//         <TableCell>{ item?.remainingAmount || "لايوجد"}</TableCell>
       
//         <TableCell>{formatDate(item?.deliveryDate)}</TableCell>
//         <TableCell>{item?.actualDeliveryDate? formatDate(item?.actualDeliveryDate) : "لم يتم التسليم"}</TableCell>
//         <TableCell>{item?.DeliveryReceipt || "لايوجد"}</TableCell>
      
//         {/* <TableCell>{item?.restMoneyPaymentMethod || "لايوجد"}</TableCell> */}
//         <TableCell>{item?.supervisorCommission || "لايوجد"}</TableCell>
//         <TableCell>{item?.salesManCommission || "لايوجد"}</TableCell>
//         <TableCell>{item?.deliveryMan?.name || "لايوجد"}</TableCell>
//         <TableCell>{item?.deliveryCommission || "لايوجد"}</TableCell>
//         <TableCell>{item?.deliveryStatus || "لايوجد"}</TableCell>
//         <TableCell>{item?.country || "لايوجد"}</TableCell>
//         <TableCell>{item?.city || "لايوجد"}</TableCell>
//         <TableCell>{item?.notes || "لايوجد"}</TableCell>
//         <TableCell>{formatDate(item?.updatedAt)}</TableCell>
 
//         <TableCell>{formatDate(item?.createdAt)}</TableCell>
//         <TableCell>{formatDate(item?.productEndDate) || "لايوجد"}</TableCell>
//         {item?.extraDeposits?.length > 0 ?
//         item?.extraDeposits?.map((item,i)=>(
//           <>
//           <TableCell>{item?.deposit || "لايوجد"}</TableCell>
//           <TableCell>{item?.receipt || "لايوجد"}</TableCell>
//           <TableCell>{item?.paymentMethod || "لايوجد"}</TableCell>
//           </>
//         ))
       
//         :
//        <>
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//           <TableCell>لا يوجد</TableCell> 
//         </>
//                  }
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={16} className="text-center">
//         No orders available.
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>


//     </Table>
//     </div>
//   )
// }



import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function OrdersTable({ orders }) {
  const theOrders = orders || []

  const formatDate = (date) => {
    if (!date) return "لايوجد"
    const validDate = new Date(date)
    if (isNaN(validDate.getTime())) return date
    const month = validDate.getMonth() + 1
    const day = validDate.getDate()
    const year = validDate.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <div className="h-[70vh] overflow-auto bg-white">
      <table className="w-full rtl border-collapse table-fixed">
        <thead className="sticky top-0 z-30 bg-white text-[14px] lg:text-[18px] font-bold *:bg-slate-400">
          <tr className="*:border *:w-[200px]">
            <th>رقم الطلب</th>
            <th>المنتج</th>
            <th>اسم العميل الاول</th>
            <th>رقم هاتف العميل الاول</th>
            <th>تاريخ ميلاد العميل الاول</th>
            <th>جنس العميل الاول</th>
            <th>اسم العميل الثاني</th>
            <th>رقم هاتف العميل الثاني</th>
            <th>تاريخ ميلاد العميل الثاني</th>
            <th>جنس العميل الثاني</th>
            <th>اسم العميل الثالث</th>
            <th>رقم هاتف العميل الثالث</th>
            <th>تاريخ ميلاد العميل الثالث</th>
            <th>جنس العميل الثالث</th>
            <th>رقم سند العربون</th>
            <th>المتبقي علي انتهاء المنتج</th>
            <th>اصدار البطاقة</th>
            <th>اسم المشرف</th>
            <th>اسم المندوب</th>
            <th>تاريخ البيع</th>
            <th>الكمية</th>
            <th>سعر المنتج</th>
            <th>المتبقي منذ دفع العربون</th>
            <th>العربون</th>
            <th>طريقة دفع العربون</th>
            <th>المبلغ المتبقي للطلب</th>
            <th>تاريخ التسليم المتوقع</th>
            <th>تاريخ التسليم الفعلي</th>
            <th>سند التسليم</th>
            <th>عمولة المشرف</th>
            <th>عمولة المندوب</th>
            <th>مسئول التوصيل</th>
            <th>عمولة التوصيل</th>
            <th>حالة التوصيل</th>
            <th>المنطة</th>
            <th>المدينة</th>
            <th>ملاحظات</th>
            <th>تاريخ التحديث</th>
            <th>تاريخ الانشاء</th>
            <th>تاريخ انتهاء المنتج</th>
            <th>عربون اضافي 1</th>
            <th>سند عربون اضافي 1</th>
            <th>طريقة دفع عربون اضافي 1</th>
            <th>عربون اضافي 2</th>
            <th>سند عربون اضافي 2</th>
            <th>طريقة دفع عربون اضافي 2</th>
            <th>عربون اضافي 3</th>
            <th>سند عربون اضافي 3</th>
            <th>طريقة دفع عربون اضافي 3</th>
          </tr>
        </thead>

        <tbody>
          {theOrders.length > 0 ? (
            theOrders.map((item, index) => (
              <tr key={item._id || index} className="*:border text-[13px] lg:text-[16px] *:p-2">
                <td>{item?.orderNumber || 0}</td>
                <td>{item?.product || "لايوجد"}</td>
                <td>{item?.customersData[0]?.customerName || "لايوجد"}</td>
                <td>{item?.customersData[0]?.phone || "لايوجد"}</td>
                <td>{item?.customersData[0]?.birthDate || "لايوجد"}</td>
                <td>{item?.customersData[0]?.gender || "لايوجد"}</td>
                <td>{item?.customersData[1]?.customerName || "لايوجد"}</td>
                <td>{item?.customersData[1]?.phone || "لايوجد"}</td>
                <td>{item?.customersData[1]?.birthDate || "لايوجد"}</td>
                <td>{item?.customersData[1]?.gender || "لايوجد"}</td>
                <td>{item?.customersData[2]?.customerName || "لايوجد"}</td>
                <td>{item?.customersData[2]?.phone || "لايوجد"}</td>
                <td>{item?.customersData[2]?.birthDate || "لايوجد"}</td>
                <td>{item?.customersData[2]?.gender || "لايوجد"}</td>
                <td>{item?.receipt || "لايوجد"}</td>
                <td>{item?.expireAfter || "لايوجد"}</td>
                <td>{item?.productIssuanceDate ? formatDate(item.productIssuanceDate) : "لايوجد"}</td>
                <td>{item?.supervisor?.name || "لايوجد"}</td>
                <td>{item?.salesPerson?.name || "لايوجد"}</td>
                <td>{formatDate(item?.sellingDate)}</td>
                <td>{item?.quantity || "لايوجد"}</td>
                <td>{item?.productPrice || "لايوجد"}</td>
                <td>{item?.daysAgo}</td>
                <td>{item?.deposit || "لايوجد"}</td>
                <td>{item?.depositPaymentMethod || "لايوجد"}</td>
                <td>{item?.remainingAmount || "لايوجد"}</td>
                <td>{formatDate(item?.deliveryDate)}</td>
                <td>{item?.actualDeliveryDate ? formatDate(item?.actualDeliveryDate) : "لم يتم التسليم"}</td>
                <td>{item?.DeliveryReceipt || "لايوجد"}</td>
                <td>{item?.supervisorCommission || "لايوجد"}</td>
                <td>{item?.salesManCommission || "لايوجد"}</td>
                <td>{item?.deliveryMan?.name || "لايوجد"}</td>
                <td>{item?.deliveryCommission || "لايوجد"}</td>
                <td>{item?.deliveryStatus || "لايوجد"}</td>
                <td>{item?.country || "لايوجد"}</td>
                <td>{item?.city || "لايوجد"}</td>
                <td>{item?.notes || "لايوجد"}</td>
                <td>{formatDate(item?.updatedAt)}</td>
                <td>{formatDate(item?.createdAt)}</td>
                <td>{formatDate(item?.productEndDate) || "لايوجد"}</td>
                {item?.extraDeposits?.length > 0
                  ? item.extraDeposits.map((dep, i) => (
                      <React.Fragment key={i}>
                        <td>{dep?.deposit || "لايوجد"}</td>
                        <td>{dep?.receipt || "لايوجد"}</td>
                        <td>{dep?.paymentMethod || "لايوجد"}</td>
                      </React.Fragment>
                    ))
                  : Array.from({ length: 9 }).map((_, i) => <td key={i}>لا يوجد</td>)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center">
                لا توجد طلبات متاحة.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
