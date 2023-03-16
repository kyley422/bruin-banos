import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            ></input>
            <FaStar
              className="stars"
              color={ratingValue <= (hover || rating) ? "#FFD100" : "e4e5e9"}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            ></FaStar>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
