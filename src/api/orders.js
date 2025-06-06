import { fetchClient } from "./client";


export const getOrders = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders?limit=250 &&page=${page}&&${queryString}` : `/orders?limit=250 &&?page=${page}`;
    return fetchClient(url);
  };
export const getOrdersAnalytics = (start , end) => {
    const url =  `/orders/analytics?startDate=${start}&&endDate=${end}`;
    return fetchClient(url);
  };
export const getUndeliveredOrders = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders/unDelivered&&${queryString}` : `/orders/unDelivered`;
    return fetchClient(url);
  };


export const getMyOrders = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders/mine?limit=250 &&?page=${page}&&${queryString}` : `/orders/mine?limit=250 &&?page=${page}`;
    return fetchClient(url);
  };
export const getDeliveringOrders = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders/getReadyToBeDeliveredOrders?limit=250 &&?page=${page}&&${queryString}` : `/orders/getReadyToBeDeliveredOrders?limit=250 &&?page=${page}`;
    return fetchClient(url);
  };

  export const makeOrderReady =(id , params)=>{

    const url = `/orders/${id}/ready`
    return fetchClient(url , {
        method:"PUT",
        body:JSON.stringify(params)
    })
  }
  export const makeOrderAttheDeliver =(id )=>{

    const url = `/orders/${id}`
    return fetchClient(url , {
        method:"PUT",
        body:JSON.stringify({
          deliveryStatus:"قيد التوصيل"
        })
    })
  }
  export const cancelTheOrder =(id)=>{

    const url = `/orders/${id}`
    return fetchClient(url , {
        method:"PUT",
        body:JSON.stringify({
          deliveryStatus:"ملغي"
        })
    })
  }
  export const retrieveOrder =(id )=>{

    const url = `/orders/${id}`
    return fetchClient(url , {
        method:"PUT",
        body:JSON.stringify({
          deliveryStatus:"غير جاهز للتسليم"
        })
    })
  }
  export const deleteOrder =(id )=>{

    const url = `/orders/${id}`
    return fetchClient(url , {
        method:"DELETE"
  
    })
  }

  // export const createOrder =(params)=>{
  //   const url = `/orders`
  //   return fetchClient(url , {
  //       method:"POST",
  //       body:JSON.stringify(params)
  //   })
  // }

  export const createOrder = (params) => {
  const url = `/orders`;
  const formData = new FormData();
  if (params.receiptImage) {
    formData.append('receiptImage', params.receiptImage);
    delete params.receiptImage;
  }
Object.entries(params).forEach(([key, value]) => {

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    formData.append(key, JSON.stringify(value));
  }
  else if (Array.isArray(value)) {
    
    // value?.forEach((item)=> formData.append("customersData",JSON.stringify(item)))
    formData.append(key, JSON.stringify(value));
  }
  else {
    formData.append(key, value);
  }
});



  return fetchClient(url, {
    method: 'POST',
    body: formData,
  });
};


  export const updatOrder = (params , id) => {
  const url = `/orders/${id}`;
  const formData = new FormData();
  if (params.receiptImage) {
    formData.append('receiptImage', params.receiptImage);
    delete params.receiptImage;
  }else {delete params.receiptImage;}
Object.entries(params).forEach(([key, value]) => {

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    formData.append(key, JSON.stringify(value));
  }
  else if (Array.isArray(value)) {
    
    // value?.forEach((item)=> formData.append("customersData",JSON.stringify(item)))
    formData.append(key, JSON.stringify(value));
  }
  else {
    formData.append(key, value);
  }
});


  return fetchClient(url, {
    method: 'PUT',
    body: formData,
  });
};

  export const updateOrder =(params,id)=>{
    const url = `/orders/${id}`
    return fetchClient(url , {
        method:"PUT",
        body:JSON.stringify(params)
    })
  }



  export const getOneOrder = (id) => {
    return fetchClient(`/orders/${id}`);
  }


  // reports side 
  export const getReports = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/reports?limit=250 &&?page=${page}&&${queryString}` : `/reports?limit=250 &&?page=${page}`;
    return fetchClient(url);
  };
export const getMyReports = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/reports/mine?limit=250 &&?page=${page}&&${queryString}` : `/reports/mine?limit=250 &&?page=${page}`;
    return fetchClient(url);
  }; 
  export const createReport =(params)=>{
    const url = `/reports`
    return fetchClient(url , {
        method:"POST",
        body:JSON.stringify(params)
    })
  }
  export const updateReport =(id,params)=>{
    const url = `/reports/${id}`
    return fetchClient(url , {
        method:"PATCH",
        body:JSON.stringify(params)
    })
  }
  export const onProgressReport =(id)=>{
    const url = `/reports/${id}`
    return fetchClient(url , {
        method:"PATCH",
        body:JSON.stringify({
          status:"قيد المطابقه"
        })
    })
  }

  export const getOneReport =(id)=>{
    return fetchClient(`/reports/details/${id}`)
  }
  export const approveReport =(id)=>{
    return fetchClient(`/reports/confirm/${id}`, {
        method:"PATCH"
    })
  }
  export const availableRepsToUpdate =(id)=>{
    return fetchClient(`/reports/availSupervisorToUpdateReport/${id}`, {
        method:"PATCH"
    })
  }
  export const deleteReport =(id)=>{
    return fetchClient(`/reports/${id}`, {
        method:"DELETE"
    })
  }
  export const getaAvailableRepsCountsToUpdate =(id)=>{
    return fetchClient(`/reports/countReportUpdatePermissions/${id}`)
  }


  // cash verification section

  export const cashVerify =()=>{
    return fetchClient(`/cash-verification-requests/mine`)
  }
  export const getCompanydues =()=>{
    return fetchClient(`/company-dues`)
  }

  export const getDues = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/company-dues?limit=250 &&?page=${page}&&${queryString}` : `/company-dues?limit=250 &&?page=${page}`;
    return fetchClient(url);
  };
  export const getMyDues = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/company-dues/mine?limit=250 &&?page=${page}&&${queryString}` : `/company-dues/mine?limit=250 &&?page=${page}`;
    return fetchClient(url);
  };

  export const verifyCash =(id)=>{
    return fetchClient(`/cash-verification-requests/${id}`, {
        method:"PUT" ,
        body:JSON.stringify({
          reply:true
        })
    })
  }


  export const payDues =(id , params)=>{

    const url = `/company-dues/${id}`
    return fetchClient(url , {
        method:"PATCH",
        body:JSON.stringify(params)
    })
  }

  export const payDuesForUser =(id , params)=>{

    const url = `/user-dues/${id}`
    return fetchClient(url , {
        method:"PATCH",
        body:JSON.stringify(params)
    })
  }


  export const getUsersDues =()=>{
    return fetchClient(`/user-dues?limit=250`)
  }
  export const getMineDues =()=>{
    return fetchClient(`/user-dues/mine`)
  }
  export const getDuesOverMe =()=>{
    return fetchClient(`/company-dues/mine`)
  }
