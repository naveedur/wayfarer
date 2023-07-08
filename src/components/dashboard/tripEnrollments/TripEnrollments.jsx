import React from "react";
import { useEffect,useState } from "react";
import AdminMenu from "../../adminManu/AdminManu";
import AdminInfo from "../adminInfo/AdminInfo";
import { Accordion } from 'react-bootstrap';
import './tripEnrollments.css'
import axios from "axios";
import { domain } from "../../../domain.js";

const TripEnrollments = () => {
   const [enrollment,setEnrollment]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get('${domain}/api/enrollment/get-enrollments')
      setEnrollment(data.data)
    }
    fetchData()
  },[])
  console.log(enrollment[0]?.trip?.budget);
  console.log(enrollment[0]?.enrolledUsers[0]?.user?.name);
  return (
    <div className="container-fluid">
      <div className="row">
        <AdminMenu />

        <div className="col-md-10 p-0 m-0">
          <AdminInfo />
          <div className="col-md-10 col-11" style={{ margin: "auto", marginTop: "15px" }}>
            
            <Accordion>
              {enrollment && enrollment.map((enroll,index)=>(
                <Accordion.Item eventKey={index} className="mb-3">
                <Accordion.Header className="enrollHeader">
                  <h4>{enroll.trip.destination}</h4>
                  <div className="totalSeats">
                    <h4>Total Seats Booked</h4>
                    <h5>{enroll.totalSeatsBooked}</h5>
                  </div>
                  
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    
                 {enroll.enrolledUsers.map((users)=>(
                  <div className="col-md-6 col-11  ">
                     <div className="enrollLeft">
                      <h4> Name:</h4>                      
                      <h5 className="mx-3"> {users.user.name}</h5>
                      <h4>Seats Booked:</h4>
                      <h5>( {users.seatsBooked})</h5>
                       </div>
                       </div>

                 ))}
                 
                 </div>
                </Accordion.Body>
              </Accordion.Item>
              ))}
      
  
    </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripEnrollments;
