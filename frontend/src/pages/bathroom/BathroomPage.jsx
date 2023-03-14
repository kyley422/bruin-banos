import { getDoc, getDocs, collection } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './BathroomPage.scss'

function getGenderIconURL(gender) {
  switch(gender) {
      case "male":
          return "https://i.imgur.com/7Kdc4u6.png"
      case "female":
          return "https://i.imgur.com/UziMe7k.png"
      // gender neutral
      default:
          return "https://i.imgur.com/1WKjMoz.png"
  }
}

function ReviewListings(reviewData) {
  return <div className='reviewListing'>
  {console.log(reviewData.reviewData)}
  {reviewData.reviewData.map((item, index) => {
    return <div key={index}>
      {item.author.name}:
      {item.overall},
      {item.cleanliness},
      {item.comfort},
      {item.convenience},
      {item.amenities},
      {item.reviewText}
    </div>
  })}
  </div>
}

function BathroomPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [bathroomData, setBathroomData] = useState(null);
    const [reviewData, setReviewData] = useState([])
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
    },[db])

    useEffect(() => {
      const getReviews = async () => {
        if(!isLoading) {
          const newData = [];

          bathroomData.reviews.forEach(async id => {
            const reviewRef = doc(db, "reviews", id);
            const reviewSnap = await getDoc(reviewRef);

            if (reviewSnap.exists()) {
              newData.push(reviewSnap.data());
              setReviewData(newData);
              // console.log("PUSHING")
              // console.log(reviewSnap.data())
            }
          });

          setReviewData(newData);
          // console.log("GOT REVIEWS");
          // console.log(reviewData)
          setIsLoading2(false)
        }
      };
      getReviews();
      let tempReviewData = reviewData.slice()
      setReviewData(tempReviewData)
    },[bathroomData, isLoading])

  return (
    <div>
      {!isLoading && !isLoading2 && (
        <>
            <div className='buildingimage'>
              <div><img className="banner" src={bathroomData.image}/></div>
              <h3 className='name'>{bathroomData.name}</h3> 
              <h3 className='number'>{bathroomData.number}</h3>
              <div><img className='gender' src={getGenderIconURL(bathroomData.gender)} /></div>

              <p className='overall'>Overall                 {bathroomData.score_overall}</p>
              <div className='whitebox'></div>

              <p className='cleanliness'>Cleanliness                  <strong>{bathroomData.score_cleanliness}</strong></p>
              <p className='comfort'>Comfort                        <strong>{bathroomData.score_comfort}</strong></p>
              <p className='convenience'>Convience                    <strong>{bathroomData.score_convenience}</strong></p>
              <p className='ameneties'>Ameneties                    <strong>{bathroomData.score_amenities}</strong></p>
            </div>
            <div className='overall'>
              Total Ratings: {bathroomData.total_ratings}
            </div>
            <div className='review-listing-container'>
              <ReviewListings reviewData={reviewData} />
            </div>
        </>
      )}
    </div>
  );

  // Have React display some information using Bathroom ID
  
  // Have React show invalid error if cant find Bathroom ID
}

export default BathroomPage