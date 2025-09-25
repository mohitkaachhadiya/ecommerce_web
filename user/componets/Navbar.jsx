import React, { useContext, useState } from 'react'
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Appcontex } from '../context/Appcontext';
import axios from 'axios';


const Navbar = ({ scrollToAbout, scrollToContact }) => {
    const navigate = useNavigate();
    const { user, setuser, openCart, cartItems, setSearchdata, setSearchText, searchText } = useContext(Appcontex)
    const handleLogout = async () => {
        const log = await axios.post('https://ecommerce-web-e9sm.onrender.com/logout')
        setuser(null);
        localStorage.removeItem('user');
        navigate('/')
    }
    const handleSearch = async (e) => {
        const value = e.target.value
        try {
            setSearchText(value);
            const response = await axios.post('https://ecommerce-web-e9sm.onrender.com/search', { Searchvalue: value })
            setSearchdata(response.data.products);
        } catch (error) {
            setSearchdata([]);
        }
    }
    return (
        <>
            <div className='navbar'>
                <div>
                    <h1>wixs</h1>
                    <p>funky printed Bags</p>
                </div>
                <div>
                    <ul>
                        <li onClick={() => navigate('/home')} >Shope</li>
                        <li onClick={scrollToAbout} >About</li>
                        <li onClick={scrollToContact} >Contact</li>
                    </ul>
                </div>
                <div className='search'>
                    <input value={searchText} onChange={(e) => handleSearch(e)} type='text' placeholder='search' /> <SearchIcon />
                </div>
                <div style={{ display: 'flex' }}>
                    {
                        user && user.name && (
                            <div className="avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )
                    }
                    <button onClick={handleLogout} style={{ borderRadius: '90px', border: 'none', fontWeight: '600', cursor: 'pointer', backgroundColor: 'transparent' }} >Log out</button>
                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} >
                        {user?.role === 'admin' && (
                            <>
                                <button onClick={() => navigate(`/home/add`)} className='addbtn' >Add Products</button>
                            </>
                        )}
                    </div>
                </div>
                <div onClick={openCart} style={{ cursor: 'pointer' }} className='cart-count'>
                    {cartItems.length}
                </div>
                <LocalMallSharpIcon onClick={openCart} style={{ textDecoration: 'none', cursor: 'pointer', position: 'relative' }} />
            </div>
        </>
    )
}
export default Navbar;
