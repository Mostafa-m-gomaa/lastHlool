import React ,{useState} from 'react'
import { OrdersTable} from '@/components/OrdersTable'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getOrders } from '@/api/orders'
import { ComboboxDemo } from '@/components/CompoBox'
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from '@/components/DatePicker'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import { OrdersFilter } from '@/components/OrdersFilter'
import { TabsDemo } from '@/components/tabs'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download, LoaderPinwheel } from 'lucide-react';

const Orders = () => {

const [page, setPage] = useState(1);
const [theVariable, setTheVariable] = useState("")
const [queryObj , setQueryObject] = useState({})
const [deliveryStatus, setDeliveryStatus] = useState("غير جاهز للتسليم")
const [loader, setLoader] = useState(false)
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
  product:"",
  receipt:"",
  salesManCommission:"",
  salesPerson:"",
  sellingDate:"",
  supervisor:"",
  supervisorCommission:"",
  daysAgo:"",
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};


const handleSearchChange = (value) => {
  if(theVariable === ""){
    toast.error("اختر الفلتر اولا")
  }
setQueryObject({[theVariable]:value})
}




const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "orders",
    filters,
    page
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    const page = queryKey[2] ;
    return getOrders(params , page); // Pass the entire object
  },
});


if (isError) {
  return <div>Internet Error</div>;
}
  

const orderItems = orders?.data || []
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

const exportToExcel = () => {
  setLoader(true)
  const worksheetData = orderItems.map((item) => ({
    "المنتج": item?.product || "لايوجد",
    "اسم العميل": item?.customerName || "لايوجد",
    "رقم سند العربون": item?.receipt || "لايوجد",
    "الجنس": item?.gender || "لايوجد",
    "المتبقي علي انتهاء المنتج": item?.expireAfter || "لايوجد",
    "تاريخ الميلاد العميل": formatDate(item?.birthDate),
    "اسم المشرف": item?.supervisor?.name || "لايوجد",
    "اسم المندوب": item?.salesPerson?.name || "لايوجد",
    "تاريخ البيع": formatDate(item?.sellingDate),
    "الكمية": item?.quantity || "لايوجد",
    "سعر المنتج": item?.productPrice || "لايوجد",
   
    "العربون": item?.deposit || "لايوجد",
    "طريقة دفع العربون": item?.depositPaymentMethod || "لايوجد",
    "المتبقي منذ دفع العربون": item?.daysAgo || "لايوجد",
    "المبلغ المتبقي للطلب": item?.remainingAmount || "لايوجد",
    "مسئول التوصيل": item?.deliveryMan?.name || "لايوجد",
    "تاريخ التسليم المتوقع": formatDate(item?.deliveryDate),
    "تاريخ التسليم": formatDate(item?.actualDeliveryDate),
    "سند التسليم": item?.DeliveryReceipt || "لايوجد",
    "اصدار البطاقة": item?.productIssuanceDate ? formatDate(item.productIssuanceDate) : "لا يوجد",
    "طريقة دفع الدفعه الباقي": item?.restMoneyPaymentMethod || "لايوجد",
    "عمولة المشرف": item?.supervisorCommission || "لايوجد",
    "عمولة المندوب": item?.salesManCommission || "لايوجد",
    "عمولة التوصيل": item?.deliveryCommission || "لايوجد",
    "حالة التوصيل": item?.deliveryStatus || "لايوجد",
    "البلد": item?.country || "لايوجد",
    "ملاحظات": item?.notes || "لايوجد",
    "تاريخ التحديث": formatDate(item?.updatedAt),
    "رقم الهاتف": item?.phone || "لايوجد",
    "رقم الطلب": item?.orderNumber || "لايوجد",
    "تاريخ الانشاء": formatDate(item?.createdAt),
    "تاريخ انتهاء المنتج": formatDate(item?.productEndDate) || "لايوجد",
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

  saveAs(data, "orders.xlsx");
  setLoader(false)
};


  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex flex-col w-[90%] mx-auto gap-4 items-center py-4">
        <div className="flex justify-between w-full items-center">

          <Button onClick={exportToExcel}>{loader ?<LoaderPinwheel className='animate-spin' /> : <Download /> }</Button>
                     <Button className="mx-2" > <Link to="/home/addOrder"> اضافة طلب</Link> </Button>
          
          <h1>القالب الرئيسي</h1>
        </div>
        <OrdersFilter filterChange={handleFilterChange} />
            
             <TabsDemo categorizedOrders={orders?.categorizedOrders} filterChang={handleFilterChange}  setDeliveryStatus={setDeliveryStatus}/>

      </div>
          {isLoading ? <Loader />:  <OrdersTable orders={orderItems} />}
     
          <PaginationDemo page={page} setPage={setPage} numberOfPages={orders?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default Orders