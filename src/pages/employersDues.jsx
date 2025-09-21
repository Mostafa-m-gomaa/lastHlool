import React, { useEffect } from 'react'

import { getUsers } from '@/api/users'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { UsersTable } from '@/components/UsersTable'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState  } from 'react'
import { ComboboxOrders } from '@/components/CompoBoxForOrders'
import { Input } from "@/components/ui/input"
import { toast } from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import UserCard from '@/components/UserCard'
import { getUsersDues } from '@/api/orders'
import UserCardForDues  from '../components/UserCardForDues'


const EmployersDues = () => {

const {data : userDues , isLoading : isDuesLoading} = useQuery({
  queryKey:["duesForUsers"],
    queryFn:getUsersDues
})
const userDuesData = userDues?.data || []


  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-col lg:flex-row-reverse justify-between items-center py-4 gap-8">
          <h1 className=''>الموظفين</h1>
          <div className="flex w-full lg:w-[50%] gap-4">

          </div>

      </div>
          {/* {usersItems.length > 0 || !isLoading ?  <UsersTable users={usersItems} /> : <Loader />} */}

          {isDuesLoading ? <Loader />: 
          <div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {userDuesData.map((item,index)=>( 
             <UserCardForDues  key={index} number={index+1} item={item}/> 
          ))}
            </div>
   
          }
          {/* <PaginationDemo  currentPage ={page} numberOfPages={numberOfPages} setPage={setPage}/> */}

        
          
      </div>
  )
}

export default EmployersDues