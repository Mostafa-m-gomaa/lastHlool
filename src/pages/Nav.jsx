import React from 'react'
import logo from '../assets/logo.png'
import { Button } from '@/components/ui/button'   
import { MenuSheet } from '@/components/MenuSheet'
import { BellRingIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getNotifications } from '@/api/users'
const Nav = () => {
  const {data: notifications, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
      queryFn: getNotifications
  });
  
  const notificationsItems = notifications?.data || []
  const newNotifications = notificationsItems.filter(item => !item.isRead).length;
  console.log(newNotifications);
  return (
    <div className="flex w-full shadow-xl bg-gray-100 justify-end  " >
        <div className="w-[100%] lg:w-[60%]  flex justify-between items-center p-2 pr-6">

<img src={logo} alt="" className='w-[100px] lg:w-[140px] rounded-lg' />
<Link to="notifications" className="bg-white p-4 rounded-md shadow-md flex items-center gap-2 relative">
<span className='absolute bg-[red] text-white top-[-10px] right-[-10px] px-2 rounded-md'>{newNotifications}</span>
        <BellRingIcon />
</Link>
        <MenuSheet />
        </div>
    </div>
  )
}

export default Nav