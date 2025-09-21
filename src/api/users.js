import { fetchClient } from "./client";


export const login =(credentials)=>{
    return fetchClient("/auth/login",{
        method:"POST",
        body:JSON.stringify(credentials)
    })
}

export const getUsers =(parms = {} , page)=>{
    const filteredParams = Object.fromEntries(
        Object.entries(parms).filter(([_, value]) => value) // Remove empty values
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const url = queryString ? `/users?limit=250 &&page=${page}&&${queryString}` : `/users?limit=250 &&page=${page}`;
      return fetchClient(url);
}
// export const getSalesMan =(parms = {} , page)=>{
//     const filteredParams = Object.fromEntries(
//         Object.entries(parms).filter(([_, value]) => value) // Remove empty values
//       );
//       const queryString = new URLSearchParams(filteredParams).toString();
//       const url = queryString ? `/users?limit=250 &&page=${page}&&${queryString}` : `/users?limit=250 &&page=${page}`;
//       return fetchClient(url);
// }

export const CretaUser =(credentials)=>{
    return fetchClient("/users" , {
        method:"POST",
        body:JSON.stringify(credentials)
    })
}

export const deleteUser =(id)=>{
return fetchClient(`/users/${id}` ,{
    method :"DELETE"
})
}

export const updateUser =(id , credentials)=>{
   
    return fetchClient(`/users/${id}` , {
        method:"PUT",
        body:JSON.stringify(credentials)
    })
}
export const updateValidator =(id , credentials)=>{
   
    return fetchClient(`/users/updateValidatorSupervisors/${id}` , {
        method:"PUT",
        body:JSON.stringify(credentials)
    })
}

export const getOneUser =(id)=>{
    return fetchClient(`/users/${id}`)
}
export const getSuperVisors =()=>{
    return fetchClient(`/users/supervisors`)
}

export const getSalesMan =()=>{
    return fetchClient("/users/salesmen")
}
export const getNotifications =()=>{
    return fetchClient("/notifications/mine")
}
export const markAsRead =(id)=>{
    return fetchClient(`/notifications/read/${id}`, {
        method: "PATCH"
    })
}
export const readAll =()=>{
    return fetchClient(`/notifications/read`, {
        method: "PATCH"
    })
}


// countries

export const getCountries =()=>{
    return fetchClient("/countries")
}

export const addCountry =(credentials)=>{
   
    return fetchClient(`/countries` , {
        method:"POST",
        body:JSON.stringify(credentials)
    })
}
export const addCity =(id, credentials)=>{
   
    return fetchClient(`/countries/updateCities/${id}` , {
        method:"PATCH",
        body:JSON.stringify(credentials)
    })
}
export const deleteCountry =(id)=>{
   
    return fetchClient(`/countries/${id}` , {
        method:"DELETE"
    })
}