import { useEffect, useState } from "react";
import "./blogs.css";
import axios from "axios";
import toast from "react-hot-toast";
import { domain } from "../../../domain.js";
import UserLayout from "../../../pages/userProfile/userLayout/UserLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsAction } from "../../../redux/actions/blogAction";
import Search from "../../search/Search";
const UserBlogs = () => {
  const [blogSearch, setBlogSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogsAction(blogSearch));
  }, [dispatch, blogSearch]);

  const { user } = useSelector((state) => state.loginUser) || {};

  const [blogList, setBlogList] = useState([]);
  const { blogs } = useSelector((state) => state.getBlogs);
  useEffect(() => {
    if (blogs !== []) {
      const filteredBlogs = blogs?.data?.filter(
        (blog) => blog.user_id == user.data._id
      );
      setBlogList(filteredBlogs);
    }
  }, [blogs]);

  const handleBlogSearch = (e) => {
    setBlogSearch(e);
  };
  const deleteClinkHandler = async (id) => {
    const data = await axios.delete(`${domain}/api/blog/${id}`);
    toast.success("deleted successfuly");
    setBlogList((prevList) => prevList.filter((blog) => blog._id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  return (
    <UserLayout>
      {blogList?.length === 0 ?
      <div className="d-flex justify-content-center mt-5">
        <h1>You do not have posted any Blog</h1> 
     </div>
      :
      <div className="col-md-8 col-11 " style={{ margin: "auto" }}>
        <div className="blogTop   mt-3">
          <Search handleSearch={handleBlogSearch} />

          <div className="addNew">
            <Link to="/user-profile/create-post"> Add New</Link>
          </div>
        </div>

        {blogList &&
          blogList.map((blog) => (
            <div key={blog._id} className="card w-100 p-3 my-5">
              <div className="row">
                <div className="col-md-4 trip">
                  <img
                    src={
                      blog.headerImage
                        ? `${domain}/${blog.headerImage.replace("\\", "/")}`
                        : "http://localhost:3000/assets/slider/slider1.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <h2>{blog.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog.content
                        ? blog.content.split(" ").slice(0, 20).join(" ")
                        : "",
                    }}
                  ></p>
                </div>
                <div className="col-md-2 editButton">
                  <div className="Buttons">
                    <Link onClick={() => deleteClinkHandler(blog._id)}>
                      {" "}
                      Delete
                    </Link>
                  </div>
                  <div className="Buttons">
                    <Link to={`/user-profile/update-post/${blog._id}`}>
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
     
    } 
    </UserLayout>
  );
};

export default UserBlogs;
