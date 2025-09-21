import { getOneOrder } from '@/api/orders';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';


const Info = ({ label, value }) => (
  <div className="flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm">
    <span className="text-gray-500 text-xs mb-1">{label}</span>
    <span className="font-medium text-gray-800">{value ?? "—"}</span>
  </div>
);

const OrderPage = () => {
    const {id} =useParams()


    const {data: order, isLoading, isError } = useQuery({
        queryKey: ["order", id],
        queryFn: () => getOneOrder(id)
    });

    // console.log(order)
    const data = order?.data || {};
      const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("ar-EG") : "—";

      if (isLoading) {
        return <div className='flex justify-center items-center h-screen'><Loader /></div>
        }
  return (
    <div className='flex flex-col gap-4 py-4 w-full'>
        <h1 className='text-center text-2xl font-bold py-4'>بيانات الطلب</h1>
        <div className="flex flex-col gap-4 w-full">
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 w-[90%] mx-auto">
        <Info label="رقم الطلب" value={data.orderNumber} />
        <Info label="المنتج" value={data.product} />
        <Info label="سعر المنتج" value={`${data.productPrice} ر.س`} />
        <Info label="الكمية" value={data.quantity} />
        {/* <Info label="السعر الإجمالي" value={`${data.orderPrice} ر.س`} /> */}
        <Info label="العربون" value={`${data.deposit} ر.س`} />
        <Info label="المتبقي" value={`${data.remainingAmount} ر.س`} />
        <Info label="طريقة الدفع" value={data.depositPaymentMethod} />
        <Info label="تاريخ البيع" value={formatDate(data.sellingDate)} />
        {/* <Info label="تاريخ التفعيل" value={formatDate(data.productIssuanceDate)} /> */}
        <Info label="تاريخ الانتهاء" value={formatDate(data.productEndDate)} />
        <Info label="تاريخ التوصيل" value={formatDate(data.deliveryDate)} />
        <Info label="تاريخ التسليم الفعلي" value={formatDate(data.actualDeliveryDate)} />
        <Info label="حالة التوصيل" value={data.deliveryStatus} />
        <Info label="المندوب" value={data.salesPerson?.name} />
        <Info label="مسئول التوصيل" value={data.deliveryMan?.name} />
        <Info label="المشرف" value={data.supervisor?.name} />
        <Info label="عمولة التوصيل" value={`${data.deliveryCommission} ر.س`} />
        <Info label="عمولة البائع" value={`${data.salesManCommission} ر.س`} />
        <Info label="عمولة المشرف" value={`${data.supervisorCommission} ر.س`} />
        <Info label="رقم سند العربون" value={data.receipt} />
        <Info label="رقم سند التوصيل" value={data.DeliveryReceipt} />
        <Info label="المدينة" value={data.city} />
        <Info label="المنطقة" value={data.country} />
        <Info label="ملاحظات" value={data.notes || "—"} />
        <Info label="تاريخ الإنشاء" value={formatDate(data.createdAt)} />
      </div>
        </div>
    </div>
  )
}

export default OrderPage