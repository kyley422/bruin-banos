import React, { Component } from 'react'
import './BathroomRow.scss'

export default class BathroomRow extends Component {
  render() {
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
                [Poops Placeholder]
            </div>
            <div className='overall-ratings'>
                OVERALL (431 reviews)
            </div>
        </div>
        <div className='heart'>
            <img src='https://i.imgur.com/qmmXb0N.png' alt='Male' />
        </div>
        <div className='ratings'>
            CLEANLINESS  5 | COMFORT 5 | CONVENIENCE 4.5 | AMENITIES 5
        </div>
        <div className='top-review'>
            <div className='top-review-bubble'>
                <img src='https://i.imgur.com/dbIsoVp.png' alt='Top Review' />
            </div>
            <p className='top-review-splash'>TOP REVIEW</p>
        </div>
        <div className='top-review-container'>
            <p className='top-review-content'>
            “This bathroom was clean and well-maintained, with plenty of soap and paper towels available. The stalls were spacious and private, and the...” <b>Read More &gt;</b>
            </p>
        </div>
      </div>
    )
  }
}
