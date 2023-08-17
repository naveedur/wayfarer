import { authConstants } from "../constants/authConstansts";

const initialState = {
  user: JSON.parse(localStorage.getItem("travelUser")) || null,
  loading: false,
  error: null,
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authConstants.USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authConstants.USER_SUCCESS:
      localStorage.setItem("travelUser", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case authConstants.USER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
      case authConstants.USER_LOGOUT:
      localStorage.removeItem("travelUser");
      return {
        ...state,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};
