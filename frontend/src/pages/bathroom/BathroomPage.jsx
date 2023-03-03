import { async } from '@firebase/util';
import { getDoc } from 'firebase/firestore';
import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';

function BathroomPage() {
    const params = useParams()
    const bathroomId = params.bathroomId
    const docRef = doc(db, "bathroom", "dodd1737")

    useEffect(() => {
        const getData = async () => {
            const data = await getDoc(docRef)
            console.log(data)

            if (data.exists()) {
                console.log("Document data:", data.data());  
            } 
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        
        getData();
    })

  return (
    <div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom{bathroomId}</div>
      <div>Bathroom {bathroomId}</div>
    </div>

  );

  // Have React display some information using Bathroom ID
  // Have React show invalid error if cant find Bathroom ID
}

export default BathroomPage