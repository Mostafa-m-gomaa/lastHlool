
import React ,{useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getMyOrders } from '@/api/orders'
import { PaginationDemo } from '@/components/Pagination'
import Card from '@/components/Card'
import { TabsDemo } from '@/components/tabs'
import { OrdersFilter } from '@/components/OrdersFilter'
const MyOrders = () => {
const [deliveryStatus, setDeliveryStatus] = useState("غير جاهز للتسليم")
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
  product:"",
  receipt:"",
  salesManCommission:"",
  salesPerson:"",
  sellingDate:"",
  supervisor:"",
  supervisorCommission:"",
   day :"",
  dateKey: "sellingDate"
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};



const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "orders",
    filters,
    page
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    const page = queryKey[2] ;
    return getMyOrders(params , page); // Pass the entire object
  },
});

const orderItems = orders?.data || []

if (isError) {
  return <div>Internet Error</div>;
}
  


  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>طلباتي</h1>
          {localStorage.getItem("role") === "sales" &&    <Button > <Link to="/home/addOrder"> اضافة طلب</Link> </Button>}

      </div>
    
<OrdersFilter filterChange={handleFilterChange} /> 
      <TabsDemo categorizedOrders={orders?.categorizedOrders}  filterChang={handleFilterChange}  setDeliveryStatus={setDeliveryStatus}/>
          {isLoading ? <Loader />: 
          <div    data-aos="fade-right" className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {orderItems.map((item,index)=>( 
             <Card deliveryStatus={item.deliveryStatus}  key={index} number={index+1} item={item} anim={true}/> 
          ))}
            </div>
   
          }
          <PaginationDemo currentPage={page} setPage={setPage} numberOfPages={orders?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default MyOrders