import { getMyTargets } from '@/api/targets'
import Card from '@/components/Card'
import OrderCards from '@/components/OrderCard'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Mytargets = () => {
  const {data}=useQuery({
    queryKey: ['myTargets'],
    queryFn: getMyTargets
  })
const targetsItems = data?.data || []
console.log(targetsItems)
  return (
    <div className='flex flex-col gap-4 py-4 w-full'>
      <h1>اهدافي</h1>
<div className="flex  w-[90%] mx-auto flex-col gap-3">

          {targetsItems.map((item, index) => (
            <div key={index} className='p-4 rounded shadow w-full flex flex-col  gap-2 justify-between items-center bg-white'>
              <div className="flex w-full flex-row-reverse  gap-2 justify-between items-center">

              <div className="flex flex-col items-end">
              <div>{item?.totalDeliveredOrders} : عدد الطلبات المسلمه</div>
              <p className='text-gray-500'>تاريخ التارجيت: {item.targetDay}</p>
              <p className='text-gray-600'>االمكافأه المستحقة : {item.gottenRewards}</p>
              </div>
              <div className="flex flex-col gap-3 items-end w-[30%]">

             <h3>بيانات التارجيت</h3>
             <div className="flex flex-col gap-2">
{item?.target?.targets?.map((target, targetIndex) => {
  return(
    <div className='flex gap-4'>
      <span>{target?.orderNumbers}: عدد الطلبات</span>
      <span>{target?.reward}: المكافأة</span>
      </div>
  )
})}
             </div>
              </div>
              <div className="flex flex-col gap-3 items-end w-[30%]">

             <h3>مكافأتك</h3>
             <div className="flex flex-col gap-2">
{item?.rewards?.map((item, i) => {
  return(
    <div className='flex gap-4'>
      {/* <span>{target?.orderNumbers}: عدد الطلبات</span> */}
      <span>{item?.isPaid ? "تم الاستلام" : "لم يتم الاستلام"}</span>
      <span>{item?.reward}: المكافأة</span>
      </div>
  )
})}
             </div>
              </div>
              </div>
              <div className="flex flex-col w-full">
{/* {item?.orders?.map((order ,index) => <Card item={order?.order} number={index} />)} */}
              </div>
            </div>
          ))}


</div>
    </div>
  )
}

export default Mytargets