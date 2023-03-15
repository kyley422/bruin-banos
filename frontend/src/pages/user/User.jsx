
import React, { Component } from 'react'

// import BathroomRow from '../../components/BathroomRow'
import BathroomListings from '../../components/BathroomListings'
import './User.scss'
import UserFavoriteListings from './UserFavoriteListings';
import UserReviewsListings from './UserReviewsListings';

// import { signInWithGoogle } from '../login/Login'
// const Hero = () => {
//   return (
//     <div className='hero'>
//       <div className='image-container'>
//         <img src='https://i.imgur.com/vR0CIB2.png' alt='Bruin Baños Logo' />
//       </div>
//       <div className='text-container'>
//         <h1 className='hero-text'>Bruin Baños</h1>
//         <p className='hero-content'>Welcome to the ultimate resource for finding the best public bathrooms at UCLA! With detailed information on facilities, amenities, and user ratings, you can make informed decisions about where to go. So why wait? Start exploring and find the perfect bathroom for your needs today!</p>
//       </div>
//     </div>
//   )
// }

// const user = () => {
//     return <div>account</div>
// }

const Welcome = () => {

    var firstName = (localStorage.getItem("name").split(" "))[0];
    // console.log(firstName);
    return (
        <div className='welcome'> 
            <div className='welcome-text'>
                <h1>Welcome Back, {firstName}</h1>
            </div>
        </div>
    )
}

const FavoriteListings = () => {
    return (
        <div className='favorites'>
            <div className='favorites-text'>
                <h3>Favorites</h3>
            </div>
            
            {/* <div className='listing-container'>
                <div className='favorites-list'>
                     <BathroomListings className='bathroom-listing'/>             
                </div>
                <div className='filter-container'>
                    Filters
                </div> */}
        </div>

    )
}

const ReviewListings = () => {
    return (
        <div className='reviews'>
            <div className='reviews-text'>
                <h3>Reviews</h3>
            </div>
            <div className='review-box'></div>
            <UserReviewsListings />
        </div>
    )
}
// const ListingContainer = () => {
//     return (
//       <div className='listing-container'>
//         <div className='filter-container'>
//           Filters
//         </div>
//       <BathroomListings />
//       </div>
//     )
//   }

export default class UserPage extends Component {
  render() {
    return (
      <div className='user-page'>
        <Welcome />
        {/* <ListingContainer /> */}
        <FavoriteListings />
        <ReviewListings />
        {/* <UserFavoriteListings></UserFavoriteListings> */}

      </div>
    )
  }
}
