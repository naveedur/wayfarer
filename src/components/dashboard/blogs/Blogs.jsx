import {useEffect,useState} from "react";
import "./blogs.css";
import axios from "axios";
import AdminMenu from "../../adminManu/AdminManu";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getBlogsAction } from "../../../redux/actions/blogAction";
import Search from "../../search/Search";
import AdminInfo from "../adminInfo/AdminInfo";
const Blogs = () => {
  const [blogSearch, setBlogSearch]=useState("")


  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getBlogsAction(blogSearch));
  }, [dispatch,blogSearch]);

  const { user } = useSelector((state) => state.loginUser) || {}

  const [blogList, setBlogList]=useState([])
  const {blogs}=useSelector((state)=>state.getBlogs)
  useEffect(() => {
    if (blogs !== []) {
      setBlogList(blogs.data);
    }
  }, [blogs]);

  const handleBlogSearch=(e)=>{
    setBlogSearch(e)
  }
 const deleteClinkHandler=async(id)=>{
   const data=await axios.delete(`https://travel-blond.vercel.app/api/blog/${id}`)
   toast.success("deleted successfuly")
   setBlogList(prevList => prevList.filter(blog => blog._id !== id));


 }

 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
  return (
    <div className="container-fluid dashboard">
      <div className="row no-gutters">
        <AdminMenu />

        

        <div className="col-md-10 m-0 p-0 ">
          <AdminInfo/>
          <div className="col-md-9 col-11 " style={{margin:"auto"}}>
          <div className="blogTop   mt-3">
        <Search handleSearch={handleBlogSearch}/>

        <div className="addNew">
          <Link to="/dashboard/new-blog"> Add New</Link>
        </div >
        </div>

          {blogList && blogList.map((blog)=> (
                 <div key={blog._id} className="card w-100 p-3 my-5">
            
                 <div className="row">
                   <div className="col-md-4 trip">
                     <img src={blog.headerImage ? `/${blog.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
                   </div>
                   <div className="col-md-6">
                    
                     <h2>{blog.title}</h2>
                     <p dangerouslySetInnerHTML={{__html: blog.content ? blog.content.split(" ").slice(0, 20).join(" "):""}}></p>
                   </div>
                   <div className="col-md-2 editButton">
       
                     <div className="Buttons">
                   <Link onClick={() => deleteClinkHandler(blog._id)}> Delete</Link>
                 </div>
                 <div className="Buttons">
                 <Link to={`/dashboard/update-blog/${blog._id}`}>Update</Link>
                 </div>
                   </div>
       
                   </div>
                    </div>
              ))}
          </div>
       
          
        
        </div>
      </div>
    </div>
  );
};

export default Blogs;
