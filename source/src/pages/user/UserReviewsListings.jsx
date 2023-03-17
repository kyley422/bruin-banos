import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {doc, getDoc, get, getDocs, collection} from 'firebase/firestore' 
import { db } from '../../firebase-config';
import { query, where, orderBy } from "firebase/firestore";
import { auth } from '../../firebase-config';
import Review from './UserReview'


function UserReviewsListings(props) {
    const [reviewList, setReviewList] = useState([])
    
    useEffect(() => {
        const getUserReviews = async () => {
            const reviewsCollectionRef = collection(db,"reviews")
            const q = query(
                reviewsCollectionRef,
                where("author.id", '==', auth.currentUser.uid)
                );
            const data = await getDocs(q);
            setReviewList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

        }
        getUserReviews()
    },[db, props])

    // console.log(reviewList);

    return (
        <div className='review-listing-container'>
        {reviewList.map((item, index) => {
          let current_bathroompage_row = <Review className='bathroompage-entry' key={index}
            name={item.author.name}
            overall={item.overall}
            cleanliness={item.cleanliness}
            comfort={item.comfort}
            convenience={item.convenience}
            amenities={item.amenities}
            reviewText={item.reviewText}
            bathroom={item.bathroom}
          />
          return current_bathroompage_row
        })}
      </div>
    );
}
export default UserReviewsListings
