import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

function Review( {isAuth} ) {
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");

  // "reviews" is name of collection in Firebase
  const reviewsCollectionRef = collection(db, "reviews");
  let navigate = useNavigate();

  // auth.currentUser.displayName and uid are google account information we can use
  const createReview = async () => {
    await addDoc(reviewsCollectionRef, {
      title: title, 
      reviewText: reviewText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Create A Post</h1>
      </div>
      <div>
        <label> Title:</label>   
        <input 
          placeholder='Title...' 
          onChange={(event) => {
          setTitle(event.target.value)
          }}
        />
      </div>
      <div>
        <label> Review:</label>
        <textarea 
          placeholder='Review...' 
          onChange={(event) => {
          setReviewText(event.target.value)
          }}
        />
      </div>
      <button onClick={createReview}>
        Submit Review
      </button>

    </div>
  )
}

export default Review;