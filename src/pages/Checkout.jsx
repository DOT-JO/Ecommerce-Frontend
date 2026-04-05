

import React, { useContext } from 'react'
import { cartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';  
import '../style/Checkout.css';                       

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(cartContext);
  const navigate = useNavigate(); 

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("يجب تسجيل الدخول أولاً!");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      const res = await fetch("https://backend1-u5fc.onrender.com/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            item: item._id,
            name_ar: item.name_ar,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          }))
        })
      });

      if (res.status === 401 || res.status === 403) {
  localStorage.removeItem("token");
  toast.error("please login again");
  setTimeout(() => navigate("/login"), 1500);
  return;
}

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Order failed");
      }

      await res.json();
      setCartItems([]);
      toast.success(" you porder have complete successfully !");
      setTimeout(() => navigate("/shop"), 2000);

    } catch (err) {
      console.error(err);
      toast.error("something went wrong");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  return (
    <div className="checkoutPage">
      <div className="checkoutHeader">
        <h2 className="checkoutTitle"> Place Order </h2>
        <p className="checkoutSubtitle">{cartItems.length}  product in your cart </p>
      </div>

      <div className="checkoutLayout">

        <div className="checkoutItemsCard">
          <h3 className="checkoutSectionTitle">Products</h3>
          {cartItems.map(item => (
            <div key={item._id} className="checkoutItem">
              <div className="checkoutItemInfo">
                {item.image && (
                  <img src={item.image} alt={item.name_ar} className="checkoutItemImg" />
                )}
                <div>
                  <p className="checkoutItemName">{item.name_ar}</p>
                  {item.size && <span className="checkoutBadge">{item.size}</span>}
                  {item.color && <span className="checkoutBadge">{item.color}</span>}
                </div>
              </div>
              <div className="checkoutItemRight">
                <p className="checkoutItemQty">x {item.quantity}</p>
                <p className="checkoutItemPrice">{item.price * item.quantity} JD</p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkoutSummary">
          <h3 className="checkoutSectionTitle">order Summary </h3>
          <div className="checkoutSummaryRow">
            <span>Products</span>
            <span>{cartItems.length} piece</span>
          </div>
          <div className="checkoutSummaryRow">
            <span>التوصيل</span>
            <span className="checkoutFree"> cash on delivary </span>
          </div>
        
          <hr className="checkoutDivider" />
          <div className="checkoutSummaryRow total">
            <span>total</span>
            <span>{totalPrice} JD</span>
          </div>
          <button
            className="checkoutConfirmBtn"
            onClick={cartItems.length > 0 ? handleCheckout : undefined}
            disabled={cartItems.length === 0}
          >
            confirm Order
          </button>
          <button className="checkoutBackBtn" onClick={() => navigate("/shop")}>
            ← continu shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;