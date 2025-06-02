
// import Custom from '@/formik/CustomInput'
// import React, { useState, useEffect } from 'react'
// import { addOrderValidation, editOrderValidation } from '@/validation/Validation'
// import { Formik, Form, Field, FieldArray } from 'formik'
// import { Button } from '@/components/ui/button'
// import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
// import { createOrder } from '@/api/orders'
// import { getSuperVisors } from '@/api/users'
// import { getAvailableProducts } from '@/api/products'
// import { Loader2 } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
// import { updateOrder } from '@/api/orders'
// import { getOneOrder } from '@/api/orders'


// const EditOrder = () => {
//   const queryClient = useQueryClient()
//   const history = useNavigate()
  

//   const { data: superVisors } = useQuery({
//     queryKey: ['users'],
//     queryFn: getSuperVisors
//   })
//   const superVisorsItems = superVisors?.data || []
//   const { id } = useParams()

//   // Fetch current product data
//   const { data: order, isLoading } = useQuery({
//     queryKey: ['product', id],
//     queryFn: () => getOneOrder(id),
//   })
//   const orderData = order?.data || {}
//   console.log(orderData)



//   const { data: products } = useQuery({
//     queryKey: ['products'],
//     queryFn: getAvailableProducts
//   })

//   const productsItems = products?.data || []
//   const [productQuantity, setProductQuantity] = useState(1)

//   const customer = {
//     customerName: '',
//     gender: '',
//     birthDate: '',
//     phone: ''
//   }

//   const [initialValues , setInitialValues] =useState({
//       customersData: orderData?.customersData || [],
//     receipt: orderData?.receipt || '',
//     supervisor: orderData?.supervisor || '',
//     sellingDate: orderData?.sellingDate || '',
//     country: orderData?.country || '',
//     city: orderData?.city || '',
//     product: orderData?.product || '',
//     deposit: orderData?.deposit || '',
//     depositPaymentMethod: orderData?.depositPaymentMethod || '',
//     deliveryDate: orderData?.deliveryDate || '',
//     notes: orderData?.notes || '' ,
//     productPrice: orderData?.productPrice || 0, 
//   })

//   useEffect(()=>{
// setInitialValues({
//     customersData: orderData?.customersData || [],
//     receipt: orderData?.receipt || '',
//     supervisor: orderData?.supervisor || '',
//     sellingDate: orderData?.sellingDate || '',
//     country: orderData?.country || '',
//     city: orderData?.city || '',
//     product: orderData?.product || '',
//     deposit: orderData?.deposit || '',
//     depositPaymentMethod: orderData?.depositPaymentMethod || '',
//     deliveryDate: orderData?.deliveryDate || '',
//     notes: orderData?.notes || '' ,
//     productPrice: orderData?.productPrice || 0, 
// })
//   } , [orderData])


 
// const mutation = useMutation({
//   mutationFn: ({ values, id }) => updateOrder(values, id),
//   onSuccess: (res) => {
//     console.log("response", res)
//       if(res.status === "success") {
//         queryClient.invalidateQueries({ queryKey: ["orders"] });
//         toast.success("تم تعديل الطلب بنجاح");
    
//       }
//   },
//   onError: (err) => {
//       console.log(err);
//   }
// });

// // const onSubmit = (values) => {
// //   const filteredValues = Object.fromEntries(
// //       Object.entries(values).filter(([key, value]) => value !== "" )
// //   );

  
// //   // mutation.mutate({ values : filteredValues , id });
// //   console.log("values", filteredValues)
 
// // };
// const onSubmit = (values) => {
//   const filteredValues = Object.fromEntries(
//     Object.entries(values).filter(
//       ([key, value]) => value !== "" && key !== "productPrice"
//     )
//   );

//   console.log("values", filteredValues);
//   // mutation.mutate({ values: filteredValues, id });
// };

 

//   return (
//     <div className='w-[100%] mx-auto flex flex-col gap-3'>
//       <h1 className='py-12'>املأ البيانات الأتية لتعديل الطلب</h1>
//       <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={editOrderValidation} enableReinitialize>
//         {({ errors, touched, values, setFieldValue }) => {
//           useEffect(() => {
//             const qty = productQuantity
//             const currentLength = values.customersData.length

//             if (qty > currentLength) {
//               const additionalCustomers = Array.from({ length: qty - currentLength }, () => ({
//                 customerName: '',
//                 gender: '',
//                 birthDate: '',
//                 phone: ''
//               }))
//               setFieldValue('customersData', [...values.customersData, ...additionalCustomers])
//             } else if (qty < currentLength) {
//               setFieldValue('customersData', values.customersData.slice(0, qty))
//             }
//           }, [productQuantity, setFieldValue, values.customersData])

//           return (
//             <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
//               <Field
//                 as='select'
//                 name='product'
//                 className='w-full border-2 border-black rounded-lg p-2'
//                 onChange={(e) => {
//                   const selectedOption = e.target.options[e.target.selectedIndex]
//                   const quantity = selectedOption.getAttribute('data-sayed') || 1
//                   const price = selectedOption.getAttribute('data-price') || 0
//                   setProductQuantity(Number(quantity))
//                   setFieldValue('product', e.target.value)
//                   setFieldValue('productPrice', price)
//                 }}
//               >
//                 <option value=''>اختر المنتج</option>
//                 {productsItems.map((item) => (
//                   <option  data-price={item?.price} data-sayed={item?.quantity} key={item._id} value={item._id}>
//                     {item.title}
//                   </option>
//                 ))}
//               </Field>
//               {touched.product && errors.product && <div className='text-red-500'>{errors.product}</div>}

//               <FieldArray name='customersData'>
//                 {() => (
//                   <div className='flex flex-col gap-10'>
//                     {values.customersData.map((_, i) => (
//                       <div className='flex flex-col gap-8 w-full' key={i}>
//                         <Custom label='اسم العميل' name={`customersData[${i}].customerName`} />
//                         <Custom label='تاريخ الميلاد' name={`customersData[${i}].birthDate`} />
//                         <Custom label='رقم الهاتف' name={`customersData[${i}].phone`} />
//                         <Field as='select' name={`customersData[${i}].gender`} className='w-full border-2 border-black rounded-lg p-2'>
//                           <option value=''>اختر الجنس</option>
//                           <option value='ذكر'>ذكر</option>
//                           <option value='أنثي'>أنثي</option>
//                         </Field>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldArray>

//               <Custom label='رقم السند' name='receipt' err={errors.receipt} />
//               <Custom label='تاريخ البيع' name='sellingDate' err={errors.sellingDate} />
//               <Custom label='تاريخ التسليم المتوقع' name='deliveryDate' err={errors.deliveryDate} />
//               <Custom label='المنطقة' name='country' err={errors.country} />
//               <Custom label='المدينة' name='city' err={errors.city} />
//               <Custom label='مبلغ العربون' name='deposit' err={errors.deposit} />

//               <div className='flex flex-col gap-4'>
//                 <Field as='select' name='supervisor' className='w-full border-2 border-black rounded-lg p-2'>
//                   <option value=''>اختر المشرف</option>
//                   {superVisorsItems.map((item) => (
//                     <option key={item._id} value={item._id}>{item.name}</option>
//                   ))}
//                 </Field>

//                 <Field as='select' name='depositPaymentMethod' className='w-full border-2 border-black rounded-lg p-2'>
//                   <option value=''>طريقة دفع مبلغ العربون</option>
//                   <option value='كاش'>كاش</option>
//                   <option value='تحويل بنك أهلي'>تحويل بنك أهلي</option>
//                   <option value='تحويل بنك راجحي'>تحويل بنك راجحي</option>
//                   <option value='شبكة'>شبكة</option>
//                 </Field>
//                 {touched.depositPaymentMethod && errors.depositPaymentMethod && <div className='text-red-500'>{errors.depositPaymentMethod}</div>}
//               </div>

//               <Custom label='ملاحظات' name='notes' err={errors.notes} />

//               <Button disabled={mutation.isPending} type='submit'>
//                 {mutation.isPending ? (
//                   <div className='flex items-center gap-2'>
//                     <Loader2 className='animate-spin' />Please wait
//                   </div>
//                 ) : (
//                   'تعديل الطلب'
//                 )}
//               </Button>
//             </Form>
//           )
//         }}
//       </Formik>
//     </div>
//   )
// }

// export default EditOrder


import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import { Button } from '@/components/ui/button'
import Custom from '@/formik/CustomInput'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAvailableProducts } from '@/api/products'
import { getSuperVisors } from '@/api/users'
import { getOneOrder, updatOrder } from '@/api/orders'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { editOrderValidation } from '@/validation/Validation'

const EditOrder = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()


  const [initialValues, setInitialValues] = useState(null)
  const [productQuantity, setProductQuantity] = useState(1)

   const [receiptImage, setReceiptImage] = useState(null);


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

  return `${day}-${month}-${year}`;
};
  const { data: superVisors } = useQuery({
    queryKey: ['users'],
    queryFn: getSuperVisors
  })

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAvailableProducts
  })

  const mutation = useMutation({
    mutationFn: ({ values, id }) => updatOrder({...values , receiptImage}, id),
    onSuccess: (res) => {
      if (res.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['orders'] })
        toast.success("تم تعديل الطلب بنجاح")
        history('/manageOrders')
      }
        else if(res.status === "error"){
                 toast.error(res?.details[0])
            }
    },
    onError: (err) => {
      console.log(err)
      toast.error("حدث خطأ أثناء تعديل الطلب")
    }
  })



  useEffect(() => {
   
      const orderData = JSON.parse(localStorage.getItem("theOrder"))
      setProductQuantity(orderData?.customersData?.length || 1)
      setInitialValues({
        customersData: orderData?.customersData || [],
        receipt: orderData?.receipt || '',
        supervisor: orderData?.supervisor || '',
        sellingDate: orderData?.sellingDate || '',
        country: orderData?.country || '',
        city: orderData?.city || '',
        product: orderData?.productId || '',
        deposit: orderData?.deposit || '',
        depositPaymentMethod: orderData?.depositPaymentMethod || '',
        deliveryDate: orderData?.deliveryDate || '',
        notes: orderData?.notes || '',
        productPrice: orderData?.productPrice || 0
      })
    
  }, [])

  const onSubmit = (values) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== "" && key !== "productPrice"
      )
    )
    filteredValues.sellingDate = formatDate(values.sellingDate)
    filteredValues.deliveryDate = formatDate(values.deliveryDate)
    mutation.mutate({ values: filteredValues , id })

  }

if(initialValues === null) {
  return <div className='flex justify-center items-center h-screen'>Loading...</div>
}
else{

  return (
    <div className='w-full mx-auto flex flex-col gap-3'>
      <h1 className='py-12'>املأ البيانات الأتية لتعديل الطلب</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={editOrderValidation}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, touched, errors }) => {
          useEffect(() => {
            const currentLength = values?.customersData?.length
            if (productQuantity > currentLength) {
              const newCustomers = Array.from({ length: productQuantity - currentLength }, () => ({
                customerName: '',
                gender: '',
                birthDate: '',
                phone: ''
              }))
              setFieldValue('customersData', [...values?.customersData, ...newCustomers])
            } else if (productQuantity < currentLength) {
              setFieldValue('customersData', values?.customersData.slice(0, productQuantity))
            }
          }, [productQuantity])

          return (
            <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
              {/* المنتجات */}
              <Field
                as='select'
                name='product'
                className='w-full border-2 border-black rounded-lg p-2'
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const quantity = selectedOption.getAttribute('data-sayed') || 1
                  const price = selectedOption.getAttribute('data-price') || 0
                  setProductQuantity(Number(quantity))
                  setFieldValue('product', e.target.value)
                  setFieldValue('productPrice', price)
                }}
              >
                <option value=''>اختر المنتج</option>
                {products?.data?.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    data-sayed={item.quantity}
                    data-price={item.price}
                  >
                    {item.title}
                  </option>
                ))}
              </Field>
              {touched.product && errors.product && <div className='text-red-500'>{errors.product}</div>}

              {/* بيانات العملاء */}
              <FieldArray name='customersData'>
                {() => (
                  <div className='flex flex-col gap-10'>
                    {values?.customersData.map((_, i) => (
                      <div className='flex flex-col gap-8 w-full' key={i}>
                        <Custom label='اسم العميل' name={`customersData[${i}].customerName`} />
                        <Custom label='تاريخ الميلاد' name={`customersData[${i}].birthDate`} />
                        <Custom label='رقم الهاتف' name={`customersData[${i}].phone`} />
                        <Field
                          as='select'
                          name={`customersData[${i}].gender`}
                          className='w-full border-2 border-black rounded-lg p-2'
                        >
                          <option value=''>اختر الجنس</option>
                          <option value='ذكر'>ذكر</option>
                          <option value='أنثي'>أنثي</option>
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              {/* باقي الحقول */}
              <Custom label='رقم السند' name='receipt' />
              <Custom label='تاريخ البيع' name='sellingDate' />
              <Custom label='تاريخ التسليم المتوقع' name='deliveryDate' />
              <Custom label='المنطقة' name='country' />
              <Custom label='المدينة' name='city' />
              <Custom label='مبلغ العربون' name='deposit' />

              {/* المشرف وطريقة الدفع */}
              <Field as='select' name='supervisor' className='w-full border-2 border-black rounded-lg p-2'>
                <option value=''>اختر المشرف</option>
                {superVisors?.data?.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </Field>

              <Field as='select' name='depositPaymentMethod' className='w-full border-2 border-black rounded-lg p-2'>
                <option value=''>طريقة دفع مبلغ العربون</option>
                <option value='كاش'>كاش</option>
                <option value='تحويل بنك أهلي'>تحويل بنك أهلي</option>
                <option value='تحويل بنك راجحي'>تحويل بنك راجحي</option>
                <option value='شبكة'>شبكة</option>
              </Field>
     <div>
                <label className="mb-2 block text-sm font-medium">صورة السند</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptImage(e.target.files[0])}
                  className="w-full border p-2 rounded-md"
                />
              </div>
              <Custom label='ملاحظات' name='notes' />

              <Button disabled={mutation.isPending} type='submit'>
                {mutation.isPending ? (
                  <div className='flex items-center gap-2'>
                    <Loader2 className='animate-spin' /> من فضلك انتظر
                  </div>
                ) : (
                  'تعديل الطلب'
                )}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
}

export default EditOrder

