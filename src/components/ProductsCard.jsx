import React, { useState,useContext } from 'react'
import Button from './Button'
import toast from 'react-hot-toast'
import './componentStyle/CardStyle.css'
import { cartContext } from '../context/CartContext'




const ProductsCard = ({item,index}) => {
    const {setCartItems,addCart}=useContext(cartContext)


//   const handleClick=(item)=>{

//    toast("product was added sucessfully")
//    setCartItems(prev=>{
//     return [...prev,item]
//    })
// }
    

  const handleClick = () => {
    addCart(item); // ✅ add to cart
    toast.success("Product added successfully 🛒");
  };

    
  return (

<div className="card" key={index}>
  {/* <img src="img_avatar.png" alt="Avatar"/> */}
 
    <div className='card-image'>
    <img src={item.image} alt={item.image}  />

    </div>
    <div className='text-part'>
    <h4 className='card-name' ><b>{item.name_ar}</b></h4>
    <strong className='card-price'>{Number(item.price).toLocaleString()}JD</strong>
     <Button text='Add to cart' onClick={handleClick}/>
     {/* <Button  onClick={()=>alert("navigate to product details page")}>
        <smap>view details</smap>
     </Button> */}
     </div>
   

     
  
</div>

  )
}

export default ProductsCard