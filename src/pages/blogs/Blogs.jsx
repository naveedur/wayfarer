import {useEffect,useState} from "react";
import "./blogs.css";
import Layout from '../../components/Layout/Layout'

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getBlogsAction } from "../../redux/actions/blogAction";
import BlogsPost from "../../components/blogsPost/BlogsPost";
import Search from "../../components/search/Search";
const Blogs = () => {
  const [blogSearch, setBlogSearch]=useState("")
  

  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getBlogsAction(blogSearch));
  }, []);

  
  const [blogList, setBlogList]=useState([])
  const {blogs}=useSelector((state)=>state.getBlogs)
  useEffect(() => {
    if (blogs !== []) {
      setBlogList(blogs.data);
    }
  }, []);
  const handleBlogSearch=(e)=>{
    setBlogSearch(e)
  }

//  const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toISOString().split("T")[0];
// };
  return (
    <Layout title={"blogs - Travel"}>

    <div className=" blogsMain container-fluid ">
      <div className="row blogBox">
        <div className=" col-md-7 blogTop mt-5">
          <Search handleSearch={handleBlogSearch}/>
      {/* <div className="blogSearchField">
          <input type="text"
          value={blogSearch}
          onChange={handleBlogSearch} />
          <span className="px-4"><FaSearch size={'20'}/></span>
        </div> */}
        <div className="addNew">
            <Link to="/add-post"> Add New</Link>
          </div>
        </div>
         

          {blogList && blogList.map((blog)=> (
              <div key={blog._id} className="col-md-7">
                 <BlogsPost blog={blog}/>
                   
                    </div>
              ))}
          
        
        </div>
        <div className="leftLine"></div>
        <div className="RightLine"></div>
      </div>

     

    </Layout>
  );
};

export default Blogs;
