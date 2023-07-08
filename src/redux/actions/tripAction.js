import axios from "axios";
import {
  creatTripConstants,
  getTripConstants,
} from "../constants/tripConstants";

export const createTripAction = (actualData) => async (dispatch) => {
  try {
    dispatch({
      type: creatTripConstants.TRIP_REQUEST,
    });
    const { data } = await axios.post(
      "http://localhost:5000/api/trip/post",
      actualData
    );
    dispatch({
      type: creatTripConstants.TRIP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: creatTripConstants.TRIP_ERROR,
        payload: "Trip not added",
      });
    }
  }
};

export const getTripsAction = (search) => async (dispatch) => {
  try {
    dispatch({ 
      type: getTripConstants.TRIP_REQUEST 
    });
    const { data } = await axios.get(`http://localhost:5000/api/trip/get-all?search=${search}`);
    dispatch({
       type: getTripConstants.TRIP_SUCCESS,
        payload: data
       });
  } catch (error) {
    if (error.response) {
      dispatch({ 
        type: getTripConstants.TRIP_ERROR,
        payload: "Server error"
       });
    }
  }
};
