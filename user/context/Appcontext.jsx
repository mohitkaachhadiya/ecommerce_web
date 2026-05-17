
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cartService } from "../services/cartService";
import { normalizeCartItems } from "../utils/cart";


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
        if (!user?._id) return toast.error("Please login first");
        try {
            const { data } = await cartService.addItem(user._id, { productId: pid })
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
        if (!user?._id) return;
        try {
            const { data } = await cartService.getItems(user._id)
            if (data.success) {
                setCartItems(normalizeCartItems(data.cart))
               
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
        addToCart: addCart,
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
