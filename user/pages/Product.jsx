import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../componets/Navbar';
import { Appcontex } from '../context/Appcontext';
import Contact from '../componets/Contact';
import StarRating from '../componets/Starrating';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const navigate = useNavigate()
    const { product, setProduct, user,openCart,getCart } = useContext(Appcontex)



    const { id } = useParams();
    const [count, setcount] = useState(1);
    const decriment = () => {
        if (count > 1) {
            setcount(count - 1);
        }
    }

    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/product/${id}`);
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
        getCart();
    }, []);

    useEffect(() => {
        getProductDetails();
    }, [id]);

    const addtocart = async (productId) => {
        const id = user._id
     
        try {
            const { data } = await axios.post(`http://localhost:4000/home/addtocart/${id}`, { productId, quantity:count})
            if (data.success) {
                toast.success(data.message);
                openCart();
                getCart();
                
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message );
        }
    };

    if (!product) return; const averageRating = product.Reviews?.length
        ? product.Reviews.reduce((sum, r) => sum + r.selectedRating, 0) / product.Reviews.length
        : 0;

    return (
        <>
            <Navbar />
            <div className='product-details'>
                <div>
                    <img className='pro-img' src={product.proImg} alt={product.proName} />
                </div>
                <div className='detail'>
                    <h2 className='product-info'>{product.proName}</h2>
                    <h3 className='price'>${product.proPrice}.00</h3>
                    <h6>Quantity*</h6>
                    <div className='counter'>
                        <button onClick={decriment} style={{ border: 'none', backgroundColor: 'transparent' }} >-</button> {count}
                        <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => setcount(count + 1)} >+</button>
                    </div>
                    <button onClick={() => addtocart(product._id)} className='productbtn'>Add to Cart</button>
                    <h4>Product info</h4>
                    <p>I'm a product detail. I'm a great place to add more
                        information about your product such as sizing,
                        material, care and cleaning instructions. This is
                        also a great space to write what makes this product
                        special and how your customers can benefit this item.</p>
                </div>
            </div>

            <div className='product-reveiws'>
                <div className='reveiws-heading'>
                    <h1>Product Reveiws</h1>
                    <div className='rating'>
                        <h1 style={{ margin: '10px' }}>{averageRating.toFixed(1)}</h1>
                        <div style={{ margin: '0px' }}>
                            <StarRating rating={averageRating} readOnly={true} />
                            <p>{product.Reviews.length} review{product.Reviews.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <div>
                        <p className='reveiws-heading-write' onClick={() => {
                            if (!user?._id) return toast.error("Please login to write a review");
                            navigate(`/reveiw/${id}/${user._id}`);
                        }}>
                            Write a review
                        </p>
                    </div>
                </div>
                <hr></hr>
                <div>
                    {product.Reviews?.length > 0 ? (
                        [...product.Reviews].reverse().map((review, index) => (

                            <div className='person-reveiw' key={index}>
                                <div>
                                    <h1>{review.userName}</h1>
                                    <p>Rating: {review.selectedRating} ⭐</p>
                                </div>
                                <div style={{ fontSize: '9px', width: '50%' }} >
                                    <h3>{review.interestingText}</h3>
                                    <p>{review.reviewText}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontStyle: 'italic', color: '#777' }}>No reviews yet.</p>
                    )}
                </div>
            </div>
            <Contact />
        </>
    );
};

export default ProductDetails;
