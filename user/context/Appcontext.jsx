
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const Appcontex = createContext()

export const Appcontexprovider = (props) => {

    const [user, setuser] = useState(null)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Searchdata, setSearchdata] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setuser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const openCart = () => {
        setIsCartOpen(true);
        document.body.style.overflow = 'auto';
    }

    const closeCart = () => {
        setIsCartOpen(false);
        document.body.style.overflow = 'auto';
    }

    const addCart = async (pid) => {
        const id = user._id
        try {
            const { data } = await axios.post(`https://ecommerce-web-e9sm.onrender.com/home/addtocart/${id}`, { productId: pid })
            if (data.success) {
                openCart();
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    const getCart = async () => {
        const id = user._id
        try {
            const { data } = await axios.get(`https://ecommerce-web-e9sm.onrender.com/home/getcart/${id}`)
            if (data.success) {
                toast.success(data.message);
                data.cart.forEach(item => {
                });

                const normalizedCart = data.cart.map(item => ({
                    ...item.product,
                    qty: item.quantity,
                    _id: item._id
                }));
                setCartItems(normalizedCart)
               
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    const value = {
        user,
        setuser,
        searchText,
        setSearchText,
        setProduct,
        product,
        setSearchdata,
        Searchdata,
        getCart,
        loading,
        isCartOpen,
        openCart,
        addCart,
        closeCart,
        cartItems,
        setCartItems
    }
    return (
        <Appcontex.Provider value={value} >
            {props.children}
        </Appcontex.Provider>
    )
}