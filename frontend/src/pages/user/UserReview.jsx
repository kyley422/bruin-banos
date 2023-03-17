import React, { Component } from 'react'
import './UserReview.scss'

export default class Review extends Component {
  render() {
    return (
      <div className='user-review'>
          <div className='review-bathroom-name'>
              {this.props.bathroom}
          </div>
          <div className='user-scores'>
            OVERALL <strong>{this.props.overall}</strong> | CLEANLINESS <strong>{this.props.cleanliness}</strong> | COMFORT <strong>{this.props.comfort}</strong> | CONVENIENCE <strong>{this.props.convenience}</strong> | AMENITIES <strong>{this.props.amenities}</strong>
          </div>
          <div className='user-review-text'>
            { 
            console.log("ReviewText:")}
           { console.log(this.props.reviewText) }
            {this.props.reviewText}
          </div>
      </div>

    )
  }
}