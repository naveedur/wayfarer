import { getBlogConstants,createBlogConstants } from "../constants/blogConstant";


const initialCreateBlogState = {
    blogs: [],
    loading: false,
    error: null,
  };
  
  export const createBlogReducer = (state = initialCreateBlogState, { type, payload }) => {
    switch (type) {
      case createBlogConstants.BLOG_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case createBlogConstants.BLOG_SUCCESS:
        return {
          ...state,
          blogs: payload,
          loading: false,
        };
  
      case createBlogConstants.BLOG_ERROR:
        return {
          ...state,
          loading: false,
          error: payload,
        };
  
      default:
        return state;
    }
  };



  const initialGetBlogsState = {
    blogs: [],
    loading: false,
    error: null,
  };
export const getBlogReducer=(state=initialGetBlogsState,{type,payload})=>{
    switch(type){
        case getBlogConstants.BLOG_REQUEST:
            return{
                ...state,
                loading: true,
            };

        case getBlogConstants.BLOG_SUCCESS:
            return{
                ...state,
                blogs: payload,
                loading: false,
            };
        
        case getBlogConstants.BLOG_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
            };

        default:
            return state    
    }
}