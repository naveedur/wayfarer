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

  useEffect(()=>{
    dispatch(getTripsAction(""));
  },[dispatch])

  const [tripList, setTripList]=useState([])
  const {trip} = useSelector((state) => state.getTrips); 
  useEffect(() => {
    if (trip !== null) {
      setTripList(trip.data);
    }
  }, [trip]);
  const deleteClinkHandler=async(id)=>{
    const data=await axios.delete(`${domain}/api/trip/${id}`)
    toast.success("deleted successfuly")
    // setTripList(prevList => prevList.filter(trip => trip._id !== id));
 
 
  }
  return (
  
<UserLayout>
<div className=" col-md-10 col-11 pl-3 userTrips" style={{margin:"auto"}}>
<h3 className='mt-5 ' style={{marginLeft:"15px"}}>Trip posted by user. Need to review and activate if needed  </h3>

{tripList && tripList
.filter(trip => trip.user_id==user.data._id).map((tri)=> (
  <div key={tri._id} className=" card w-30 p-3 my-5">
  <div className="row">
    <div className="col-md-4 trip">
    <img src={tri.headerImage ? `${domain}/${tri.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
    </div>
    <div className="col-md-6 detail order-md-1 order-2">
        <div className=" ">
        </div>

       

      <h2>{tri.destination}</h2>
      <p className='' dangerouslySetInnerHTML={{__html:tri.notes ?  tri.notes.split(" ").slice(0, 20).join(" ") :""}}> 
       </p>
    </div>
    <div className="col-md-2 order-1 order-md-2  editButton">

      <div className="Buttons">
    <Link onClick={() => deleteClinkHandler(tri._id)}> Delete </Link>
  </div>
  <div className="Buttons">
  <Link to={`/dashboard/update-trip/${tri._id}`}>Update</Link>
  </div>
    </div>

    </div>
    
     </div>

))}
</div>
</UserLayout>
        




      
  )
}

export default UserProfile

