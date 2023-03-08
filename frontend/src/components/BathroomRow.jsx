import React, { Component } from 'react'
import './BathroomRow.scss'
import { addDoc, getDocs, collection, getFirestore } from 'firebase/firestore'
import { db, auth } from '../firebase-config';
import { Link } from 'react-router-dom'

// import { useNavigate } from 'react-router-dom';

// function favorite( {isAuth}) {
// const favCollectionRef = collection(db, "LikedReviews");
// let navigate = useNavigate();

// saveToFirebase = FireBase.firestore(),
// saveToFirebase.collection("todos").add({
//   id: uuid(),
//   item: input
// });
console.log(auth)
// var user_path = "users/" + auth.currentUser.uid + "/likedReviews";
// console.log(user_path)
const userRef = collection(db, "users")
console.log(userRef)



// getDocs(colRef)
//     .then((snapshot) => {
//         console.log(snapshot.docs)
//     })
// console.log()

// await addDoc(usersCollectionRef, {
//     id: auth.currentUser.uid,
//     name: auth.currentUser.displayName,
//     reviews: reviews,
//     likedReviews: likedReviews,
//   });


const unfilledHeart = "https://i.imgur.com/tqq4Q6I.png"
const filledHeart = "https://i.imgur.com/qmmXb0N.png"


export default class BathroomRow extends Component {
  render() {
    var favorited = false;
    var something = this.props.review_id
    function myfunction() {
        if (!localStorage.getItem("isAuth")) { 
            <link to ="/login"></link>
        }
        else {
            let displayImage = document.getElementById(button_id)
            if(!favorited) { 
                favorited = true
                displayImage.src = filledHeart
                
                // add firebase stuff here for adding to database:
                // console.log(something)
                // addDoc(userRef, {likedReviews: something});
                console.log("made it past the firestore")
            }
            else {
                favorited = false
                displayImage.src = unfilledHeart
                // add firebase stuff here for removing from database:
            }
            console.log("CLICKED");
        }
    }

    const button_id = "button-" + this.props.review_id

    const handleMouseOver = (event) => {
        if (favorited == false) {
            event.target.src=filledHeart
        }        

    }
    const handleMouseOut = (event) => {
        if (favorited == false) {
            event.target.src=unfilledHeart
        }
    }


    return (
      <div className='bathroom-row'>
        <div className='image-container'>
            <img src={this.props.image} alt='Building' />
        </div>
        <div className='title-container'>
            <div className='title'>
                {this.props.name}
            </div>
            <div className='gender'>
                <img src={this.props.genderImageURL} alt='Gender' />
            </div>
        </div>
        <div className='overall-review-container'>
            <div className='poops'>
                {
                    {
                        0: <img src='https://i.imgur.com/vljxALF.png' alt='Poop Review 0' />,
                        0.5: <img src='https://i.imgur.com/gT1BW3c.png' alt='Poop Review 0.5' />,
                        1: <img src='https://i.imgur.com/3uoFK5M.png' alt='Poop Review 1' />,
                        1.5: <img src='https://i.imgur.com/HjLehVI.png' alt='Poop Review 1.5' />,
                        2: <img src='https://i.imgur.com/oSmZjJi.png' alt='Poop Review 2' />,
                        2.5: <img src='https://i.imgur.com/TpvY5ax.png' alt='Poop Review 2.5' />,
                        3: <img src='https://i.imgur.com/XkkAJpw.png' alt='Poop Review 3' />,
                        3.5: <img src='https://i.imgur.com/JuTxea7.png' alt='Poop Review 3.5' />,
                        4: <img src='https://i.imgur.com/sBwRpE4.png' alt='Poop Review 4' />,
                        4.5: <img src='https://i.imgur.com/rzTx5vY.png' alt='Poop Review 4.5' />,
                        5: <img src='https://i.imgur.com/asIJDlm.png' alt='Poop Review 5' />
                    }[Math.round(this.props.score_overall * 2) / 2]
                }
            </div>
            <div className='overall-ratings'>
                {this.props.total_ratings}
            </div>
        </div>
        <div className='heart'>
            {!localStorage.getItem("isAuth") ? 
                <Link to="/login"> 
                <img src='https://i.imgur.com/tqq4Q6I.png' onMouseOver= {handleMouseOver}onMouseOut= {handleMouseOut} alt='Unfilled Heart' class="profile"/>
                </Link>
                :
                <img id={button_id} src={unfilledHeart} onMouseOver= {handleMouseOver}onMouseOut= {handleMouseOut} onClick={() => {myfunction()}} />
            }

        </div>
        <div className='ratings'>
            CLEANLINESS  <b>{this.props.score_cleanliness}</b> | COMFORT <b>{this.props.score_comfort}</b> | CONVENIENCE <b>{this.props.score_convenience}</b> | AMENITIES <b>{this.props.score_amenities}</b>
        </div>
        <div className='top-review'>
            <div className='top-review-bubble'>
                <img src='https://i.imgur.com/dbIsoVp.png' alt='Top Review' />
            </div>
            <p className='top-review-splash'>TOP REVIEW</p>
        </div>
        <div className='top-review-container'>
            {this.props.top_review}
        </div>
      </div>
    )
  }
}
