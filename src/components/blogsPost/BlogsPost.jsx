import React from 'react'
import { Link } from 'react-router-dom'
import './blogsPost.css'

const BlogsPost = ({blog}) => {
  return (
    <div className="card w-70 p-3 my-4">
                 <Link  to={`/post/${blog._id}`}>

                 <div className="row">
                   <div className="col-md-4 blog ">
                     <img src={blog.headerImage ? `https://travel-blond.vercel.app/${blog.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
                   </div>
                   <div className="col-md-8">
                     
                     <h2>{blog.title}</h2>
                     <p className='postDetail' dangerouslySetInnerHTML={{__html: blog.content ? blog.content.split(" ").slice(0, 35).join(" ") : ""}}></p>
                   </div>
                   
       
                   </div>
                   </Link>
                    </div>
  )
}

export default BlogsPost