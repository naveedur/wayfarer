import { creatTripConstants, getTripConstants } from '../constants/tripConstants';

const initialCreateTripState = {
  trip: [],
  loading: false,
  error: null,
};

export const createTripReducer = (state = initialCreateTripState, { type, payload }) => {
  switch (type) {
    case creatTripConstants.TRIP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case creatTripConstants.TRIP_SUCCESS:
      return {
        ...state,
        trip: payload,
        loading: false,
      };

    case creatTripConstants.TRIP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

const initialGetTripsState = {
  trip: [],
  loading: false,
  error: null,
};

export const getTripsReducer = (state = initialGetTripsState, { type, payload }) => {
  switch (type) {
    case getTripConstants.TRIP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case getTripConstants.TRIP_SUCCESS:
      return {
        ...state,
        trip: payload,
        loading: false,
      };

    case getTripConstants.TRIP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
