import { useEffect, useState } from "react";
import "./trips.css";
import axios from "axios";
import toast from "react-hot-toast";
import { domain } from "../../../domain.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTripsAction } from "../../../redux/actions/tripAction";
import Search from "../../search/Search";
import UserLayout from "../../../pages/userProfile/userLayout/UserLayout";

const UserTrips = () => {
  const { user } = useSelector((state) => state.loginUser) || {};

  const [tripList, setTripList] = useState([]);
  const { trip } = useSelector((state) => state.getTrips) || {};

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getTripsAction(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (trip && trip.data) {
      const filteredTrips = trip.data.filter(
        (tri) => tri.user_id == user.data._id
      );
      setTripList(filteredTrips);
    }
  }, [trip]);
  const deleteClinkHandler = async (id) => {
    const data = await axios.delete(`${domain}/api/trip/${id}`);
    toast.success("deleted successfuly");
    setTripList((prevList) => prevList.filter((trip) => trip._id !== id));
  };
  const totalTrip = tripList.length;

  const handleTripSearch = (e) => {
    setSearch(e);
  };
  const formatDate = (dateString) => {
    if (totalTrip > 0) {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    }
  };

  return (
    <UserLayout>
      <div className="col-md-8 col-11" style={{ margin: "auto" }}>
        <div className="blogTop mt-3">
          <Search handleSearch={handleTripSearch} />

          <div className="addNew">
            <Link to="/user-profile/create-trip"> Add New</Link>
          </div>
        </div>

        {tripList &&
          tripList.map((tri) => (
            <div key={tri._id} className=" card w-100 p-3 my-5">
              <div className="row">
                <div className="col-md-4 trip">
                  <img
                    src={
                      tri.headerImage
                        ? `${domain}/${tri.headerImage.replace("\\", "/")}`
                        : "http://localhost:3000/assets/slider/slider1.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="col-md-6 detail order-md-1 order-2">
                  <div className=" ">
                    {tri.startDate && (
                      <span className="startDate">
                        <b>Start Date</b>: {formatDate(tri.startDate)}
                      </span>
                    )}
                    {tri.endDate && (
                      <span>
                        <b>End Date</b>: {formatDate(tri.endDate)}
                      </span>
                    )}
                  </div>

                  <h2>{tri.destination}</h2>
                  <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: tri.notes.split(" ").slice(0, 30).join(" "),
                    }}
                  ></p>
                </div>
                <div className="col-md-2 order-1 order-md-2  editButton">
                  <p className="active">Active</p>

                  <div className="Buttons">
                    <Link onClick={() => deleteClinkHandler(tri._id)}>
                      {" "}
                      Delete{" "}
                    </Link>
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
  );
};

export default UserTrips;
