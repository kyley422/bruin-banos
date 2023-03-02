import React, { useState, useEffect } from 'react'
import {doc, getDoc, get, getDocs, collection} from 'firebase/firestore' 
import { db } from '../firebase-config';

import BathroomRow from '../components/BathroomRow'

function getGenderIconURL(gender) {
    switch(gender) {
        case "male":
            return "https://i.imgur.com/xmE2DNn.png"
        case "female":
            return "https://i.imgur.com/ZM70u3v.png"
        // gender neutral
        default:
            return "https://i.imgur.com/NwvJX2F.png"
    }
}

const getTopReview = async (ref) => {
    const topReviewRef = doc(db, "reviews", ref)
    const topReview = await getDoc(topReviewRef)
    console.log(topReview.data())
    return topReview
}

function BathroomListings() {
    const [bathroomList, setBathroomList] = useState([])
    const bathroomCollectionRef = collection(db,"bathroom")

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(bathroomCollectionRef)
            setBathroomList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getPosts()
    },[db])
    return <div className='bathroom-listings'>{bathroomList.map((entry) => {
        // console.log(entry)
        console.log(entry.reviews[0])
        return <BathroomRow className='bathroom-entry' 
        name={entry.name} 
        image={entry.image} 
        genderImageURL={getGenderIconURL(entry.gender)}
        total_ratings={entry.total_ratings}
        score_overall={entry.score_overall}
        score_cleanliness={entry.score_cleanliness}
        score_comfort={entry.score_comfort}
        score_convenience={entry.score_convenience}
        score_amenities={entry.score_amenities}
        // top_review={entry.reviews}
        />
    })}</div>
}

export default BathroomListings
