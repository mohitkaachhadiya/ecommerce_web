import React, { useState } from 'react'
import StarRating from '../componets/Starrating';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Reveiws = () => {
    const { productId, userId } = useParams();

    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [interestingText, setInterestingText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://ecommerce-web-e9sm.onrender.com/reveiw/${productId}/${userId}`, {
                selectedRating,
                reviewText,
                interestingText
            });

            if (response.data.success) {
                toast.success(" Review submitted successfully!");
                navigate(`/product/${productId}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(" Failed to submit review.");
        }

    };

    return (
        <form className='rform' onSubmit={handleSubmit}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }} >Write a Review</h2>
            <StarRating onRatingSelect={setSelectedRating} />

            <textarea
                className='rtext'
                placeholder='Write something you like Interesting...'
                value={interestingText}
                onChange={e => setInterestingText(e.target.value)}
            />
            <textarea
                className='rtext'
                placeholder="Write your discription ..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />
            <button className='rbtn' type="submit">Submit Review</button>
        </form>
    );
};

export default Reveiws;
