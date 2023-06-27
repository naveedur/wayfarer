import {useEffect,useState} from 'react'
import './home.css'
import Slider from '../../components/slider/Slider'
import Post from '../../components/post/Post'
import { getBlogsAction } from '../../redux/actions/blogAction';
import { getTripsAction } from '../../redux/actions/tripAction';
import { useDispatch,useSelector } from 'react-redux';
import HomeAbout from '../../components/about/HomeAbout'
import Subscribe from '../../components/subscribe/Subscribe'
import Layout from '../../components/Layout/Layout'
import TripPost from '../../components/tripPost/TripPost';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const {blogs}=useSelector((state)=>state.getBlogs)
  const [tripList, setTripList] = useState([]);

  const {trip} = useSelector((state) => state.getTrips); 

  useEffect(() => {
    dispatch(getBlogsAction(""))
      .then(() => {
        dispatch(getTripsAction(""));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (trip && trip.data) {
      const filteredTrips = trip.data.filter((tri) => tri.active);
      setTripList(filteredTrips);
    }
  }, [trip]);
  console.log(tripList)


  return (
    <Layout title={"home - Travel"}>
      
    <div className='home'>
      <Slider/>
      <HomeAbout/>
      <div className="posts ">
        <div className="row container">
<h3 className='destinationHeading'>Destinatons</h3>
<hr/>
        {tripList && tripList.slice(0, 2).map((trip) => (
      <div key={trip._id} className=" card py-1  mx-2 col-md-5 col-11 postData">
                          <Link to={`/trip/${trip._id}`}>  

        <TripPost trip={trip} />
        </Link>
      </div>
    ))}
         <Link className='moreButton' to='/trips'>More Trips</Link> 

        </div>
      
      </div>


      <div className="ceo">
        <h3>Our Management will be personally available for all hours of the day for you.
         NO EXCEPTONS. You will have his personal contact Info through out your 
         trip (and beyond).
        </h3>
        <p>Because all we care about is for you to fully enjoy your travel.</p>

      </div>
  
      <div className="posts ">
        <div className="row container">
<h3 className='destinationHeading'>Tourist Experiences</h3>
<hr/>
        {blogs && blogs.data && blogs.data.slice(0, 2).map((blog) => (
      <div key={blog._id} className="card py-2 mx-2 col-md-5 col-11 postData">
                  <Link to={`/post/${blog._id}`}>  
                        <Post post={blog} />
                  </Link>

      </div>
    ))}
         <Link className='moreButton' to='/blogs'>More Blogs</Link> 

      
        </div>
      
      </div>

      <Subscribe/>
     
    </div>
    </Layout>
  )
}

export default Home