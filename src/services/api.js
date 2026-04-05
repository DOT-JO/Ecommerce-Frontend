import axios from "axios"

const API= axios.create({                //Create Axios instance
    baseURL:"http://localhost:8001"         
})

API.interceptors.request.use((req)=>{                   //Run this function before every request is sent So ANY request like    API.get(...) / API.post(...) will pass through this function first
  const token = localStorage.getItem("token") 


    if(token) req.headers.Authorization=`Bearer ${token}`

    return req

})

export default API




// Instead of writing axios.get(...) everywhere,
//  we create a custom Axios instance with:

// a base URL
// automatic token handling (VERY important for auth)




// Without interceptor:

// Every time we send a request, we must manually do:

// axios.get("/items", {
//   headers: {
//     Authorization: "Bearer TOKEN"
//   }
// })

// With interceptor:

// we write this logic once, and it runs for every request automatically