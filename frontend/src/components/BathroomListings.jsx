import React, { useState, useEffect } from 'react'
import {getDocs, collection} from 'firebase/firestore' 
import { db } from '../firebase-config';
import BathroomRow from '../components/BathroomRow'

function BathroomListings() {
    const [bathroomList, setBathroomList] = useState([])
    const bathroomCollectionRef = collection(db,"bathroom")

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(bathroomCollectionRef)
            setBathroomList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getPosts()
    })
    return <div className='bathroom-listings'>{bathroomList.map((post) => {
        return <div className='bathroom-entry'>{post.name}</div>
    })}</div>
}

export default BathroomListings
