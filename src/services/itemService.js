import API from "./api"

const  getAllItems=async()=>{
    const res=await API.get("/items/all")
    return res.data
}



const getItemsByCategory = async (categoryId) => {
    const res = await API.get(`/items/byCategory/${categoryId}`)
    return res.data
}


export{
    getAllItems,
    getItemsByCategory

}