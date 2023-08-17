import {useState, useEffect} from 'react'
import UserMenu from '../../components/userProfile/adminManu/UserMenu';
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getTripsAction } from "../../redux/actions/tripAction";
import AdminInfo from '../../components/dashboard/adminInfo/AdminInfo';
import { domain } from "../../domain";
import UserLayout from './userLayout/UserLayout';
const UserProfile = () => {

  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.loginUser) || {}
  const [tripEnrollments, setTripEnrollments]=useState([])
  useEffect(()=>{
    dispatch(getTripsAction(""));
  },[dispatch])

  const [tripList, setTripList]=useState([])
  const {trip} = useSelector((state) => state.getTrips); 
  useEffect(() => {
    const fetchTripEnrollments = async () => {
      const { data } = await axios.get(`${domain}/api/enrollment/get-enrollments`);
      const filteredData = data.data.filter((enroll) => {
        return enroll.enrolledUsers.some((userEnroll) => {
          let userId = userEnroll.user?._id;
  
         
  
          return userId === user.data._id; // Use === for strict comparison
        });
      });
  
      setTripEnrollments(filteredData);
     
    };
  
    fetchTripEnrollments();
  }, []);
  
  const deleteClinkHandler=async(id)=>{
    const data=await axios.delete(`${domain}/api/trip/${id}`)
    toast.success("deleted successfuly")
    // setTripList(prevList => prevList.filter(trip => trip._id !== id));
 
 
  }
  return (
  
<UserLayout>
<div className=" col-md-10 col-11 pl-3 userTrips" style={{margin:"auto"}}>
<h3 className='mt-5 ' style={{marginLeft:"15px"}}> Trips where You enrolled </h3>
{tripEnrollments.length>0 ? tripEnrollments.map((tripenroll,index)=>(
  
<div key={index} className=" card w-100 p-3 my-5">
  <div className="row">
    <div className="col-md-4 trip">
    <img src={tripenroll.trip?.headerImage ? `${domain}/${tripenroll.trip?.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
    </div>
    <div className="col-md-6 detail order-md-1 order-2">
        <div className=" ">
        </div>

       

      <h2>{tripenroll.trip?.destination}</h2>
      <h3>total seats you have Booked {tripenroll.enrolledUsers[0].seatsBooked}</h3>
      
    </div>
    <div className="col-md-2 order-1 order-md-2  editButton">

      <div className="Buttons">
    <Link to={`/trip/${tripenroll.trip?._id}`} > Preview </Link>
  </div>
  {/* <div className="Buttons">
  <Link to={`/dashboard/update-trip/${tri._id}`}>Update</Link>
  </div> */}
    </div>

    </div>
    
     </div>))
:
<h3 className='mt-5 ' style={{marginLeft:"15px" , margin:"auto", marginTop:"40px" }}>  you do not enroll in any Trip</h3>

}

</div>
</UserLayout>
        




      
  )
}

export default UserProfile

