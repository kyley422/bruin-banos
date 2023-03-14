import React, { Component } from 'react'
import './BathroomPage.scss'

export default class BathroomPageRow extends Component {
  render() {
    return (
      <div className='bathroompage-row'>
        <div className='bathroom-page-row-profile'>
          <div className='image-container'>
            <img src='https://i.imgur.com/YcXGNzZ.png' />
          </div>
          <div className='review_name'>
            <p className='Name'>{this.props.name} </p>
            <p className='Rated'> Rated This Restroom </p>
          </div>
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
              }[Math.round(this.props.overall * 2) / 2]
            }
          </div>
          
        </div>

        <div className='bathroom-page-row-review'>
            <div className='text'>
              <div className='scores'>
                OVERALL <strong>{this.props.overall}</strong> | CLEANLINESS <strong>{this.props.cleanliness}</strong> | COMFORT <strong>{this.props.comfort}</strong> | CONVENIENCE <strong>{this.props.convenience}</strong> | AMENITIES <strong>{this.props.amenities}</strong>
              </div>
              <div className='reviewText'>
                {this.props.reviewText}
              </div>
            </div>
        </div>
      </div>

    )
  }
}