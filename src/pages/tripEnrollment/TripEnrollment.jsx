import React from 'react'
import { useRef ,useEffect,useState} from 'react';
import './tripEnrollment.css'
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { domain } from "../../domain.js";

const TripEnrollment = () => {
    const {tripId}=useParams()
    const { user } = useSelector((state) => state.loginUser) || {};
    const [tripEnrollment, setTripEnrollment] = useState({});
    const [tripData, setTripData] = useState({});


    const totalSeats=useRef()

    useEffect(() => {
      const fetchTrip = async () => {
    
        const {data} = await axios.get(`${domain}/api/trip/${tripId}`);
        setTripData(data.data)
    
        const enrollmentData=await axios.get(`${domain}/api/enrollment/get-enrollment/${tripId}`)
        if(enrollmentData){
          setTripEnrollment(enrollmentData.data.data)
        }
      };
      fetchTrip(); 
    }, [tripId]); 
    const handleEnrollment=async()=>{
        const data={
            tripId:tripId,
            userId:user.data._id,
            seats:parseInt(totalSeats.current.value),
        }
        if ((tripData.totalSeats - (tripEnrollment?.totalSeatsBooked ?? 0)) >= parseInt(totalSeats.current.value)) {
          if(parseInt(totalSeats.current.value)>5){
            toast.error("For booking more then 5 seats. You may need to visit office. ")

          }else{
            await axios.post(`${domain}/api/enrollment/add`,data)
            .then(()=>{toast.success("you have successfuly enrolled")})
            .catch((error)=>{toast.error(error.message)})
          }
          
        }else{
          toast.error(`only ${tripData.totalSeats-(tripEnrollment?.totalSeatsBooked ?? 0)} remaining for this trip`)
        }
      
    }
  return (
    <div className='container-fluid main'>
        <div className="mx-5 row enrollmentrow">
            <div className="col-lg-6 col-12 pt-5 d-none d-lg-block enrollmentLeft">
            <img src="http://localhost:3000/assets/slider/slider1.jpg" alt="" />
            </div>
            <div className="col-lg-6 col-12 pt-4 enrollmentRight">
                <h3 className='mb-5'>Welcome, Thanks for Enrollment</h3>
                <p className='mb-4 px-5'>By clicking the "Enroll" button, you will be enrolled
                    for a trip to <b>Multan</b>. The trip duration will
                    be 10 days, starting from 10/3/2023 and concluding
                    on 20/3/2023. During the trip, all accommodations 
                    and other services will be provided.
                </p>
                <h5>Payment may accepted by hand</h5>
                <h4 className='mb-5'>Enjoy the Journey !</h4>

                <div className="form-group fieldContainer">
              <label>Number of seats:</label>
              <input
              ref={totalSeats}
                type="number"
                className="form-control"
                name="seatsBooked"
                required
              />
            </div>

                <button  className='enrollButton' onClick={handleEnrollment}> Enroll</button>

            </div>

        </div>
    </div>
  )
}

export default TripEnrollment