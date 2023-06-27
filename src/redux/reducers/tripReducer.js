import { creatTripConstants ,getTripConstants } from '../constants/tripConstants'

const initialState = {
  trip: [],
  loading: false,
  error: null,
};

export const createTripReducer = (state = initialState, { type, payload }) => {
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


export const getTripsReducer = (state = initialState, { type, payload }) => {
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
