import API from "./api"

const  getAllCat=async()=>{
    const res=await API.get("/categories/all")
    return res.data
}

const getCatByDepart = async (departmentId) => { 
    const res = await API.get(`/categories/byDepartment/${departmentId}`)  
    return res.data
}







export{
    getAllCat,
    getCatByDepart

}