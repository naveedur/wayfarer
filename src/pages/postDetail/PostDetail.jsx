import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import './postDetail.css'
import Layout from '../../components/Layout/Layout'
import Rating from '../../components/rating/Rating.jsx'
import Comment from '../../components/comments/Comment'
import toast from "react-hot-toast";
import { domain } from "../../domain";


const PostDetail = () => {

  const { postId } = useParams();
const [postData, setPostData] = useState({});
const [postRatings,setPostRatings] = useState([])
const [rating,setRating]=useState(0)
const [selectedRating, setSelectedRating] = useState(null);
const handleRatingChange = async (event) => {
  setSelectedRating(parseFloat(event.target.value));
};
useEffect(() => {
  const fetchPost = async (postId) => {

    const {data} = await axios.get(`${domain}/api/blog/${postId}`);
    setPostData(data.data)
    setPostRatings(data.data.ratings)
  };

  fetchPost(postId); 
}, [postId]); 

useEffect(() => {
  if(selectedRating>0){
  const data = {
    rating: selectedRating,
  };
  const update = async () => {
    const updated = await axios.put(
      `${domain}/api/blog/rating/${postId}`,data);
    toast.success("Rating added");
  };

  update()
  updateRating(selectedRating)
}
}, [selectedRating]);

useEffect(() => {
  if (
    postData.ratings &&
    Array.isArray(postData.ratings) &&
    postRatings.length > 1
  ) {
    const sum = postRatings.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const averageRating = sum / postRatings.length; // Change this line
    setRating(averageRating);
  }
}, [postData, postRatings]);
const updateRating=()=>{
  setPostRatings([...postRatings, selectedRating])
}

 
  return (
    <Layout title={"blog - Travel"}>

    <div className='container'>
        <div className="row">

        
        <div className="col-12">
          <Rating value={rating} total={postRatings.length} />
            </div>
            <div className="image col-12">
            <img src={postData.headerImage ? `${domain}/${postData.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
            </div>

            
            <div className="col-md-12 col-12 mt-4">
                <h1 className="title">{postData.title}</h1>

            </div>
            <div className="col-12 mt-4">
                <p className='postDescription'  dangerouslySetInnerHTML={{__html: postData.content}}>
                </p>
            </div>
          
            

            <div className="row">
      <div className=" col-12 col-md-6">

        {postRatings.length>0 ?
        <Rating value={rating} total={postRatings.length} />
      
      :
       <h3 className="mt-3">not rated yet</h3>
        }
        </div>

        <div className=" ratingBox col-12 col-md-6">
          <label className="mx-2" htmlFor="rating">
            <h4>Select Rating: </h4>
          </label>
          <select
            className="ratingField"
            id="rating"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value={0}>0</option>
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={1.5}>1.5</option>
            <option value={2}>2</option>
            <option value={2.5}>2.5</option>
            <option value={3}>3</option>
            <option value={3.5}>3.5</option>
            <option value={4}>4</option>
            <option value={4.5}>4.5</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>

            <div className="co-12">
              <Comment postId={postData._id} />
            </div>
        </div>

      
            
        </div>

     </Layout>
  )
}

export default PostDetail