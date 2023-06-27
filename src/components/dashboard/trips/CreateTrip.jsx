import {useEffect} from "react";
import "./trips.css";
import AdminMenu from "../../adminManu/AdminManu";
import { useDispatch, useSelector } from 'react-redux'
import { createTripAction, getTripsAction } from "../../../redux/actions/tripAction";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import AdminInfo from "../adminInfo/AdminInfo";



const CreateTrip = () => {
  const { user } = useSelector((state) => state.loginUser) || {}

  const dispatch=useDispatch();
  const handleSubmit =async (e) => {
    e.preventDefault();

    const actualData = new FormData(e.currentTarget);
    actualData.append("user_id", "647ccbde88dc9012c9f4729b");
    const active = actualData.get("active") === "on"; // Convert "on" string to boolean

    actualData.set("active", active);
    
    try {
      await dispatch(createTripAction(actualData))
      toast.success("added successfuly")
      await dispatch(getTripsAction(""))
    } catch (error) {
      toast.error("Error occurred while adding the trip");
    }

  
  };
  const trip = useSelector((state) => state.newTrip);
  console.log(trip.trip)
  
  const editorConfig = {
    cleanHTML: true,
    placeholder: "Provide description according to below points: <br/>1. Places we will visit <br/> 2. Approximate number of days for the trip",
};
  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <AdminMenu />

        <div className="col-md-10 m-0 p-0">
          <AdminInfo/>
<div className="col-md-8 col-11" style={{margin:"auto", marginTop:"15px"}}>
<div className="tripForm">
          <h3>Add New Trip</h3>

          <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
            
          
            
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                className="form-control"
                name="destination"
             
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
               
                required
              />
            </div>
            <div className="form-group">
              <label>Budget</label>
              <input
                type="number"
                className="form-control"
                name="budget"
                required
              />
            </div>
            <div className="form-group">
              <label>HeaderImage</label>
              <input
                type="file"
                className="form-control"
                name="headerImage"
             
                required
              />
            </div>
            <div className="form-group">
              <label>total Seats</label>
              <input
                type="number"
                className="form-control"
                name="totalSeats"
                required
              />
            </div>
            <div className="form-group">
              <label>Accommodation</label>
              <input
                type="text"
                className="form-control"
                name="accommodation"
                
              />
            </div>
            <div className="form-group">
              <label>Transportation</label>
              <input
                type="text"
                className="form-control"
                name="transportation"
              
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <JoditEditor name="notes" config={editorConfig} />

            </div>

            <div className="form-check">
                <label>Active</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="active"
                  checked={trip.active}
                />
              </div>
            <button type="submit" className=" formButton">
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

export default CreateTrip;
