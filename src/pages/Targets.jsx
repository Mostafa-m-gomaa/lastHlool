import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTargets } from '@/api/targets'
import TargetCard from '@/components/TargetCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getTargetsAnalytics } from '@/api/targets'
import { DateSearchFilter } from "@/components/DateSearchFilter" // ✅ تأكد من المسار الصحيح
import { useState } from 'react'


const Targets = () => {




    const {data:targets} = useQuery({
        queryKey:['targets'],
        queryFn:getTargets
    })

    const targetsItems = targets?.data || []
        const {data:targetsAn} = useQuery({
            queryKey:['adminTargetsAn'],
            queryFn:getTargetsAnalytics
        })

      
  const [searchDate, setSearchDate] = useState("")
  const [validhDate, setValidDate] = useState("")





  const filteredTargets = targetsItems?.filter((item) => {
  let matchesCreatedAt = true
  let matchesValidAt = true

  if (searchDate) {
    const createdAt = new Date(item?.createdAt)
    if (isNaN(createdAt.getTime())) return false
    const formatted = `${String(createdAt.getDate()).padStart(2, "0")}-${String(createdAt.getMonth() + 1).padStart(2, "0")}-${createdAt.getFullYear()}`
    matchesCreatedAt = formatted === searchDate
  }

  if (validhDate) {
    const validAt = item?.validAt
    if (isNaN(validAt.getTime())) return false
    const formatted = `${String(validAt.getDate()).padStart(2, "0")}-${String(validAt.getMonth() + 1).padStart(2, "0")}-${validAt.getFullYear()}`
    matchesValidAt = formatted === validhDate
  }

  return matchesCreatedAt && matchesValidAt
})

  return (
    <div className="flex flex-col gap-3 py-8">
        <div className='flex  gap-2 justify-between w-[90%] mx-auto p-2 bg-white items-center rounded-md'>
    <Button><Link to="/home/addtarget">اضافة هدف</Link></Button>
    <Button><Link to="/home/salesrewards">مستحقات المناديب</Link></Button>
    <h1 className='bg-white p-4 rounded-md '>الاهداف الموضوعه</h1>

        </div>
      <div className="w-full mb-4 flex justify-center">
          {/* <DateSearchFilter
            searchFunc={(type, value) => setSearchDate(value)}
            label="تاريخ الإنشاء"
            type="createdAt"
          />
          <DateSearchFilter
            searchFunc={(type, value) => setSearchDate(value)}
            label="تاريخ التفعيل"
            type="validAt"
          /> */}
        </div>
    <div className="flex flex-col gap-3 w-[90%] mx-auto">
        {filteredTargets?.length > 0
  ? filteredTargets.map((target, i) => (
      <TargetCard key={i} target={target} />
    ))
  : "لا يوجد أهداف"}

    {/* { filteredHistory.length > 0 ?  filteredHistory.map((target)=><TargetCard target={target} /> ) : "لا يوجد اهداف" } */}
    </div>
    </div>
  )
}

export default Targets