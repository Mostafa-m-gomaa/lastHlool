import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Form, Formik, Field } from "formik"
import toast from "react-hot-toast"
import { useState } from "react"
import { addCity, addCountry } from "@/api/users"


export function AddCity({id}) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false) // ✅ Manage dialog state manually

  const initialValues = {
    operation: "add",
    city: "",
  }

  const mutation = useMutation({
    mutationFn: ({values }) => addCity(id, values),
    onSuccess: (res) => {
       console.log(res)
      queryClient.invalidateQueries({ queryKey: ["countries"] })
      if (res.status === "success") {
        toast.success("تم تحديث الطلب بنجاح")
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="p-1 h-fit lg:px-4 lg:py-2">اضافة مدينة</Button>
      </DialogTrigger>

      {/* ✅ Dialog instead of Popover */}
      <DialogContent className="w-80">
        <DialogHeader>
          <DialogTitle>اضافة مدينة</DialogTitle>
        </DialogHeader>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form className="grid gap-4">
              
              <Label htmlFor="width">اسم المدينة</Label>
             
                     <Field
                      as={Input}
                      name="city"
                      placeholder=""
                      className="col-span-2 h-8"
                      required
                    />

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Loading..." : "تحديث"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
