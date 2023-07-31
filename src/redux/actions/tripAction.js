import axios from "axios";
import {
  creatTripConstants,
  getTripConstants,
} from "../constants/tripConstants";
import { domain } from "../../domain";
export const createTripAction = (actualData) => async (dispatch) => {
  console.log(actualData)
  try {
    dispatch({
      type: creatTripConstants.TRIP_REQUEST,
    });
    const { data } = await axios.post(
      `${domain}/api/trip/post`,
      actualData
    );
    console.log(data)
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
    const { data } = await axios.get(`${domain}/api/trip/get-all?search=${search}`);
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
