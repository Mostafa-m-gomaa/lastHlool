import { makeOrderReady, payDues, payDuesForUser } from "@/api/orders"
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


export function PayingDuesForUsers({id}) {
    const queryClient = useQueryClient()
    const initialValues ={
        paidAmount:"",
    }

    const mutation =useMutation({
        mutationFn:({mutationId,values})=>payDuesForUser(mutationId,values) ,
        onSuccess:(res)=>{
           console.log(res)
            queryClient.invalidateQueries({queryKey:["duesForUsers"]})
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
        <Button className="" >دفع</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">دفع</h4>
          </div>
          <div className="flex flex-col gap-2">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({...sayed})=>(

            <Form className="flex flex-col items-center gap-4">
         
                     <Label htmlFor="width">المبلغ المستلم</Label>
              <Field
              as={Input}
              name="paidAmount"
              type="number"
              className="col-span-2 h-8"
              required
            />


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
