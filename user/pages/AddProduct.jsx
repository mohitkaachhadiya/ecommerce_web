import React, { useEffect, useState } from 'react'
import { assets } from '../src/assets/assets';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const navigate = useNavigate()
    const [state, setstate] = useState('add')
    const [proImg, setproImg] = useState('');
    const [proName, setproName] = useState('')
    const [proPrice, setproPrice] = useState('');
    const [proColor, setproColor] = useState('');
    const [product, setProduct] = useState(null);
    const [proImgPublicId, setProImgPublicId] = useState('');

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setstate('edit');
            getProductDetails();
        } else {
            setstate('add')
        }
    }, [])

    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-web-e9sm.onrender.com/product/${id}`);
            if (data.success) {
                setProduct(data.product);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error loading product");
        }
    };

    useEffect(() => {
        if (product) {
            setproImg(product.proImg);
            setproName(product.proName);
            setproPrice(product.proPrice);
            setproColor(product.proColor);
            setProImgPublicId(product.proImgPublicId);
        }
    }, [product]);


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await axios.post(
                'https://ecommerce-web-e9sm.onrender.com/upload',
                formData,
                {
                    withCredentials: true,
                }
            );


            if (data.imageUrl) {
                setproImg(data.imageUrl);
                toast.success('Image uploaded successfully');
                setProImgPublicId(data.publicId);
            } else {
                toast.error('Image upload failed');
            }
        } catch (error) {
            toast.error('Image upload failed');
        }
    };


    const addorEditProduct = async (e) => {
        e.preventDefault();
        if (!proImg) {
            toast.error('Please upload an image first');
            return;
        }
        axios.defaults.withCredentials = true
        try {
            if (state === "add") {
                const { data } = await axios.post('https://ecommerce-web-e9sm.onrender.com/add', { proImg, proName, proImgPublicId, proPrice, proColor })

                if (data.success) {
                    toast.success(data.message)
                    setproImg('')
                    setProImgPublicId('');
                    setproName('')
                    setproPrice('')
                    setproColor('')
                    navigate('/home')

                } else {
                    toast.error(data.message)
                }
            }
            else {

                const { data } = await axios.post(`https://ecommerce-web-e9sm.onrender.com/update/${id}`, { proImg, proName, proImgPublicId, proPrice, proColor });
                if (data.success) {
                    setProduct(data.product);
                    setproImg(data.product.proImg);
                    setproName(data.product.proName);
                    setProImgPublicId(data.product.proImgPublicId);
                    setproPrice(data.product.proPrice);
                    setproColor(data.product.proColor);
                    toast.success(data.message);

                    navigate('/home');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(data.message || "Something went wrong");
        }
    }

    return (
        <div>
            <div className="login-wrapper">
                <p>Manage Products</p>
                <div className="logo">
                    <h2>wixs</h2>
                    <img style={{ width: '70px' }} className="logo-img" src={assets.bag7} alt="bag" />
                </div>
                <p className="tagline">funky printed Bags</p>
                <form className="login-form" onSubmit={addorEditProduct}  >
                    <input
                        type="file"
                        accept="image/*"
                        placeholder="img"
                        onChange={handleFileChange}
                        required
                    />
                    {proImg && <img src={proImg} alt="Preview" style={{ width: '150px' }} />}

                    <>
                        <input
                            type="text"
                            placeholder="Enter your product name"
                            value={proName}
                            onChange={e => setproName(e.target.value)}
                            required
                        />
                    </>
                    <input
                        type="text"
                        placeholder="Enter product price"
                        value={proPrice}
                        onChange={e => setproPrice(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter product color"
                        value={proColor}
                        onChange={e => setproColor(e.target.value)}
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        {state === "add" ? (

                            <div  >
                                <button type="submit">Add Product</button>
                            </div>) : (<div>
                                <button type="submit">Edit Product</button>
                            </div>)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
