import React from 'react'
import './tripPost.css'
import { domain } from "../../domain.js";

const TripPost = ({trip}) => {
  
  return (
    <div className='post'>

<div className="postTop">
        <img className='postImage' src={trip.headerImage ? `${domain}/${trip.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="image not found" />
        
        <h3 className='postTitle'>{trip.destination}</h3>
        </div>
        
        <p className='postDetail'  dangerouslySetInnerHTML={{__html: trip.notes.split(" ").slice(0, 20).join(" ")}}>
        </p>

        <button className='postButton'>Learn More</button>
      
      
    
    </div>
    
  )
}

export default TripPost