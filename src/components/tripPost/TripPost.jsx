import React from 'react'
import './tripPost.css'

const TripPost = ({trip}) => {
  
  return (
    <div className='post'>

<div className="postTop">
        <img className='postImage' src={trip.headerImage ? `http://localhost:5000/${trip.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="image not found" />
        
        <h3 className='postTitle'>{trip.destination}</h3>
        </div>
        
        <p className='postDetail'  dangerouslySetInnerHTML={{__html: trip.notes.split(" ").slice(0, 20).join(" ")}}>
        </p>

        <button className='postButton'>Learn More</button>
      
      
    
    </div>
    
  )
}

export default TripPost