import React, { useEffect, useState } from 'react';

const StarRating = ({ onRatingSelect, rating = 0, readOnly = false }) => {
    const [currentRating, setCurrentRating] = useState(rating);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        if (readOnly) {
            setCurrentRating(rating);
        }
    }, [rating, readOnly]);

    const handleClick = (index) => {
        if (readOnly) return;
        else {
            onRatingSelect(index);
            setCurrentRating(index);
            readOnly = false;
        }
    };
    const setstar=(star)=>{
        if(readOnly){
            setHover(0)
        }
        else{
            setHover(star)
        }
    }

    return (
        <div style={{ display: 'flex', cursor: 'pointer' }} className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                key={star}
                className={`star ${hover >= star || rating >= star ? 'filled' : ''}`}
                onClick={() => handleClick(star)}
                onMouseEnter={() => setstar(star)}
                onMouseLeave={() => setHover(currentRating)}
                >
                  
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
