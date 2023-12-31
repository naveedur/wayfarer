// import NavBar from "./components/navBar/NavBar";
import Home from "./pages/homePage/Home";
import { Login } from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import Blog from "./pages/blogs/Blogs";
import { useSelector, shallowEqual } from "react-redux";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./components/dashboard/users/Users";
import Trips from "./components/dashboard/trips/Trips";
import CreateTrip from "./components/dashboard/trips/CreateTrip";
import UpdateTrip from "./components/dashboard/trips/UpdateTrip";
import { Toaster } from "react-hot-toast";
import Blogs from "./components/dashboard/blogs/Blogs";
import CreateBlog from "./components/dashboard/blogs/CreateBlog";
import UpdateBlog from "./components/dashboard/blogs/UpdateBlog";
import Trip from "./pages/trip/Trip";
import PostDetail from "./pages/postDetail/PostDetail";
import TripDetail from "./pages/tripDetail/TripDetail";
import TripEnrollment from "./pages/tripEnrollment/TripEnrollment";
import AddTrip from "./components/userProfile/trips/createTrip/CreateTrip";
import { MailForm } from "./pages/resetPassword/MailForm";
import { PasswordRest } from "./pages/resetPassword/PasswordRest";
import TripEnrollments from "./components/dashboard/tripEnrollments/TripEnrollments";
import NonAdmin from "./components/nonAdminUser/NonAdmin";
import UserProfile from "./pages/userProfile/UserProfile";
import UseTrips from "./components/userProfile/trips/UserTrips";
import UserBlogs from "./components/userProfile/blogs/UserBlogs";
import AddPost from "./components/userProfile/blogs/addPost/AddPost";
import UpdateUserBlog from "./components/userProfile/blogs/UpdateBlog";

function App() {
  const { user } = useSelector((state) => state.loginUser, shallowEqual) || {};
  // const user = JSON.parse(localStorage.getItem("travelUser"));

  useEffect(() => {
    console.log("User state:", user); // Debugging log
  }, [user]);
  
  return (
    
    <div className="App" >
      <Router>
        <Toaster />
        <Routes>
          <Route exact path="/" element={ user!=null ?<Home /> : <Navigate to="/login" /> } />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/mail-verification" element={<MailForm />} />
          <Route exact path="/reset-password" element={<PasswordRest />} />
          {user && user.data && user.data.role === 1 ? (
            <Route path="/dashboard/">
              <Route exact path="" element={<Dashboard />} />
              <Route exact path="users" element={<Users />} />
              <Route exact path="trips" element={<Trips />} />
              <Route exact path="new-trip" element={<CreateTrip />} />
              <Route exact path="update-trip/:tripId" element={<UpdateTrip />}/>
              <Route exact path="trip-enrollments" element={<TripEnrollments />}/>        
              <Route exact path="blogs" element={<Blogs />} />
              <Route exact path="new-blog" element={<CreateBlog />} />
              <Route exact path="update-blog/:blogId" element={<UpdateBlog />}/>
            </Route>
          ) : (
            <Route path="/dashboard/*" element={<NonAdmin />} />
          )}
          <Route exact path="/user-profile/" >
              <Route exact path="" element={<UserProfile />} />
              <Route exact path="trips" element={<UseTrips />} />
              <Route exact path="create-trip" element={<AddTrip />} />
              <Route exact path="blogs" element={<UserBlogs />} />
              <Route exact path="create-post" element={<AddPost />} />
              <Route exact path="update-post/:blogId" element={<UpdateUserBlog />} />
          </Route>
          <Route exact path="/trips" element={<Trip />} />
          <Route exact path="/trip/:tripId" element={<TripDetail />} />
          <Route exact path="/trip-enrollment/:tripId"element={<TripEnrollment />}
          />
          <Route exact path="/post/:postId" element={<PostDetail />} />
          <Route exact path="/blogs" element={<Blog />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
