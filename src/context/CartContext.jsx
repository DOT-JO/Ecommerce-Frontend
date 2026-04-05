import { createContext,useState ,useEffect, Children} from "react";

export const cartContext = createContext({})     //initilize for the context with inti value object to provide more than nne data




   const initialCartItems =localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems'))
   :[]


   

const CartContextProvider = ({children}) => {

    
      const[cartItems,setCartItems]=useState(initialCartItems)


      
  useEffect(()=>{

    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])



  const addCart = (product) => {
  const existItem = cartItems.find(item => item._id === product._id);

  if (existItem) {
    const updatedCart = cartItems.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);

  } else {
    setCartItems([
      ...cartItems,
      { ...product, quantity: 1 }
    ]);
  }
};


  const increaseQty = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    )
  );
};


  // ✅ Remove item
  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addCart,
           setCartItems, 
        increaseQty,
        decreaseQty,
        removeItem
      }}
    >
      {children}
    </cartContext.Provider>
  );
};



export default CartContextProvider