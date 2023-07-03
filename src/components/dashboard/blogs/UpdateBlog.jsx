import { useEffect, useState } from 'react';
import './blogs.css';
import axios from 'axios';
import AdminMenu from '../../adminManu/AdminManu';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";
import AdminInfo from '../adminInfo/AdminInfo';


const UpdateBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlog = async (blogId) => {
      try {
        const { data } = await axios.get(`https://travel-blond.vercel.app/api/blog/${blogId}`);
        setBlog(data.data);
      } catch (error) {
        toast.error('An error occurred while fetching the blog');
      }
    };

    fetchBlog(blogId);
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualData = new FormData();

    actualData.append('title', blog.title);
    actualData.append('content', blog.content);

    if (blog.headerImage instanceof File) {
      actualData.append('headerImage', blog.headerImage);
    }

    try {
      const result = await axios.put(`https://travel-blond.vercel.app/api/blog/${blogId}`, actualData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <div className="container-fluid dashboard">
      <div className="row">
        <AdminMenu />

        <div className="col-md-10 m-0 p-0">
          <AdminInfo/>
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
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
