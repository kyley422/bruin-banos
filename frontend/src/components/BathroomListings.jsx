import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {doc, getDoc, get, getDocs, collection} from 'firebase/firestore' 
import { db } from '../firebase-config';
import { query, where } from "firebase/firestore";

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


function BathroomListings(props) {
    const [bathroomList, setBathroomList] = useState([])

    const [topReviewTexts, setTopReviewTexts] = useState([])

    const firstUpdate = useRef(true)

    useEffect(() => {
        const getPosts = async () => {
            // Start with just displaying male bathrooms
            const bathroomCollectionRef = collection(db,"bathroom")
            const q = query(
                bathroomCollectionRef, 
                where("gender", 'in', [props.male ? 'male' : null, 'female', 'neutral'])
                );
            const data = await getDocs(q);
            // const data = await getDocs(bathroomCollectionRef)
            setBathroomList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getPosts()
    },[db, props])

    useEffect(() => {
        const getTopReviews = async (ref) => {
            const topReviewRef = doc(db, "reviews", ref)
            const topReview = await getDoc(topReviewRef)
            topReviewTexts.push(topReview.data().reviewText)
            setTopReviewTexts(topReviewTexts)
            console.log(topReviewTexts)
        }
        function mapReviews() {
            bathroomList.map((entry) => {
                getTopReviews(entry.reviews[0])
                return 0
            })
        }
        mapReviews()
        let tempTopReviewTexts = topReviewTexts.slice()
        setTopReviewTexts(tempTopReviewTexts)
    },[bathroomList])

    return <div className='bathroom-listings'>
    {bathroomList.map((entry, index) => {
        let current_bathroom_row = <BathroomRow className='bathroom-entry' key={entry.name} 
            name={entry.name} 
            image={entry.image} 
            genderImageURL={getGenderIconURL(entry.gender)}
            total_ratings={entry.total_ratings}
            score_overall={entry.score_overall}
            score_cleanliness={entry.score_cleanliness}
            score_comfort={entry.score_comfort}
            score_convenience={entry.score_convenience}
            score_amenities={entry.score_amenities}
            top_review={"\"" + topReviewTexts[index] + "\""}
        />
        return current_bathroom_row
    })}
    </div>
}

export default BathroomListings
