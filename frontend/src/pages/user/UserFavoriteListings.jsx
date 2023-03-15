import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {doc, getDoc, get, getDocs, collection} from 'firebase/firestore' 
import { db } from '../../firebase-config';
import { query, where, orderBy } from "firebase/firestore";
import { auth } from '../../firebase-config';

function UserFavoriteListings(props) {
    const [favoriteList, setFavoriteList] = useState([])
    
    useEffect(() => {
        const getUserFavorites = async () => {
            // const userCollectionRef = collection(db, "users")
            // const q = query(userCollectionRef, where("id", '==', auth.currentUser.uid));
            // const data = await getDoc(q);
            // setFavoriteList(data)

            const userRef = collection(db, "users")
            const q = query(userRef, where('id', '==', auth.currentUser.uid))
            const snapshot = await getDocs(q)
            const targetUser = doc(db, "users", snapshot.docs[0].id)
            const docsSnap = await getDoc(targetUser)
            setFavoriteList(docsSnap.data().likedBathrooms)
            console.log("peepee")
            console.log(favoriteList)
        }
        getUserFavorites()
    },[db, props])

    console.log(favoriteList);

    return (
        <div>
            {favoriteList.map((favorite) => (
                <div key={favorite.id}>
                    {/* <p>{favorite.amenities}</p> */}
                    {/* add more JSX to display other properties of the favorite object */}
                </div>
            ))}
        </div>
    );
}
export default UserFavoriteListings
