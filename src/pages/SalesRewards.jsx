// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { getTargets } from '@/api/targets'
// import TargetCard from '@/components/TargetCard'
// import { Button } from '@/components/ui/button'
// import { Link } from 'react-router-dom'
// import { getTargetsAnalytics } from '@/api/targets'
// import RewardCard from '@/components/RewardsCard'

// const SalesReward = () => {


//         const {data:targetsAn} = useQuery({
//             queryKey:['adminTargetsAn'],
//             queryFn:getTargetsAnalytics
//         })

    
  
// const rewards = targetsAn?.data || []
// console.log(rewards)

//   return (
//     <div className="flex flex-col gap-3 py-8">
//         <div className='flex  gap-2 justify-between w-[90%] mx-auto p-2 bg-white items-center rounded-md'>

//     <h1 className='bg-white p-4 rounded-md '>مستحقات المناديب</h1>

//         </div>

//     <div className="flex flex-col gap-3 w-[90%] mx-auto">
//     {rewards.map((reward , i)=><RewardCard item={reward}  number={i+1}/> )}
//     </div> 
//     </div>
//   )
// }

// export default SalesReward

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTargets, getTargetsAnalytics } from '@/api/targets'
import { getSalesMan } from '@/api/users'
import RewardCard from '@/components/RewardsCard'

const SalesReward = () => {
  // بيانات مستحقات التارجتات
  const { data: targetsAn } = useQuery({
    queryKey: ['adminTargetsAn'],
    queryFn: getTargetsAnalytics
  })

  // بيانات أسماء التارجتات
  const { data: targetsData } = useQuery({
    queryKey: ['targets'],
    queryFn: getTargets
  })

  // بيانات المناديب
  const { data: salesMen } = useQuery({
    queryKey: ['reportUsers'],
    queryFn: getSalesMan
  })

  const rewards = targetsAn?.data || []
  const targetOptions = targetsData?.data || []
  const salesMenItems = salesMen?.data || []

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTarget, setSelectedTarget] = useState("")
  const [selectedSalesman, setSelectedSalesman] = useState("")

  // الفلترة النهائية
  const filteredRewards = rewards
    .filter(reward =>
      reward?.user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      reward?.target?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
    )
    .filter(reward =>
      selectedTarget === "" || reward?.target?.title === selectedTarget
    )
    .filter(reward =>
      selectedSalesman === "" || reward?.user?.name === selectedSalesman
    )

  return (
    <div className="flex flex-col gap-3 py-8">
      {/* الفلاتر */}
      <div className="flex justify-between flex-wrap gap-4 items-center w-[90%] mx-auto p-2 bg-white rounded-md">
        <h1 className="bg-white p-4 rounded-md">مستحقات المناديب</h1>

 
<div className="flex w-[80%] mx-auto justify-between gap-4">

        <div className="flex items-center gap-2">
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="p-2 border rounded-md text-right text-[14px]"
          >
            <option value="">التارجت</option>
            {targetOptions.map((target) => (
              <option key={target._id} value={target.title}>
                {target.title}
              </option>
            ))}
          </select>
        </div>

        {/* فلتر المندوب */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSalesman}
            onChange={(e) => setSelectedSalesman(e.target.value)}
            className="p-2 border rounded-md text-right text-[14px]"
          >
            <option value="">المناديب</option>
            {salesMenItems.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
</div>
        {/* فلتر التارجت */}
      </div>

      {/* عرض المستحقات */}
      <div className="flex flex-col gap-3 w-[90%] mx-auto">
        {filteredRewards.length > 0 ? (
          filteredRewards.map((reward, i) => (
            <RewardCard key={reward._id || i} item={reward} number={i + 1} />
          ))
        ) : (
          <div className="text-center p-4 bg-white rounded-md text-gray-600">
            لا توجد نتائج مطابقة
          </div>
        )}
      </div>
    </div>
  )
}

export default SalesReward
