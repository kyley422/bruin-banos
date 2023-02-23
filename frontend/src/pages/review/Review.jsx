import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

function Review( {isAuth} ) {
  const [bathroom, setBathroom] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [overall, setOverall] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [comfort, setComfort] = useState("");
  const [convenience, setConvenience] = useState("");
  const [amenities, setAmenities] = useState("");

  // "reviews" is name of collection in Firebase
  const reviewsCollectionRef = collection(db, "reviews");
  let navigate = useNavigate();

  // auth.currentUser.displayName and uid are google account information we can use
  const createReview = async () => {
    await addDoc(reviewsCollectionRef, {
      bathroom: bathroom, 
      overall: overall,
      cleanliness: cleanliness,
      comfort: comfort,
      convenience: convenience,
      amenities: amenities,
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
        <label> Bathroom:</label>   
        <input 
          placeholder='Bathroom...' 
          onChange={(event) => {
          setBathroom(event.target.value)
          }}
        />
      </div>
      <div>
        <label> Overall:</label>   
        <input 
          placeholder='Overall Rating 1-5' 
          onChange={(event) => {
          setOverall(event.target.value)
          }}
        />
      </div>
      <div>
        <label> Cleanliness:</label>   
        <input 
          placeholder='Cleanliness Rating 1-5' 
          onChange={(event) => {
          setCleanliness(event.target.value)
          }}
        />
      </div>
      <div>
        <label> Comfort:</label>   
        <input 
          placeholder='Comfort Rating 1-5' 
          onChange={(event) => {
          setComfort(event.target.value)
          }}
        />
      </div>
      <div>
        <label> Convenience:</label>   
        <input 
          placeholder='Convenience Rating 1-5' 
          onChange={(event) => {
          setConvenience(event.target.value)
          }}
        />
      </div>
      <div>
        <label> Amenities:</label>   
        <input 
          placeholder='Amenities Rating 1-5' 
          onChange={(event) => {
          setAmenities(event.target.value)
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