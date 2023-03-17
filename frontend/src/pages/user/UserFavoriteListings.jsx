import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {doc, getDoc, get, getDocs, collection} from 'firebase/firestore' 
import { db } from '../../firebase-config';
import { query, where, orderBy } from "firebase/firestore";
import { auth } from '../../firebase-config';
import BathroomRow from "./UserBathroomRow"


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


function UserFavoriteListings(props) {
    const [favoriteList, setFavoriteList] = useState([])
    const [favoritedBathrooms, setFavoritedBathrooms] = useState([])

    useEffect(() => {
        
        const getUserFavorites = async () => {
            if (localStorage.getItem("isAuth")) { 
                const userRef = collection(db, "users")
                const q = query(userRef, where('id', '==', auth.currentUser.uid))
                const snapshot = await getDocs(q)
                const targetUser = doc(db, "users", snapshot.docs[0].id)
                const docsSnap = await getDoc(targetUser)
                setFavoriteList(docsSnap.data().likedBathrooms)
            }
            else {}
        }
        getUserFavorites()
    },[db, props])

    useEffect(() => {
        const getBathrooms = async () => {
            const bathroomRef = collection(db, "bathroom")
            // console.log("This is the favoriteList rn:")
            // console.log(favoriteList)

            const q = query(bathroomRef, 
                where("__name__", "in", favoriteList)
                );
            const snapshot = await getDocs(q)
            console.log("poopoo")
            // console.log(snapshot)
            setFavoritedBathrooms(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(favoritedBathrooms)
        }
        getBathrooms()
    },[db, props, favoriteList])

    console.log(favoriteList);
    return (
        <div className='fav-listing-container'>
            {favoritedBathrooms
            .map((entry) => {
                let current_bathroom_row = <BathroomRow className='bathroom-favorite' key={entry.name}
                id={entry.id}
                name={entry.name} 
                image={entry.image} 
                genderImageURL={getGenderIconURL(entry.gender)}
                total_ratings={entry.total_ratings}
                score_overall={Math.round(entry.score_overall * 10) / 10}
                score_cleanliness={Math.round(entry.score_cleanliness * 10) / 10}
                score_comfort={Math.round(entry.score_comfort * 10) / 10}
                score_convenience={Math.round(entry.score_convenience * 10) / 10}
                score_amenities={Math.round(entry.score_amenities * 10) / 10}
                top_review={entry.topReviewText}
                fav_list={favoriteList}
            />
            return current_bathroom_row
            })}
        </div>
    );

}
export default UserFavoriteListings
