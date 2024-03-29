import { getDoc, getDocs, collection } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './BathroomPage.scss'
import BathroomPageRow from '../bathroom/BathroomPageRow'
import Button from '../../components/Button';

 function truncateDecimals(number, digits) {
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
}

function word_split(word) {

  for (let i = 0; i < word.length-1; i++) {
    if (word[i] === " " && !isNaN(word[i+1])) {

      return [].concat(word.slice(0, i), word.slice(i))
    }
  }
}

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
  {/* {console.log(reviewData.reviewData)} */}
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

function BathroomPage(isAuth) {
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
            // console.log(data)
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
              <h3 className='name'>{word_split(bathroomData.name)[0]}</h3> 
              <h3 className='number'>{word_split(bathroomData.name)[1]}</h3>

              <div className='gender-box'>
                <img className='gender' src={getGenderIconURL(bathroomData.gender)} />
              </div>
              <div className='add-review-button'>
                <Link to={isAuth ? "/review?bathroom=" + bathroomId : "/login"}> <Button /> </Link>
              </div>

              <div className='add-review-button'>
                <Link to={isAuth ? "/review?bathroom=" + bathroomId : "/login"}> <Button /> </Link>
              </div>

              <p className='overall'>Overall                {truncateDecimals(bathroomData.score_overall,1)}</p>
              <div className='whitebox'></div>

              <p className='cleanliness'>Cleanliness                  <strong>{truncateDecimals(bathroomData.score_cleanliness,1)}</strong></p>
              <p className='comfort'>Comfort                        <strong>{truncateDecimals(bathroomData.score_comfort,1)}</strong></p>
              <p className='convenience'>Convenience                <strong>{truncateDecimals(bathroomData.score_convenience,1)}</strong></p>
              <p className='ameneties'>Ameneties                    <strong>{truncateDecimals(bathroomData.score_amenities,1)}</strong></p>
            </div>

            {/* <div className='gradient'></div> */}
            <div className='review-listing-container'>
              {reviewData.map((item, index) => {
                let current_bathroompage_row = <BathroomPageRow className='bathroompage-entry' key={index} 
                  name={item.author.name}
                  overall={item.overall}
                  cleanliness={item.cleanliness}
                  comfort={item.comfort}
                  convenience={item.convenience}
                  amenities={item.amenities}
                  reviewText={item.reviewText}
                />
                return current_bathroompage_row
              })}
            </div>
        </>
      )}
    </div>
  );

  // Have React display some information using Bathroom ID
  
  // Have React show invalid error if cant find Bathroom ID
}

export default BathroomPage