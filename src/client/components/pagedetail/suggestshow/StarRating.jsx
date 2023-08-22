import React from "react";

const StarRating = ({ score }) => {
    if (!score || score < 0 || score > 5) {
        console.error("Invalid score provided:", score);
        return null; // Don't render anything if the score is invalid
    }

    const fullStars = Math.floor(score);
    const halfStars = (score - fullStars >= 0.5) ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    if (fullStars < 0 || halfStars < 0 || emptyStars < 0) {
        console.error("Invalid star calculation:", fullStars, halfStars, emptyStars);
        return null;
    }

    return (
        <div className="starContainer">
            {[...Array(fullStars)].map((_, i) => (
                <span key={i} className="fullStar">★</span>
            ))}
            {[...Array(halfStars)].map((_, i) => (
                <span key={i} className="halfStar">★</span>
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={i + fullStars + halfStars} className="emptyStar">★</span>
            ))}
        </div>
    );
}

export default StarRating
