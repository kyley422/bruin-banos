import React, { Component } from 'react'
import './BathroomRow.scss'
// import Poops from './Poops.jsx'


export default class BathroomRow extends Component {
  render() {
    return (
      <div className='bathroom-row'>
        <div className='image-container'>
            <img src='https://i.imgur.com/Idl80gB.jpg' alt='Marion Anderson Hall' />
        </div>
        <div className='title-container'>
            <div className='title'>
                Anderson 1224
            </div>
            <div className='gender'>
                <img src='https://i.imgur.com/xmE2DNn.png' alt='Male' />
            </div>
        </div>
        <div className='overall-review-container'>
            <div className='poops'>
                {/* {[...Array(5)].map((poops, i) => {
                    // const ratingValue = i + 1;
                    return (
                        
                        <img src='https://i.imgur.com/zeUE5V4.png' alt='Golden Poop' />
                    )
                })}  */}
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
                    }[Math.round(3.7 * 2) / 2]
                }
            </div>
            <div className='overall-ratings'>
                OVERALL (431 reviews)
            </div>
        </div>
        <div className='heart'>
            <img src='https://i.imgur.com/tqq4Q6I.png' alt='Heart' />
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
