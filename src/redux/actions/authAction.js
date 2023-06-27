import axios from 'axios'
import { authConstants } from '../constants/authConstansts'

export const loginAction = (actualData) => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.USER_REQUEST,
    })
    const { data } = await axios.post('/api/login', actualData)
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: authConstants.USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    if (error.response && error.response.status === 400) {
      dispatch({
        type: authConstants.USER_ERROR,
        payload: "user not found",
        errorCode: 400,
      })
    } else if (error.response && error.response.status === 401) {
      dispatch({
        type: authConstants.USER_ERROR,
        payload: "invalid password",
        errorCode: 401,
      })
    } else {
      dispatch({
        type: authConstants.USER_ERROR,
        payload: "user not found",
        errorCode: 500,
      })
    }
  }
}