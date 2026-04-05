import API from "./api"

const  getAllDepartments=async()=>{
    const res=await API.get("/departments/all")
    return res.data
}





export{
    getAllDepartments

}