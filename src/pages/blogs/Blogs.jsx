import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./blogs.css";
import Layout from "../../components/Layout/Layout";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsAction } from "../../redux/actions/blogAction";
import BlogsPost from "../../components/blogsPost/BlogsPost";
import Search from "../../components/search/Search";

const Blogs = () => {
  const dispatch = useDispatch();

  
  const [blogSearch, setBlogSearch] = useState("");

  const blogList = useSelector((state) => state.getBlogs.blogs?.data) || [];
  const memoizedBlogList = useMemo(() => blogList, [blogList]);

  const dispatchGetBlogs = useCallback(
    () => dispatch(getBlogsAction(blogSearch)),
    [dispatch, blogSearch]
  );

  const handleTripSearch = useCallback(
    (searchValue) => {
      setBlogSearch(searchValue);
    },
    []
  );

  useEffect(() => {
    dispatchGetBlogs();
  }, [dispatchGetBlogs]);

  return (
    <Layout title={"blogs - Travel"}>
      <div className="blogsMain container-fluid">
        <div className="row blogBox">
          <div className="col-md-7 blogTop mt-5">
          <Search handleSearch={handleTripSearch} />

            <div className="addNew">
              <Link to="/user-profile/create-post"> Add New</Link>
            </div>
          </div>

          {memoizedBlogList.map((blog) => (
            <div key={blog._id} className="col-md-7">
              <BlogsPost blog={blog} />
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
