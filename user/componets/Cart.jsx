import React, { useContext, useState } from 'react';
import { Appcontex } from '../context/Appcontext';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';
const Cart = () => {

    const { isCartOpen, closeCart, cartItems, setCartItems, user, getCart } = useContext(Appcontex)

    const incrQty = async (cid) => {
        const id = user._id
        try {
            const { data } = await axios.post(`https://ecommerce-web-e9sm.onrender.com/incQty/${id}`, { cartItemId: cid })
            if (data.success) {
                toast.success(data.message);
                getCart();

            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }

    };

    const decrQty = async (cid) => {
        const id = user._id
        try {
            const { data } = await axios.post(`https://ecommerce-web-e9sm.onrender.com/decQty/${id}`, { cartItemId: cid })
            if (data.success) {
                toast.success(data.message);
                getCart();

            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    const cartTotal = cartItems.reduce((total, item) => {
        const qty = item.qty || 1;
        return total + item.proPrice * qty;
    }, 0);

    const deleteCartItem = async (pid) => {
        const id = user._id
        try {
            const { data } = await axios.post(`https://ecommerce-web-e9sm.onrender.com/home/deletecartitem/${id}`, { cartItemId: pid })
            if (data.success) {
                toast.success(data.message);
                getCart();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    if (!isCartOpen) return null;

    return (
        <div className="cart-container open">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="cart-header">
                <h2>Cart</h2>
                <CloseIcon onClick={closeCart} style={{ cursor: 'pointer' }} />
            </div>
            <hr></hr>
            <div className="cart-body">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index}  >
                            <div className="cart-item">
                                <img className='cartimg' src={`https://ecommerce-web-e9sm.onrender.com${item.proImg}`} alt={item.proName} width="80" />
                                <div>
                                    <p>{item.proName}</p>
                                    <p>${item.proPrice}</p>
                                    <div className='qtycounter'>
                                        <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => decrQty(item._id)}>-</button>
                                        {item.qty}
                                        <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => incrQty(item._id)}>+</button>
                                    </div>
                                </div>
                                <p className='pricecart'> ${item.proPrice * item.qty}.00</p>
                                { }

                                <DeleteIcon onClick={() => deleteCartItem(item._id)} />
                            </div>

                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            <div className="cart-boddy">
                <hr></hr>
                <p style={{ fontSize: '10px' }}>Enter a promo code</p>
                <hr></hr>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>Estimated total</h4>
                    <h3>${cartTotal}.00</h3>

                </div>
                <p style={{ fontSize: '9px' }}>Taxes and shipping are calculated at checkout.</p>
                <button>Checkout</button>
            </div>
        </div>
    );
};
export default Cart;
