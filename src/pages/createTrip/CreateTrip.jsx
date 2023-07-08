import { useEffect, useState } from "react";
import "./createTrip.css";
import { useDispatch, useSelector } from "react-redux";
import { createTripAction } from "../../redux/actions/tripAction";
import { getTripsAction } from "../../redux/actions/tripAction";
import {  useNavigate } from "react-router-dom";
import Layout from '../../components/Layout/Layout'

import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { ImCross } from "react-icons/im";

const CreateTrip = () => {
  const navigate=useNavigate()

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginUser) || {}
  const [tripAlert, setTripAlert]=useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTripAlert(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
 
  const handleSubmit =async (e) => {
    e.preventDefault();

    const actualData = new FormData(e.currentTarget);
    actualData.append("user_id", user.data._id);


    // const actualData = {
    //   user_id: "647ccbde88dc9012c9f4729b",
    //   destination: data.get("destination"),
    //   notes: data.get("description"),
    // };

    

    try {
      await dispatch(createTripAction(actualData));
      toast.success("added successfully");
      await dispatch(getTripsAction(""))
      navigate('/')
    } catch (error) {
      toast.error("Error occurred while adding the trip");
    }
  };

  const trip = useSelector((state) => state.newTrip);
  console.log(trip.trip);

  const editorConfig = {
    placeholder: "Provide description according to below points: <br/>1. Places we will visit <br/> 2. Approximate number of days for the trip",
};

  return (
    <Layout title={"Add Trip - Travel"}>
      <div className="row  tripContainer">
       
        <div className="col-md-6 col-10 mt-5">
          <div className="form-box">
            <h3 className="tripHeading">Add New Trip</h3>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
              <div className="form-group">
                <label>Destination</label>
                <input type="text" className="form-control" name="destination" required />
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
                  <JoditEditor name="notes" config={editorConfig} />
              </div>
              <button type="submit" className="tripButton">
                Submit
              </button>
            </form>
          </div>
        </div>
{tripAlert && 
        <div className="tripAlert">
        <div className="icon" onClick={()=>setTripAlert(!tripAlert)}><ImCross size={40}  style={{ color: 'white' }}/></div>
        <div className="text">
        <h2>Please Read before adding trip.</h2>
          <p>When the admin activates the trip, you are required
             to book at least five seats.
          </p>
        </div>
          
        </div>
}
      </div>
    </Layout> 
 );
};

export default CreateTrip;
