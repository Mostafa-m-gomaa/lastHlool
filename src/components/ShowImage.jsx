import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ShowImage({ image }) {
  const handleDownload = async () => {
    const response = await fetch(image)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'image.jpg'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <Dialog className="w-[90%]">
      <DialogTrigger asChild>
        <Button>عرض الصورة</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90vw] max-w-[90vw] lg:min-w-[90vw]">
     
            <Button className="w-fit"  onClick={handleDownload}>
              تنزيل الصورة
            </Button>

        <img
          src={image}
          alt="صورة الطلب"
          className="w-[95%] lg:w-[90%] mx-auto h-[35vh] lg:h-[70vh] object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}
