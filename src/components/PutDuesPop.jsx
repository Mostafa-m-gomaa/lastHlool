import { makeOrderReady, payDues } from "@/api/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { Form, Formik , Field } from "formik"
import toast from "react-hot-toast"
import { Settings } from 'lucide-react';
import Custom from "@/formik/CustomInput"

export function PutDues({id}) {
    const queryClient = useQueryClient()
    const initialValues ={
        gottenMoney:"",
        paidAt : "" ,
        operation : "assign" , 
        reason : ""
    }

    const mutation =useMutation({
        mutationFn:({mutationId,values})=>payDues(mutationId,values) ,
        onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:["dues"]})
            if(res.status === "success"){
               toast.success("تم تحديث الطلب بنجاح")
            }
            else if(res.status === "fail"){
                toast.error(res.message)
            }

        } ,
        onError:(err)=>{
            toast.error(err)
        }
    })


    const onSubmit =(values)=>{
  
        mutation.mutate({mutationId : id ,values})
    }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="" >زيادة</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">اعداد الطلب</h4>
          </div>
          <div className="flex flex-col gap-2">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({...sayed})=>(

            <Form className="flex flex-col items-center gap-4">
         
                     <Label htmlFor="width">المبلغ الموضوع</Label>
              <Field
              as={Input}
              name="gottenMoney"
              type="number"
              className="col-span-2 h-8"
              required
            />
                     <Label htmlFor="width">السبب</Label>
              <Field
              as={Input}
              name="reason"
              type="text"
              className="col-span-2 h-8"
              required
            />


            <Custom name="paidAt" label="تاريخ الدفع" type="date" />
       <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "تحديث"}
       </Button>
            </Form>
                )}

            </Formik>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
