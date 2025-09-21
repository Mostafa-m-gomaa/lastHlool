import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCountry, getCountries } from '@/api/users'
import { Button } from '@/components/ui/button'
import { AddCountry } from '@/components/AddCountry'
import toast from 'react-hot-toast'
import { CitiesDialog } from '@/components/CitiesDialog'
import { AddCity } from '@/components/AddCity'

const Countries = () => {
  const queryClient = useQueryClient()

  // جلب المناطق
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries
  })

  const countriesData = countries?.data || []
  console.log(countriesData)

  // حذف منطقة
  const mutation = useMutation({
    mutationFn: (id) => deleteCountry(id),
    onSuccess: (res) => {
        console.log(res)
    queryClient.invalidateQueries({ queryKey: ['countries'] })
      if (res.status === "success") {
        toast.success("تم حذف المنطقة بنجاح")
        queryClient.invalidateQueries({ queryKey: ['countries'] }) }
      // } else {
      //   toast.error("حدث خطأ أثناء حذف المنطقة")
      // }
    },
 
  })

  return (
    <div className='w-[90%] mx-auto flex flex-col gap-6 py-6'>

      {/* الهيدر */}
      <div className="flex justify-between items-center w-full">
        <AddCountry />
        <h1 className="text-2xl font-bold">المناطق</h1>
      </div>

      {/* عرض المناطق */}
      <div className="flex flex-col gap-3 w-full">
        {countriesData.length > 0 ? countriesData.map((item) => (
          <div key={item._id} className='bg-white p-3 rounded-md shadow-sm'>
            <div className="flex justify-between items-center gap-4">
              <div className="text-right text-lg font-medium">{item?.title}</div>
              <div className="flex gap-4">
                <AddCity  id={item?._id}/>
              <CitiesDialog cities={item?.cities} id={item?._id} />

              <Button
                onClick={() => mutation.mutate(item?._id)}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={mutation.isLoading}
              >
حذف              </Button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500">لا توجد مناطق حالياً</div>
        )}
      </div>
    </div>
  )
}

export default Countries
