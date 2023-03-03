import { getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BathroomPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [bathroomData, setBathroomData] = useState(null);
    const params = useParams()
    const bathroomId = params.bathroomId
    const docRef = doc(db, "bathroom", bathroomId)

    let navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getDoc(docRef)
            console.log(data)
            if (!data.exists()) {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                navigate("/invalid")
            }
            setIsLoading(false);
            setBathroomData(data.data())
        };
        
        getData();
    })

  return (
    // idk how to center things in the screen so to see the 
    // text i added the 5 filler lines below
    <div>
      <div>Bathroom {bathroomId}</div>
      <div>Bathroom {bathroomId}</div>
      <div>Bathroom {bathroomId}</div>
      <div>Bathroom {bathroomId}</div>
      <div>Bathroom {bathroomId}</div>

      {!isLoading && (
        <>
            <div>Name: {bathroomData.name}</div>
            <div>Gender: {bathroomData.gender}</div>
            <div>Total Ratings: {bathroomData.total_ratings}</div>
            <div>Ameneties Score: {bathroomData.score_amenities}</div>
            <div>Cleanliness Score: {bathroomData.score_cleanliness}</div>
            <div>Comfort: {bathroomData.score_comfort}</div>
            <div>Convience: {bathroomData.score_convenience}</div>
            <div>Overall Score: {bathroomData.score_overall}</div>
        </>
      )}

    </div>

  );

  // Have React display some information using Bathroom ID
  // Have React show invalid error if cant find Bathroom ID
}

export default BathroomPage