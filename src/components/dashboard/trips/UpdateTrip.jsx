import { useEffect, useState } from "react";
import "./trips.css";
import axios from 'axios';
import AdminMenu from "../../adminManu/AdminManu";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import AdminInfo from "../adminInfo/AdminInfo";
import { domain } from "../../../domain.js";


const UpdateTrip = () => {
  const { tripId } = useParams();
  const [trip , setTrip]=useState({})
  // const [trip, setTrip] = useState({
  //   destination: "",
  //   startDate: "",
  //   endDate: "",
  //   accommodation: "",
  //   transportation: "",
  //   budget: 0,
  //   totalSeats:0,
  //   notes: "",
  //   active: false
  // });

  useEffect(() => {
    const fetchTrip = async (tripId) => {
      const { data } = await axios.get(`${domain}/api/trip/${tripId}`);
      setTrip(data.data);
    };
    fetchTrip(tripId);
  }, [tripId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const actualData = new FormData();
    actualData.append('destination', trip.destination);
    actualData.append('startDate', trip.startDate);
    actualData.append('endDate', trip.endDate);
    actualData.append('accommodation', trip.accommodation);
    actualData.append('transportation', trip.transportation);
    actualData.append('budget', trip.budget);
    actualData.append('totalSeats', trip.totalSeats);
    actualData.append('notes', trip.notes);
    actualData.append('active', trip.active);
  
    if (trip.headerImage instanceof File) {
      actualData.append('headerImage', trip.headerImage);
    }
  console.log(actualData.get("budget"))
  console.log(actualData.get("headerImage"))
    try {
      const result = await axios.put(`${domain}/api/trip/${tripId}`, actualData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (result.status === 200) {
        toast.success('Updated successfully');
      } else {
        toast.error('Trip not updated');
      }
    } catch (error) {
      toast.error('An error occurred while updating the trip');
    }
  };
  const editorConfig = {
    cleanHTML: true,
    placeholder: "Provide description according to below points: <br/>1. Places we will visit <br/> 2. Approximate number of days for the trip",
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setTrip({ ...trip, headerImage: file });
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={trip.destination}
                  onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formatDate(trip.startDate)}
                  onChange={(e) => setTrip({ ...trip, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={formatDate(trip.endDate)}
                  onChange={(e) => setTrip({ ...trip, endDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Budget</label>
                <input
                  type="number"
                  className="form-control"
                  name="budget"
                  value={trip.budget}
                  onChange={(e) => setTrip({ ...trip, budget: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Header Image</label>
                <input type="file" 
                className="form-control" 
                name="headerImage"
                 onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <label>total seats</label>
                <input
                  type="number"
                  className="form-control"
                  name="totalSeats"
                  value={trip.totalSeats}
                  onChange={(e) => setTrip({ ...trip, totalSeats: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Accommodation</label>
                <input
                  type="text"
                  className="form-control"
                  name="accommodation"
                  value={trip.accommodation}
                  onChange={(e) => setTrip({ ...trip, accommodation: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Transportation</label>
                <input
                  type="text"
                  className="form-control"
                  name="transportation"
                  value={trip.transportation}
                  onChange={(e) => setTrip({ ...trip, transportation: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <JoditEditor
                name="notes"
                value={trip.notes}
                onChange={(content) => setTrip({ ...trip, notes: content })}
              />

                {/* <textarea
                  className="form-control"
                  name="description"
                  value={trip.notes}
                  onChange={(e) => setTrip({ ...trip, notes: e.target.value })}
                ></textarea> */}
              </div>
              <div className="form-check">
                <label>Active</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="active"
                  checked={trip.active}
                  onChange={(e) => setTrip({ ...trip, active: e.target.checked })}
                />
              </div>
              <button type="submit" className="formButton">
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

export default UpdateTrip;

