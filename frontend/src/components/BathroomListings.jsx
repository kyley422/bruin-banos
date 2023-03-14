import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {doc, getDoc, get, getDocs, collection} from 'firebase/firestore' 
import { db, auth } from '../firebase-config';
import { query, where, orderBy } from "firebase/firestore";

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

function getSortParam(param) {
    switch(param) {
        case "Overall":
            return "score_overall"
        case "Cleanliness":
            return "score_cleanliness"
        case "Comfort": 
            return "score_comfort"
        case "Convenience":
            return "score_convenience"
        case "Amenities":
            return "score_amenities"
    }
}

function BathroomListings(props) {
    const [bathroomList, setBathroomList] = useState([])
    const [topReviewTexts, setTopReviewTexts] = useState([])
    const [favoritedBathrooms, setFavoritedBathrooms] = useState([])
    const [clear, setClear] = useState(false)

    useEffect(() => {
        const getPosts = async () => {
            // Start with just displaying male bathrooms
            const bathroomCollectionRef = collection(db,"bathroom")
            const q = query(
                bathroomCollectionRef, 
                where("gender", 'in', [props.male ? 'male' : null, props.female ? 'female' : null, props.neutral ? 'neutral' : null]),
                orderBy(getSortParam(props.sortParam), "desc")
                );
            const data = await getDocs(q);
            // const data = await getDocs(bathroomCollectionRef)
            setBathroomList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getPosts()
    },[db, props])

    useEffect(() => {
        const getFavorites = async () => {
            console.log("made it here yipee!")
            if (localStorage.getItem("isAuth")) { 
                const userRef = collection(db, "users");
                const q = query(userRef, where('id', '==', auth.currentUser.uid))
                const snapshot = await getDocs(q)
                const targetUser = doc(db, "users", snapshot.docs[0].id)
                const docsSnap = await getDoc(targetUser)
                setFavoritedBathrooms(docsSnap.data().likedBathrooms)
                console.log("made it here yipee 2!")

            }
            else {
            }
        }
        getFavorites()
    },[db, props])

    useEffect(() => {
        setTopReviewTexts([])
        setClear(!clear)
    },[bathroomList])

    useEffect(() => {
        const getTopReviews = async (ref, index) => {
            try {
                const topReviewRef = doc(db, "reviews", ref)
                const topReview = await getDoc(topReviewRef)
                topReviewTexts[index] = topReview.data().reviewText
                setTopReviewTexts(topReviewTexts)
                // console.log(topReviewTexts)
            }
            catch {
                topReviewTexts[index] = "None yet. Be the first to write a review!"
                setTopReviewTexts(topReviewTexts)
            }
        }
        function mapReviews() {
            bathroomList.map((entry, index) => {
                getTopReviews(entry.reviews[0], index)
                return 0
            })
        }
        mapReviews()
        let tempTopReviewTexts = topReviewTexts.slice()
        setTopReviewTexts(tempTopReviewTexts)
        // console.log(topReviewTexts)
    },[clear])

    if (bathroomList.length === 0) {
        return <div className='bathroom-listings-not-found'>No results found. Try expanding your search.</div>
    }

    return <div className='bathroom-listings'>

    {bathroomList.map((entry, index) => {
        let current_bathroom_row = <BathroomRow className='bathroom-entry' 
            key={entry.name}
            id={entry.id} 
            name={entry.name} 
            image={entry.image} 
            genderImageURL={getGenderIconURL(entry.gender)}
            total_ratings={entry.total_ratings}
            score_overall={Math.round(entry.score_overall * 10)/10}
            score_cleanliness={Math.round(entry.score_cleanliness * 10)/10}
            score_comfort={Math.round(entry.score_comfort * 10)/10}
            score_convenience={Math.round(entry.score_convenience * 10)/10}
            score_amenities={Math.round(entry.score_amenities * 10)/10}
            top_review={topReviewTexts[index]}
            fav_list={favoritedBathrooms}
        />
        // console.log(entry.reviews[0])
        return current_bathroom_row
    })}
    </div>
}

export default BathroomListings
