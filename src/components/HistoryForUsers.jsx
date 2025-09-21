




import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState ,useEffect } from "react"
import { Link } from "react-router-dom"
import { DateSearchFilter } from "@/components/DateSearchFilter" // ✅ تأكد من المسار الصحيح

export function HistoryForUsers({ history }) {
  const [open, setOpen] = useState(false)
  const [searchDate, setSearchDate] = useState("")
console.log(history)
  const formatDate = (date) => {
    if (!date) return "لايوجد"
    const validDate = new Date(date)
    if (isNaN(validDate.getTime())) return date

    const month = validDate.getMonth() + 1
    const day = validDate.getDate()
    const year = validDate.getFullYear()
    return `${day}/${month}/${year}`
  }

  const filteredHistory = history?.filter((item) => {
    if (!searchDate) return true

    const createdAt = new Date(item?.createdAt)
    if (isNaN(createdAt.getTime())) return false

    const formatted = `${String(createdAt.getDate()).padStart(2, "0")}-${String(createdAt.getMonth() + 1).padStart(2, "0")}-${createdAt.getFullYear()}`
    return formatted === searchDate
  })
useEffect(() => {
  if (!open) {
    setSearchDate("") // تصفير التاريخ عند إغلاق الديالوج
  }
}, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>السجل</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>سجل الاموال</DialogTitle>
        </DialogHeader>

        {/* ✅ الفلتر بالتاريخ باستخدام Calendar */}
        <div className="w-full mb-4 flex justify-center">
          <DateSearchFilter
            searchFunc={(type, value) => setSearchDate(value)}
            label="تاريخ الإنشاء"
            type="createdAt"
          />
        </div>

        {/* 📜 عرض النتائج */}
        <div className="w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center">
          {filteredHistory?.length > 0 ? (
            filteredHistory.map((item, index) => (
              <div
                className="flex bg-slate-400 p-4 rounded-md w-[90%] mx-auto my-2 flex-col gap-2 items-end"
                key={index}
              >
                <span>{item?.amount}</span>
                <span>{item?.type}</span>
                <span>{formatDate(item?.createdAt)} : تاريخ الإنشاء</span>
                {item?.reason && (
                  <span className="flex ">
                    {item?.reason} <span>: السبب</span>
                  </span>
                )}
                {item.report && (
                  <Button>
                    <Link to={`/home/onereport/${item?.report}`}>التقرير</Link>
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center w-full text-red-500">لا يوجد نتائج</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}



// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { Input } from "@/components/ui/input" // لو مش عندك input component، استخدم <input />

// export function HistoryForUsers({ history }) {
//   const [open, setOpen] = useState(false)
//   const [searchDate, setSearchDate] = useState("")
// console.log(history)
//   const formatDate = (date) => {
//     if (!date) return "لايوجد"
//     const validDate = new Date(date)
//     if (isNaN(validDate.getTime())) return date

//     const month = validDate.getMonth() + 1
//     const day = validDate.getDate()
//     const year = validDate.getFullYear()
//     return `${day}/${month}/${year}`
//   }

//   // 🧠 فلترة البيانات بناءً على تاريخ الدفع
//   const filteredHistory = history?.filter((item) => {
//     if (!searchDate) return true

//     const createdAt = new Date(item?.createdAt)
//     if (isNaN(createdAt.getTime())) return false

//     const formatted = `${createdAt.getFullYear()}-${String(
//       createdAt.getMonth() + 1
//     ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`

//     return formatted.includes(searchDate)
//   })

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>السجل</Button>
//       </DialogTrigger>
//       <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>سجل الاموال</DialogTitle>
//         </DialogHeader>

//         {/* 🔍 Input لتاريخ الدفع */}
//         <div className="w-full mb-4">
//           <Input
//             type="date"
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//             className="w-full"
//           />
//         </div>

//         {/* 📜 عرض النتائج */}
//         <div className="w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center">
//           {filteredHistory?.length > 0 ? (
//             filteredHistory.map((item, index) => (
//               <div
//                 className="flex bg-slate-400 p-4 rounded-md w-[90%] mx-auto my-2 flex-col gap-2 items-end"
//                 key={index}
//               >
//                 <span>{item?.amount}</span>
//                 <span>{item?.type}</span>
             
//                 <span>{formatDate(item?.createdAt)} : تاريخ الانشاء</span>
//                 {item?.reason && (
//                   <span className="flex ">
//                     {item?.reason} <span>: السبب</span>
//                   </span>
//                 )}
//                 {item.report && (
//                   <Button>
//                     <Link to={`/home/onereport/${item?.report}`}>التقرير</Link>
//                   </Button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="text-center w-full text-red-500">لا يوجد نتائج</div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
