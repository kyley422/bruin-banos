import React, { useEffect, useState } from 'react'
import { addDoc, getDocs, collection, getDoc, setDoc, doc, arrayUnion, query, where } from 'firebase/firestore'
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
  const bathroomCollectionRef = collection(db, "bathroom");
  let navigate = useNavigate();

  // auth.currentUser.displayName and uid are google account information we can use
  const createReview = async () => {
    let newReview = await addDoc(reviewsCollectionRef, {
      bathroom: bathroom, 
      overall: overall,
      cleanliness: cleanliness,
      comfort: comfort,
      convenience: convenience,
      amenities: amenities,
      reviewText: reviewText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
    });
    const q = query(bathroomCollectionRef, where('name', '==', bathroom))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      console.log("Bathroom NOT Found")
    }
    else {
      // Add review ID to corresponding bathroom
      const targetBathroomRef = doc(db, "bathroom", snapshot.docs[0].id)
      setDoc(targetBathroomRef, {reviews: arrayUnion(newReview.id)}, {merge: true})
      // Calculate new bathroom scores
      const targetBathroomDoc = await getDoc(targetBathroomRef).then((snap) => {
        const current_overall = snap.data().total_score_overall
        const current_cleanliness = snap.data().total_score_cleanliness
        const current_comfort = snap.data().total_score_comfort
        const current_convenience = snap.data().total_score_convenience
        const current_amenities = snap.data().total_score_amenities
        const current_total_ratings = snap.data().total_ratings

        const new_overall = current_overall + parseFloat(overall)
        const new_cleanliness  = current_cleanliness + parseFloat(cleanliness)
        const new_comfort = current_comfort + parseFloat(comfort)
        const new_convenience = current_convenience + parseFloat(convenience)
        const new_amenities = current_amenities + parseFloat(amenities)
        const new_total_ratings = current_total_ratings + 1

        setDoc(targetBathroomRef, {
          // Update the cumulative data
          total_score_overall: new_overall,
          total_score_cleanliness: new_cleanliness,
          total_score_comfort: new_comfort,
          total_score_convenience: new_convenience,
          total_score_amenities: new_amenities,

          // Update the average score
          score_overall: new_overall/new_total_ratings,
          score_cleanliness: new_cleanliness/new_total_ratings, 
          score_comfort: new_comfort/new_total_ratings,
          score_convenience: new_convenience/new_total_ratings,
          score_amenities: new_amenities/new_total_ratings,
          total_ratings: new_total_ratings,
        }, {merge: true})
      })
    }
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