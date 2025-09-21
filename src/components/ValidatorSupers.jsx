import { getHistory } from "@/api/orders";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react"

import { Link } from "react-router-dom"
import Loader from "./Loader";
import { HistoryFilter } from "./HistoryFilter";
import { useEffect } from "react";
import { getSuperVisors, updateValidator } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";





export function ValidatorSupers({supers, id}) {
    



const queryClient =useQueryClient()

    const [open, setOpen] = useState(false);
  const initialValues = {
    operation: "add",
    supervisorId: "",
  }
    const {data , isLoading } =useQuery({
      queryKey: [id],
      queryFn:getSuperVisors,
      enabled: open, // Only fetch when the dialog is open
    })
    const supervisors = data?.data || []; 
    console.log(supervisors)

   

      const mutation = useMutation({
        mutationFn: ({values}) => updateValidator(id, values),
        onSuccess: (res) => {
           console.log(res)
          queryClient.invalidateQueries({ queryKey: ["users"] })
          if (res.status === "success") {
            toast.success("تم ")
            // setOpen(false) // ✅ Close after success
          } else if (res.status === "fail") {
            toast.error(res.message)
          }
        },
        onError: (err) => {
          toast.error(err)
        },
      })



        const onSubmit = (values) => {
    mutation.mutate({values})
  }
  return (
    <Dialog  open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button >المشرفين</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto"   disableOutsidePointerEvents>
        <DialogHeader>
          <DialogTitle>المشرفين</DialogTitle>
 
        </DialogHeader>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form className="grid gap-4">
              
              <Label htmlFor="width">اضافة مشرف</Label>
             
                     {/* <Field
                      as={Input}
                      name="city"
                      placeholder=""
                      className="col-span-2 h-8"
                      required
                    /> */}
                            
                                  <Field as="select" name="supervisorId" className="w-full border-2 border-black rounded-lg p-2" >
                                      <option value="">اختر المشرف</option>
                                
                                      {supervisors?.map((item , i) => (
                                       
                                        <option value={item?._id} key={i}>
                                          {item?.name}
                                        </option>
                                      ))}
                           
                                    </Field>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Loading..." : "تحديث"}
              </Button> 
            </Form>
          )}
        </Formik>

            <div className="flex flex-col gap-2">
{supers?.map((item,i)=>{
    return(
        <div  key={i} className="p-4 flex justify-between items-center shadow-md">
<span>{item?.name}</span>
<Button type="button" className="bg-red-500" onClick={()=>mutation.mutate({values: {operation: "remove", supervisorId: item?._id}})}>حذف</Button>
        </div>
    )
})}
            </div>

    
   
      </DialogContent>
    </Dialog>
  )
}
