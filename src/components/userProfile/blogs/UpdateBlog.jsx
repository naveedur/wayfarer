import { useEffect, useState } from 'react';
import './blogs.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";
import { domain } from "../../../domain.js";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from '../../../pages/userProfile/userLayout/UserLayout';


const UpdateBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [tripList, setTripList] = useState([]);

  const { trip } = useSelector((state) => state.getTrips) || {};
  useEffect(() => {
    if (trip && trip.data) {
      
      setTripList(trip.data);
    }
  }, [trip]);
  useEffect(() => {
    const fetchBlog = async (blogId) => {
      try {
        const { data } = await axios.get(`${domain}/api/blog/${blogId}`);
        setBlog(data.data);
      } catch (error) {
        toast.error('An error occurred while fetching the blog');
      }
    };

    fetchBlog(blogId);
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualData = new FormData(e.currentTarget);

    actualData.append('title', blog.title);
    actualData.append('content', blog.content);

    if (blog.headerImage instanceof File) {
      actualData.append('headerImage', blog.headerImage);
    }

    try {
      const result = await axios.put(`${domain}/api/blog/${blogId}`, actualData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
        .catch((error)=>console.log(error.message))
        
      });

      if (result.status === 200) {
        toast.success('Updated successfully');
      } else {
        toast.error('Blog not updated');
      }
    } catch (error) {
      toast.error('An error occurred while updating the blog');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, headerImage: file });
  };

  return (
   <UserLayout>
          <div className="col-md-8 col-11 " style={{margin:"auto", marginTop:"15px"}}>
          <div className="tripForm">
            <h3>Update Blog</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={blog.title || ''}
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
              <label>Writer Name</label>
              <input
                type="text"
                className="form-control"
                name="writer"
                value={blog.writer || ''}
                  onChange={(e) => setBlog({ ...blog, writer: e.target.value })}
             
                required
              />
            </div>
            <div className="form-group">
              <label>Trip</label>
              <select type="text" className="form-select" defaultValue={blog.trip} name="trip" id="trip" placeholder='where you visited'>
                {tripList && tripList.map((tri, index) => (
                    <option key={index}>{tri.destination}</option>
                ))}
              </select>
            </div>
              <div className="form-group">
                <label>Header Image</label>
                <input type="file" className="form-control" name="headerImage" onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <JoditEditor
                name="notes"
                value={blog.content}
                onChange={(e) => setBlog({ ...blog, content: e })}
              />
              </div>
              <button type="submit" className="formButton">
                Submit
              </button>
            </form>
          </div>
          </div>
          </UserLayout>
  );
};

export default UpdateBlog;
