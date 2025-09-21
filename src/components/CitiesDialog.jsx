import { getHistory } from "@/api/orders";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { addCity } from "@/api/users"
import { useParams } from "react-router-dom"





export function CitiesDialog({cities ,id}) {
    
const queryClient = useQueryClient()

    const [open, setOpen] = useState(false);

    const initialValues = {
    operation: "remove",
    city: "",
  }

  const mutation = useMutation({
    mutationFn: ({values }) => addCity(id, values),
    onSuccess: (res) => {
       console.log(res)
      queryClient.invalidateQueries({ queryKey: ["countries"] })
      if (res.status === "success") {
        toast.success("تم ")
        setOpen(false) // ✅ Close after success
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
        <Button >المدن</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto"   disableOutsidePointerEvents>
        <DialogHeader>
          <DialogTitle>المدن</DialogTitle>
 
        </DialogHeader>
<div className="flex flex-col gap-2">
{cities?.map((item, i) => {
  return (
    <div className="flex justify-between" key={i}>
  
      <span> {item}</span> {/* لو حابب تطبع اسم المدينة */}
      <Button className="bg-red-500 text-white" onClick={()=>mutation.mutate({values: {operation: "remove", city: item}})}>
        حذف
      </Button>
    </div>
  )
})}

</div>



    
   
      </DialogContent>
    </Dialog>
  )
}
