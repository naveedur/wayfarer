import axios from 'axios';
import { getBlogConstants, createBlogConstants } from '../constants/blogConstant';


export const createBlogAction = (actualData) => async (dispatch) => {
  try {
    console.log(actualData)
    dispatch({
      type: createBlogConstants.BLOG_REQUEST,
    })
    const { data } = await axios.post('/api/blog/add', actualData)
    dispatch({
      type: createBlogConstants.BLOG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    if (error.response ) {
      dispatch({
        type: createBlogConstants.BLOG_ERROR,
        payload: "Blog not added",
        
      })
    } 
  }
}


export const getBlogsAction = (search) => async (dispatch) => {
    try {
      dispatch({ type: getBlogConstants.BLOG_REQUEST });
  
      const { data } = await axios.get(`/api/blog/all?search=${search}`);
      dispatch({ type: getBlogConstants.BLOG_SUCCESS, payload: data });
    } catch (error) {
      if (error ) {
        dispatch({
          type: getBlogConstants.BLOG_ERROR,
          payload: "Server error",
          
        })
      }
    }
  };