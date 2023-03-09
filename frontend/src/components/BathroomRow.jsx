import React, { Component } from 'react'
import './BathroomRow.scss'
import { getDocs, updateDoc, collection, arrayRemove, setDoc, doc, arrayUnion, query, where } from 'firebase/firestore'
import { db, auth } from '../firebase-config';
import { Link } from 'react-router-dom'


const userRef = collection(db, "users");


const unfilledHeart = "https://i.imgur.com/tqq4Q6I.png"
const filledHeart = "https://i.imgur.com/qmmXb0N.png"


export default class BathroomRow extends Component {
  render() {

    const addLikedBathroom = async () => {
        const q = query(userRef, where('id', '==', auth.currentUser.uid))
        const snapshot = await getDocs(q)
        const targetUser = doc(db, "users", snapshot.docs[0].id)
        setDoc(targetUser, {likedBathrooms: arrayUnion(this.props.name)}, {merge: true})
    };
    
    const RemoveLikedBathroom = async () => { 
        const q = query(userRef, where('id', '==', auth.currentUser.uid))
        const snapshot = await getDocs(q)
        const targetBathroom = doc(db, "users", snapshot.docs[0].id)
        await updateDoc(targetBathroom, {likedBathrooms: arrayRemove(this.props.name)})
    }

    var favorited = false;
    function whenClicked() {
        if (!localStorage.getItem("isAuth")) { 
            <link to ="/login"></link>
        }
        else {
            let displayImage = document.getElementById(button_id)
            if(!favorited) { 
                favorited = true
                displayImage.src = filledHeart
                addLikedBathroom()
            }
            else {
                favorited = false
                displayImage.src = unfilledHeart
                RemoveLikedBathroom()
            }
        }
    }

    const button_id = "button-" + this.props.name

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
            <a href={"/bathroom/" + this.props.id}><img src={this.props.image} alt='Building' /></a>
        </div>
        <div className='title-container'>
            <div className='title'>
                <a href={"/bathroom/" + this.props.id}>{this.props.name}</a>
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
            <div className='overall-score'>{this.props.score_overall}</div>
            <div className='overall-ratings'>
                ({this.props.total_ratings} reviews)
            </div>
        </div>
        <div className='heart'>
            {!localStorage.getItem("isAuth") ? 
                <Link to="/login"> 
                <img src='https://i.imgur.com/tqq4Q6I.png' onMouseOver= {handleMouseOver}onMouseOut= {handleMouseOut} alt='Unfilled Heart' class="profile"/>
                </Link>
                :
                <img id={button_id} src={unfilledHeart} onMouseOver= {handleMouseOver}onMouseOut= {handleMouseOut} onClick={() => {whenClicked()}} />
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
