import { getNotifications, markAsRead, readAll } from '@/api/users';
import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const Notifications = () => {
    const queryClient = useQueryClient();

const {data: notifications, isLoading, isError } = useQuery({
  queryKey: ["notifications"],
    queryFn: getNotifications
});

const notificationsItems = notifications?.data || []
const mutation = useMutation({
    mutationFn: (id)=>markAsRead(id),
    onSuccess: (res) => {
        if (res.errors) {
            toast.error(res.errors[0].msg);
        } else {
            toast.success("تم قراءة الاشعار بنجاح");
            // Optionally, refetch notifications to update the UI
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    },
})
const readAllMutation = useMutation({
    mutationFn: readAll,
    onSuccess: (res) => {
        console.log(res);
        if (res.errors) {
            toast.error(res.errors[0].msg);
        } 
        else {
            toast.success("تم قراءة الاشعارات بنجاح");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    },
})
  return (
    <div className='flex flex-col py-4 '>
        <h1>الاشعارات</h1>
        <div onClick={() => readAllMutation.mutate()} className='w-fit mx-auto mb-4'>
            <Button className='bg-blue-500 text-white hover:bg-blue-600'>
                قراءة جميع الاشعارات
            </Button>
        </div>
        <div className='w-[90%] mx-auto flex flex-col gap-4 pt-8'>
            {isLoading && <div className='flex justify-center items-center'><Loader /></div>}
            {isError && <div className='text-red-500'>حدث خطأ في تحميل البيانات</div>}
            {notificationsItems.map((notification) => (
                <div onClick={()=>mutation.mutate(notification._id)}  key={notification._id} className={`p-4 border rounded-md shadow-sm  ${notification.isRead ?  "bg-[#b5b7c9]" : "bg-white "  } cursor-pointer flex flex-col gap-2  items-end`}>
                    <p>{notification.message}</p>
                    <span className='text-sm text-gray-500'>{new Date(notification.createdAt).toLocaleDateString()}</span>
                          {notification.report &&      <Button>
                        <Link to={`${notification.order ?"" :`/home/onereport/${notification.report}` }`}>
                      عرض التقرير
                        </Link>
                    </Button> }
                          {notification.order &&  
                              <Button asChild>
                        <Link to={`/home/oneorder/${notification.order}` }>
                      عرض الطلب
                        </Link>
                    </Button> }
           
                </div>
            ))}
            {notificationsItems.length === 0 && <div className='text-center text-gray-500'>لا توجد اشعارات</div>}

            </div>
    </div>
  )
}

export default Notifications