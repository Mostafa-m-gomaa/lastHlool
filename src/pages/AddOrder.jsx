

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { getSuperVisors } from '@/api/users';
import { getAvailableProducts } from '@/api/products';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Custom from '@/formik/CustomInput';
import { addOrderValidation } from '@/validation/Validation';
import { Loader2 } from 'lucide-react';
// import { useFormikContext } from "formik";
import { getCountries } from '@/api/users';


const AddOrder = () => {
  // const { setFieldValue } = useFormikContext();

  const queryClient = useQueryClient();
  const history = useNavigate();
  const [regionId, setRegionId] = useState(null);
  const [cities, setCities] = useState([]);

  const { data: superVisors } = useQuery({ queryKey: ['users'], queryFn: getSuperVisors });
  const superVisorsItems = superVisors?.data || [];

  const { data: products } = useQuery({ queryKey: ['products'], queryFn: getAvailableProducts });
  const productsItems = products?.data || [];

  const [productQuantity, setProductQuantity] = useState(1);
  const [receiptImage, setReceiptImage] = useState(null);

  const customer = { customerName: '', gender: '', birthDate: '', phone: '' };

  const initialValues = {
    customersData: [customer],
    receipt: '',
    supervisor: '',
    sellingDate: '',
    country: '',
    city: '',
    product: '',
    deposit: '',
    depositPaymentMethod: '',
    deliveryDate: '',
    notes: '',
    productPrice: 0,
  };

  const mutation = useMutation({
    mutationFn: (values) => createOrder({ ...values, receiptImage }),
    onSuccess: (res) => {
      if (res.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('تم اضافة الطلب بنجاح');
              if(localStorage.getItem('role') === 'sales' || localStorage.getItem('role') === 'supervisor') {
          history('/home/myorders');

        }else{

          history('/home/manageOrders');
        }
     
      } else if (res.status === 'error') {
        toast.error(res?.details?.[0] || 'حدث خطأ أثناء إضافة الطلب');
      }
    },
    onError: (err) => console.log(err),
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
    // console.log(values)
  };


  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries
  })
  const regions = countries?.data || [];
  console.log(countries?.data)
  return (
    <div className="w-[100%] mx-auto flex flex-col gap-3">
      <h1 className="py-12">املأ البيانات الأتية لأضافة طلب</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addOrderValidation}>
        {({ errors, touched, values, setFieldValue }) => {
          useEffect(() => {
            const qty = productQuantity;
            const currentLength = values.customersData.length;

            if (qty > currentLength) {
              const additionalCustomers = Array.from({ length: qty - currentLength }, () => ({
                customerName: '',
                gender: '',
                birthDate: '',
                phone: '',
              }));
              setFieldValue('customersData', [...values.customersData, ...additionalCustomers]);
            } else if (qty < currentLength) {
              setFieldValue('customersData', values.customersData.slice(0, qty));
            }
          }, [productQuantity, setFieldValue, values.customersData]);

          return (
            <Form className="flex flex-col gap-10 w-[80%] mx-auto py-7">
              <Field
                as="select"
                name="product"
                className="w-full border-2 border-black rounded-lg p-2"
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex];
                  const quantity = selectedOption.getAttribute('data-sayed') || 1;
                  const price = selectedOption.getAttribute('data-price') || 0;
                  setProductQuantity(Number(quantity));
                  setFieldValue('product', e.target.value);
                  setFieldValue('productPrice', parseFloat(price));
                }}
              >
                <option value="">اختر المنتج</option>
                {productsItems.map((item) => (
                  <option data-sayed={item?.quantity} data-price={item?.price || 0} key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </Field>
              {touched.product && errors.product && <div className="text-red-500">{errors.product}</div>}

              <FieldArray name="customersData">
                {() => (
                  <div className="flex flex-col gap-10">
                    {values.customersData.map((_, i) => (
                      <div className="flex flex-col gap-8 w-full" key={i}>
                        <Custom label="اسم العميل" name={`customersData[${i}].customerName`} />
                        <Custom label="تاريخ الميلاد" name={`customersData[${i}].birthDate`} />
                        <Custom label="رقم الهاتف" name={`customersData[${i}].phone`} />
                        <Field as="select" name={`customersData[${i}].gender`} className="w-full border-2 border-black rounded-lg p-2">
                          <option value="">اختر الجنس</option>
                          <option value="ذكر">ذكر</option>
                          <option value="أنثي">أنثي</option>
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              <Custom label="رقم السند" name="receipt" err={errors.receipt} />
              <Custom label="تاريخ البيع" name="sellingDate" err={errors.sellingDate} />
              <Custom label="تاريخ التسليم المتوقع" name="deliveryDate" err={errors.deliveryDate} />
              {/* <Custom label="المنطقة" name="country" err={errors.country} /> */}
              <Field as="select" name="country" className="w-full border-2 border-black rounded-lg p-2" 
                onChange={(e) => {
    

       const value = e.target.value;
    const selectedRegion = regions.find(r => r.title === value);
    setCities(selectedRegion?.cities || []);
  setFieldValue("country", value); // تحديث قيمة فورميك

  }}>
                  <option value="">المنطقة</option>
                  {regions?.map((region) => (
                    <option  value={region?.title} key={region._id}>
                      {region?.title}
                    </option>
                  ))}
       
                </Field>
                
              <Field as="select" name="city" className="w-full border-2 border-black rounded-lg p-2" >
                  <option value="">المدينة</option>
            
                  {cities.map((region , i) => (
                   
                    <option value={region} key={i}>
                      {region}
                    </option>
                  ))}
       
                </Field>
              {/* <Custom label="المدينة" name="city" err={errors.city} /> */}
              <Custom label="مبلغ العربون" name="deposit" err={errors.deposit} />

              {/* ✅ حقل الصورة */}
              <div>
                <label className="mb-2 block text-sm font-medium">صورة السند</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptImage(e.target.files[0])}
                  className="w-full border p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Field as="select" name="supervisor" className="w-full border-2 border-black rounded-lg p-2">
                  <option value="">اختر المشرف</option>
                  {superVisorsItems.map((item) => (
                    <option  key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </Field>

                <Field as="select" name="depositPaymentMethod" className="w-full border-2 border-black rounded-lg p-2">
                  <option value="">طريقة دفع مبلغ العربون</option>
                  <option value="كاش">كاش</option>
                  <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
                  <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
                  <option value="شبكة">شبكة</option>
                </Field>
                {touched.depositPaymentMethod && errors.depositPaymentMethod && (
                  <div className="text-red-500">{errors.depositPaymentMethod}</div>
                )}
              </div>

              <Custom label="ملاحظات" name="notes" err={errors.notes} />

              <Button disabled={mutation.isPending} type="submit">
                {mutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />Please wait
                  </div>
                ) : (
                  'اضافة'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddOrder;
