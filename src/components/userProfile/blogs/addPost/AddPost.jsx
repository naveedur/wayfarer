import React, { useState,useEffect } from 'react';
import './addPost.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getTripsAction } from '../../../../redux/actions/tripAction';
import { createBlogAction, getBlogsAction } from '../../../../redux/actions/blogAction';

import UserLayout from '../../../../pages/userProfile/userLayout/UserLayout';

import toast from "react-hot-toast";


import JoditEditor from 'jodit-react';

const AddPost = () => {
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
          navigate('/user-profile/blogs')
        } catch (error) {
          toast.error("Error occurred while adding the blog");
        }
    }
  
    return (
      <UserLayout >

<div className="col-md-8 col-11  mt-5" style={{ margin: "auto" }}>
<h3 className="tripHeading">Add New Post</h3>
        <form method="post" onSubmit={handleSubmit} className='postForm' encType="multipart/form-data">
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
      </div>
      </UserLayout>
    );
  };

export default AddPost