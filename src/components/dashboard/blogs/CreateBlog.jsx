import { useEffect } from "react";
import "./blogs.css";
import AdminMenu from "../../adminManu/AdminManu";
import { useDispatch, useSelector } from 'react-redux'
import { createBlogAction, getBlogsAction } from "../../../redux/actions/blogAction";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import AdminInfo from "../adminInfo/AdminInfo";



const CreateBlog = () => {

  const { user } = useSelector((state) => state.loginUser) || {}

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualData = new FormData(e.currentTarget);
    actualData.append("user_id", user.data._id);

    console.log(actualData.title)

    try {
      await dispatch(createBlogAction(actualData));
      toast.success("Blog added successfully");
      await dispatch(getBlogsAction(""))
    } catch (error) {
      toast.error("Error occurred while adding the blog");
    }
  };

  const blog = useSelector((state) => state.newBlog);
  console.log(blog.blogs);

  useEffect(() => {
    // Additional code logic if needed
  }, [blog]);
  const editorConfig = {
    cleanHTML: true,
    placeholder: "Provide description according to below points: <br/>1. Places we will visit <br/> 2. Approximate number of days for the trip",
};

  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <AdminMenu />

        <div className="col-md-10 p-0 m-0">
          <AdminInfo/>
          <div className="col-md-8 col-11 " style={{margin:"auto",marginTop:"15px"}}>
          <div className="tripForm">
            <h3>Add New Blog</h3>

            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Header Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="headerImage"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <JoditEditor name="content" config={editorConfig} />
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

export default CreateBlog;
