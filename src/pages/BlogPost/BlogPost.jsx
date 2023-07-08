import React, { useState,useEffect } from 'react';
import './blogPost.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getTripsAction } from "../../redux/actions/tripAction";
import { createBlogAction } from "../../redux/actions/blogAction";
import { getBlogsAction } from "../../redux/actions/blogAction";
import Layout from '../../components/Layout/Layout'


import toast from "react-hot-toast";


import JoditEditor from 'jodit-react';

const BlogPost = () => {
  const navigate=useNavigate()
    const { user } = useSelector((state) => state.loginUser) || {}  
    const [tripList, setTripList] = useState([]);

    const { trip } = useSelector((state) => state.getTrips) || {};
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getTripsAction(""));
    }, [dispatch]);  
    useEffect(() => {
      if (trip && trip.data) {
        
        setTripList(trip.data);
      }
    }, [trip]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const actualData = new FormData(e.currentTarget);
        actualData.append("user_id", user.data._id);
    
    
        try {
          await dispatch(createBlogAction(actualData));
          toast.success("Blog added successfully");
          await dispatch(getBlogsAction(""))
          navigate('/')
        } catch (error) {
          toast.error("Error occurred while adding the blog");
        }
    }
  
    return (
      <Layout title={"add blog post - Travel"}>

      <div className="postwrapper row">
<div className="col-md-6 col-11 ">
<h3 className="tripHeading">Add New Post</h3>
        <form method="post" onSubmit={handleSubmit} className='postForm'>
        <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder='where you visited' 
             
                required
              />
            </div>

            <div className="form-group">
              <label>Writer Name</label>
              <input
                type="text"
                className="form-control"
                name="writer"
                value={user.data.name}
             
                required
              />
            </div>

            <div className="form-group">
              <label>Trip</label>
              <select type="text" className="form-select" name="trip" id="trip" placeholder='where you visited'>
                {tripList && tripList.map((tri, index) => (
                    <option key={index}>{tri.destination}</option>
                ))}
              </select>
            </div>
          
            <div className="form-group">
              <label>HeaderImage</label>
              <input
                type="file"
                className="form-control"
                name="headerImage"
             
                required
              />
            </div>
          
          <div className="form-group">
            <label htmlFor="content">Description</label>
          <JoditEditor name="content" id="content" cols="30" rows="10"
           placeholder='Describe your experience about place where you have visited'>
            </JoditEditor>     
          </div>
          
          
          <div className="form-group"><button className='postSubmit' type='submit' >POST</button></div>
        </form>
      </div></div>
      </Layout>
    );
  };

export default BlogPost