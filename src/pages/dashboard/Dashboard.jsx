import {useState, useEffect} from 'react'
import "./dashboard.css"
import AdminMenu from '../../components/adminManu/AdminManu'
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getTripsAction } from "../../redux/actions/tripAction";
import AdminInfo from '../../components/dashboard/adminInfo/AdminInfo';

const Dashboard = () => {

  const dispatch=useDispatch()

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
    const data=await axios.delete(`/api/trip/${id}`)
    toast.success("deleted successfuly")
    // setTripList(prevList => prevList.filter(trip => trip._id !== id));
 
 
  }
  return (
    <div className="container-fluid dashboard">
    <div className="row">
      
       <AdminMenu/>
      
      <div className="col-md-10 m-0 p-0">
      <AdminInfo/>
      <h3 className='mt-5 ' style={{marginLeft:"15px"}}>Trip posted by user. Need to review and activate if needed  </h3>

<div className=" col-md-8 col-11 pl-3 userTrips">
{tripList && tripList
.filter(trip => !trip.active).map((tri)=> (
  <div key={tri._id} className=" card w-100 p-3 my-5">
  <div className="row">
    <div className="col-md-4 trip">
    <img src={tri.headerImage ? `/${tri.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
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
        




      </div>
    </div>
  </div>
  )
}

export default Dashboard