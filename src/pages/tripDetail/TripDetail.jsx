import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import './tripDetail.css'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'
import TripChat from '../../components/tripChat/TripChat'
import toast  from 'react-hot-toast'

const TripDetail = () => {

  const { tripId } = useParams();
const [tripData, setTripData] = useState({});
const [tripEnrollment, setTripEnrollment] = useState({});



useEffect(() => {
  const fetchTrip = async () => {

    const {data} = await axios.get(`https://travel-blond.vercel.app/api/trip/${tripId}`);
    setTripData(data.data)

    const enrollmentData=await axios.get(`https://travel-blond.vercel.app/api/enrollment/get-enrollment/${tripId}`)
    if(enrollmentData){
      setTripEnrollment(enrollmentData.data.data)

     

    }
  };
  fetchTrip(); 
}, [tripId]); 
// console.log(tripEnrollment.totalSeatsBooked);


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}; 
  return (
    <Layout title={"trip - Travel"}>

    <div className='container'>
        <div className="row">

        <div className="col-6 col-md-6 mt-4">
     
        </div>
        {tripData.totalSeats-tripEnrollment?.totalSeatsBooked<=0 ?
        <div className=" col-md-6 col-6 mt-4 d-flex flex-column align-items-end">
        <Link onClick={()=> toast.error("No seats remaining")} className='bookButton '> Book your seat</Link>
      </div>
      :
        <div className=" col-md-6 col-6 mt-4 d-flex flex-column align-items-end">
          <Link to={`/trip-enrollment/${tripId}`} className='bookButton '> Book your seat</Link>
        </div>
}
            <div className="image col-12">
            <img src={tripData.headerImage ? `/${tripData.headerImage.replace('\\', '/')}` : "http://localhost:3000/assets/slider/slider1.jpg"} alt="" />
            </div>

            
            <div className="col-md-12 col-12 mt-4">
                <h1 className="title">{tripData.destination}</h1>

            </div>

            <div className="col-12">
            <table className="table table-bordered">
  
  <tbody>
    <tr>
      <th scope="row">Trip Toword</th>
      <td>{tripData.destination}</td>
      
    </tr>
   
    <tr>
      <th scope="row">Departure at</th>
      <td>{formatDate(tripData.startDate)}</td>
    
    </tr>

   
    <tr>
      <th scope="row">Arrival on</th>
      <td>{formatDate(tripData.endDate)}</td>
    
    </tr>

    <tr>
      <th scope="row">Total Seats</th>
      <td>{tripData.totalSeats ? tripData.totalSeats : '20'}</td>
    
    </tr>
    <tr>
      <th scope="row">Remaining Seats</th>
      <td>{tripEnrollment?.totalSeatsBooked ? tripData.totalSeats-tripEnrollment.totalSeatsBooked: tripData.totalSeats }</td>
    
    </tr>
    <tr>
      <th scope="row">Budget</th>
      <td>{tripData.budget}</td>
    
    </tr>
    

  </tbody>
</table>
            </div>
          
            

            <div className="col-12 mt-4">
                <p className='description'  dangerouslySetInnerHTML={{__html: tripData.notes}}>
                  {/* {tripData.notes} */}
                </p>
            </div>

            <div className="co-12">
              <TripChat tripId={tripData._id}/>
            </div>
        </div>

      
            
        </div>
     </Layout>
  )
}

export default TripDetail