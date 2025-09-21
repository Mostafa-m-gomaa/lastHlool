// import Custom from '@/formik/CustomInput'
// import React, { useEffect, useState } from 'react'
// import { CreateUsersValidation, productValidation } from '@/validation/Validation'
// import { Formik ,Form, Field, FieldArray } from 'formik'
// import { Button } from '@/components/ui/button'
// import { useMutation ,useQueryClient } from '@tanstack/react-query'

// import {Loader2} from "lucide-react"
// import toast from 'react-hot-toast' 
// import { useNavigate, useParams } from 'react-router-dom'
// import { createProduct } from '@/api/products'
// import { createTarget, updateTarget } from '@/api/targets'


// const EditTarget = () => {
// const [target,setTarget] =useState({})
// useEffect(()=>{
// const target = JSON.parse(localStorage.getItem("target"))
// setTarget(target)
// console.log(target)
// },[])

//     const queryClient = useQueryClient()
//     const history = useNavigate()
//     const targetObj ={
//         orderNumbers :"",
//         reward : ""
//     }

// const initialValues = {
//   title: target?.title || "",
//   description: target?.description || "",
//   validAt: target?.validAt || "",
//   targets: Array.isArray(target?.targets) ? target.targets : [targetObj],
// };
// const {id} =useParams()
// const mutation = useMutation({
//     mutationKey:"users",
//     mutationFn:(values)=>updateTarget(id, values) ,
//     onSuccess:(res)=>{
//         console.log(res)
//         if(res.status === "success"){
         
       
//             queryClient.invalidateQueries({queryKey:["targets"]})
//             toast.success("تم اضافة الهدف بنجاح بنجاح")
//             history("/home/targets")
//         }
//         else{
//             toast.error("حدث خطأ ما")
//         }
//     },
// })

// const onSubmit=(values)=>{
//     mutation.mutate(values)

// }

//   return (
//     <div className='w-[100%] mx-auto flex flex-col gap-3'>
//         <h1 className='py-12'>املأ البيانات الأتية لتعديل التارجيت</h1>
//         <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize >
//             {({errors ,touched , values})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
//                 <Custom label="العنوان" name="title" err={errors.title}  />
//                 <Custom label="الوصف" name="description" err={errors.description} />
//                 <Custom label="تاريخ تفعيل الهدف" name="validAt" err={errors.validAt} />
//                 <FieldArray name="targets"> 
// {({push,remove})=>(
//     <div className="flex flex-col gap-8">
//         {values.targets.map((tar,i)=>(
//             <div className="flex  gap-3">
//                 <Custom label="عددالطلبات" name={`targets.${i}.orderNumbers`} err={errors.targets?.[i]?.orderNumbers}  />
//                 <Custom label="المكافأة" name={`targets.${i}.reward`} err={errors.targets?.[i]?.reward}  />
//                 <Button type="button" onClick={()=>remove(i)} >حذف</Button>
//             </div>
//         ))}
//         <Button  className="w-fit my-4" type="button" onClick={()=>push(targetObj)} >اضافة هدف</Button>
//     </div>
// )}
//                     </FieldArray>
            
//                 <div>
     

//       </div>
//       <Button disabled={mutation.isPending} type="submit" >
// {mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "تحديث"}
//     </Button>
//             </Form>}
         
//         </Formik>
//     </div>
//   )
// }

// export default EditTarget


import Custom from '@/formik/CustomInput'
import React, { useEffect, useState } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from "lucide-react"
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTarget } from '@/api/targets'

const EditTarget = () => {
  const [target, setTarget] = useState({})
  const [initialTargetValues, setInitialTargetValues] = useState({})
  const {id} = useParams()
  const history = useNavigate()
  const queryClient = useQueryClient()

  const targetObj = {
    orderNumbers: "",
    reward: ""
  }

  useEffect(() => {
    const localTarget = JSON.parse(localStorage.getItem("target"))
    if (localTarget) {
      setTarget(localTarget)
      setInitialTargetValues({
        title: localTarget.title || "",
        description: localTarget.description || "",
        validAt: localTarget.validAt || "",
        targets: Array.isArray(localTarget.targets) ? localTarget.targets : [targetObj]
      })
    }
  }, [])

  const initialValues = {
    title: target?.title || "",
    description: target?.description || "",
    validAt: target?.validAt || "",
    targets: Array.isArray(target?.targets) ? target.targets : [targetObj],
  }
  const mutation = useMutation({
    mutationFn: (values) => updateTarget(id, values),
    onSuccess: (res) => {
        console.log(res)
      if (res.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["targets"] })
        toast.success("تم تعديل الهدف بنجاح")
        history("/home/targets")
      }
       else if (res.status === "fail") {
        // queryClient.invalidateQueries({ queryKey: ["targets"] })
        toast.error(res.message)
      } 
      else {
        toast.error("حدث خطأ ما")
      }
    },
    onError: () => {
      toast.error("فشل الاتصال بالسيرفر")
    }
  })

  // دالة للمقارنة بين القيم الأصلية والحالية
  const getChangedValues = (newValues, originalValues) => {
    const changed = {}
    for (const key in newValues) {
      if (Array.isArray(newValues[key])) {
        if (JSON.stringify(newValues[key]) !== JSON.stringify(originalValues[key])) {
          changed[key] = newValues[key]
        }
      } else if (newValues[key] !== originalValues[key]) {
        changed[key] = newValues[key]
      }
    }
    return changed
  }

  const onSubmit = (values) => {
    const updatedFields = getChangedValues(values, initialTargetValues)

    if (Object.keys(updatedFields).length === 0) {
      toast("لم يتم تعديل أي بيانات")
      return
    }
console.log("Updated Fields:", updatedFields)
    mutation.mutate(updatedFields)
  }

  if (!target || Object.keys(target).length === 0) {
    return <div className="text-center py-10">جاري تحميل البيانات...</div>
  }

  return (
    <div className='w-full mx-auto flex flex-col gap-3'>
      <h1 className='py-12'>املأ البيانات الأتية لتعديل التارجيت</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
        {({ errors, values }) =>
          <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>

            <Custom label="العنوان" name="title" err={errors.title} />
            <Custom label="الوصف" name="description" err={errors.description} />
            <Custom label="تاريخ تفعيل الهدف" name="validAt" err={errors.validAt} />

            <FieldArray name="targets">
              {({ push, remove }) => (
                <div className="flex flex-col gap-8">
                  {values.targets.map((_, i) => (
                    <div key={i} className="flex gap-3 flex-wrap">
                      <Custom label="عدد الطلبات" name={`targets.${i}.orderNumbers`} err={errors.targets?.[i]?.orderNumbers} />
                      <Custom label="المكافأة" name={`targets.${i}.reward`} err={errors.targets?.[i]?.reward} />
                      <Button type="button" onClick={() => remove(i)}>حذف</Button>
                    </div>
                  ))}
                  <Button className="w-fit my-4" type="button" onClick={() => push(targetObj)}>
                    اضافة هدف
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button disabled={mutation.isPending} type="submit">
              {mutation.isPending
                ? <div className='flex items-center gap-2'>
                    <Loader2 className="animate-spin" /> جاري التحديث
                  </div>
                : "تحديث"}
            </Button>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default EditTarget
