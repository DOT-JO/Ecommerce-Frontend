
import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Header from "./components/Header"
import Products from "./pages/Products"
import Cart from "./components/Cart"
import Checkout from "./pages/Checkout"


function App() {



  return (
    <>

<Header/>

    <Routes>


      <Route element={<Login/>} path="/login" />
      <Route element={<Products  />  } path="/shop" />
<Route element={<Cart  />} path="/cart"/>
<Route path="/checkout" element={<Checkout />} />

      <Route element={<Register/>} path="/register" />
      <Route element={<Home/>} path="/"/>
      

    </Routes>


    
 
    </>
  )
}

export default App
