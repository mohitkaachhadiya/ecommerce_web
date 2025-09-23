import React, { useContext, useState } from 'react'
import { assets } from '../src/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Appcontex } from '../context/Appcontext';

export const Login = () => {
    const navigate = useNavigate();
    const [state, setstate] = useState('login')
    const [name, setname] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setuser } = useContext(Appcontex) 
    const validate = (password) => {
        const minLength = /.{8,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const digit = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        return (
            minLength.test(password) &&
            upperCase.test(password) &&
            lowerCase.test(password) &&
            digit.test(password) &&
            specialChar.test(password)
        );
    }

    const handaleSubmi = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true
            if (!validate(password)) {
                toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
                return;
            }
            if (state === "signup") {
                const { data } = await axios.post('http://localhost:4000/register', { name, email, password })
                if (data.success) {
                    toast.success(data.message)
                    setname('')
                    setEmail('')
                    setPassword('')
                    setstate('login');
                } else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post('http://localhost:4000/login', { email, password });
                if (data.success) {
                    toast.success(data.message);
                    const user = data.user;
                    setuser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/home');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <>
            <div className="login-wrapper">
                <div className="logo">
                    <h2>wixs</h2>
                    <img style={{ width: '70px' }} className="logo-img" src={assets.bag7} alt="bag" />
                </div>
                <p className="tagline">funky printed Bags</p>
                <form className="login-form" onSubmit={handaleSubmi} >
                    {state === "signup" && (<> <label>Name</label>
                        <input  
                            type="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={e => setname(e.target.value)}
                            required
                        /></>)}
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {state === "signup" ? (
                        <div>
                            <button type="submit">Sign up</button>
                            <p>Already have account<span onClick={() => setstate('login')} style={{ textDecoration: 'underline', cursor: 'pointer' }} > login </span></p>
                        </div>) : (<div>
                            <button type="submit">Login</button>
                            <p>Don't have account<span onClick={() => setstate('signup')} style={{ textDecoration: 'underline', cursor: 'pointer' }} >Register here</span></p>
                        </div>)}
                </form>
            </div>
        </>
    )
}
