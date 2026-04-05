import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { cartContext } from '../context/CartContext'
import './componentStyle/Cart.css'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { removeItem, cartItems, increaseQty, decreaseQty } = useContext(cartContext)
    const navigate = useNavigate();

    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.quantity, 0);
        
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-wrapper">
            <div className="cart-header">
                <h2 className="cart-title">shopping cart</h2>
                <span className="cart-badge">{totalItems}</span>
            </div>

            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <span className="cart-empty-icon"></span>
                    <h2 className="cart-empty-title">cart is empty </h2>
                    <p className="cart-empty-sub">you have not add any product yet!</p>
                    <button className="cart-shop-btn" onClick={() => navigate("/shop")}>
                       shop now
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-list">
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item._id} className="cart-item">
                                    <img src={item.image} alt={item.name_ar} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <h4 className="cart-item-name">{item.name_ar}</h4>
                                        <p className="cart-item-price">{Number(item.price).toLocaleString()} JD</p>
                                    </div>
                                    <div className="cart-item-controls">
                                        <button className="cart-qty-btn" onClick={() => increaseQty(item._id)}>+</button>
                                        <span className="cart-qty">{item.quantity}</span>
                                        <button className="cart-qty-btn" onClick={() => decreaseQty(item._id)}>-</button>
                                        <button className="cart-remove-btn" onClick={() => removeItem(item._id)}>✕</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="cart-footer">
                        <div className="cart-total">
                             <span>{totalPrice} JD</span>
                            <span>total</span>
                           
                        </div>
                        <Button text="place Order" className="cart-checkout-btn" onClick={() => navigate("/checkout")} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart