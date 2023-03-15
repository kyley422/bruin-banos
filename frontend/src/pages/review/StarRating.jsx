import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input type="radio" name="rating123"></input>
            <FaStar classname="stars" size={50}></FaStar>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
