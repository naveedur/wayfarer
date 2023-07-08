import {useEffect} from 'react'
import './post.css'
import { domain } from "../../domain.js";

const Post = ({post}) => {
  
  return (
    <div className='post'>

<div className="postTop">
        <img className='postImage' src={post.headerImage ? `${domain}/${post.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="image not found" />
        
        <h3 className='blogPostTitle'>{post.title}</h3>
        </div>
        
        <p className='postDetail' dangerouslySetInnerHTML={{__html: post.content.split(" ").slice(0, 20).join(" ")}}> 
        </p>

        <button className='postButton'>Learn More</button>
      
      
    
    </div>
    
  )
}

export default Post