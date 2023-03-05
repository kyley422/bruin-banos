import React, { Component } from 'react'
import './BathroomRow.scss'
// import Poops from './Poops.jsx'


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
            <img src='https://i.imgur.com/tqq4Q6I.png' alt='Heart' />
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
