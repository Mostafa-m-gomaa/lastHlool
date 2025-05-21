import * as Yup from 'yup';




export const LoginValidation =Yup.object({
    email: Yup.string().required("يجب أن تدخل الايميل") ,
    password: Yup.string().min(8 , "الرقم السري لا يقل عن 8 ارقام").required("يجب أن تدخل كلمة السر") ,
})
export const CreateUsersValidation =Yup.object({
    email: Yup.string().email().required("يجب أن تدخل الايميل") ,
    password: Yup.string().min(8 , "الرقم السري لا يقل عن 8 ارقام").required("يجب أن تدخل كلمة السر") ,
    name: Yup.string().required("يجب أن تدخل الاسم") ,
    role: Yup.string().required("يجب أن تختار الوظيفة") ,
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'كلمة السر غير متطابقة')
})
export const productValidation =Yup.object({
    title: Yup.string().required("يجب أن تدخل الاسم") ,
    desc: Yup.string().required("يجب أن تدخل الوصف") ,
    ValidityPeriod: Yup.number().required("يجب أن تدخل فترة الصلاحية") ,
    price: Yup.number().required("يجب أن تدخل السعر") ,
    quantity: Yup.number().required("يجب أن تدخل السعر") ,
    salesManCommission: Yup.number().required("يجب أن تدخل عمولة المندوب") ,
    supervisorCommission: Yup.number().required("يجب أن تدخل عمولة المشرف") ,
    deliveryCommission: Yup.number().required("يجب أن تدخل عمولة رجل التوصيل") ,
})
// export const addOrderValidation =Yup.object({

//     receipt: Yup.string().required("يجب أن تدخل رقم السند") ,
//     depositPaymentMethod: Yup.string().required("يجب أن تدخل طريقة دفع مبلغ العربون") ,
//     supervisor: Yup.string().required("يجب أن تختار المشرف") ,
//     sellingDate: Yup.string().required("يجب أن تدخل تاريخ البيع") ,
//     deliveryDate: Yup.string().required("يجب أن تدخل تاريخ التسليم") ,
//     phone: Yup.string().required("يجب أن تدخل رقم الهاتف") ,
//     country: Yup.string().required("يجب أن تدخل البلد") ,
//     city: Yup.string().required("يجب أن تدخل البلد") ,
//     quantity: Yup.number().required("يجب أن تدخل الكمية") ,
//     deposit: Yup.number().required("يجب أن تدخل الدفعة المقدمة") ,
//     product: Yup.string().required("يجب أن تختار المنتج") ,
//     notes: Yup.string() ,

// })




export const addOrderValidation = Yup.object({
  receipt: Yup.string().required('يجب أن تدخل رقم السند'),
  depositPaymentMethod: Yup.string().required('يجب أن تدخل طريقة دفع مبلغ العربون'),
  supervisor: Yup.string().required('يجب أن تختار المشرف'),
  sellingDate: Yup.string().required('يجب أن تدخل تاريخ البيع'),
  deliveryDate: Yup.string().required('يجب أن تدخل تاريخ التسليم'),
  country: Yup.string().required('يجب أن تدخل البلد'),
  city: Yup.string().required('يجب أن تدخل المدينة'),
  deposit: Yup.number()
    .typeError('مبلغ غير صالح')
    .min(0, 'لا يمكن أن يكون أقل من صفر')
    .test(
      'max-deposit',
      'مبلغ العربون أكبر من سعر المنتج',
      function (value) {
        const { productPrice } = this.parent;
        if (!productPrice || !value) return true; // لو مش مختار منتج
        return value <= productPrice;
      }
    ),
  product: Yup.string().required('يجب أن تختار المنتج'),
  notes: Yup.string(),

  customersData: Yup.array().of(
    Yup.object().shape({
      customerName: Yup.string().required('يجب أن تدخل اسم العميل'),
      phone: Yup.string()
        .required('يجب أن تدخل رقم الهاتف')
        .matches(/^05\d{8}$/, 'رقم الهاتف يجب أن يتكون من 10 أرقام ويبدأ بـ 05'),
      birthDate: Yup.string().required('يجب أن تدخل تاريخ الميلاد'),
      gender: Yup.string().required('يجب أن تختار الجنس'),
    })
  )
    .min(1, 'يجب إدخال بيانات عميل واحد على الأقل'),
})
export const editOrderValidation = Yup.object({

  deposit: Yup.number()
    .typeError('مبلغ غير صالح')
    .min(0, 'لا يمكن أن يكون أقل من صفر')
    .test(
      'max-deposit',
      'مبلغ العربون أكبر من سعر المنتج',
      function (value) {
        const { productPrice } = this.parent;
        return value <= productPrice;
      }
    ),


  customersData: Yup.array().of(
    Yup.object().shape({
      phone: Yup.string()
        .matches(/^05\d{8}$/, 'رقم الهاتف يجب أن يتكون من 10 أرقام ويبدأ بـ 05'),

    })
  )

})


export const addReportValidationSchema = Yup.object().shape({
  reportDate: Yup.string().required("يجب أن تدخل تاريخ التقرير"),
    newOrders: Yup.array()
      .of(
        Yup.object().shape({
                    deposit: Yup.number().required("يجب أن تدخل مبلغ العربون")
            .typeError("يجب إدخال مبلغ صالح")
            .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
          depositPaymentMethod: Yup.string().required("يجب أن تدخل طريقة دفع مبلغ العربون"),
          product: Yup.string().required("يجب أن تختار المنتج"),
          salesMan: Yup.string().required("يجب أن تختار المندوب"),
        })
      ),
    extraDeposits: Yup.array()
      .of(
        Yup.object().shape({
              deposit: Yup.number().required("يجب أن تدخل مبلغ العربون")
            .typeError("يجب إدخال مبلغ صالح")
            .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
          paymentMethod: Yup.string().required("يجب أن تدخل طريقة دفع مبلغ العربون"),
          order: Yup.string().required("يجب أن تختار المنتج"),
          deposit: Yup.string().required("يجب أن تدخل مبلغ العربون"),
          receipt: Yup.string().required("يجب أن تدخل رقم السند"),
        })
      ),
    deliveredOrders: Yup.array().of(
      Yup.object().shape({
    order: Yup.string().required("يجب أن تختار الطلب"),
restOrderCost : Yup.array().of(
  Yup.object().shape({
    amount: Yup.number().required("يجب أن تدخل المبلغ")
    .typeError("يجب إدخال مبلغ صالح")
    .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
    paymentMethod: Yup.string().required("يجب أن تدخل طريقة الدفع"),
  }
)
)
  
      })
    ),
   
    
    description: Yup.string()
      .nullable()
      .max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  });



