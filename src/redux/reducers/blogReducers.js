import { getBlogConstants,createBlogConstants } from "../constants/blogConstant";


const initialState = {
    blogs: [],
    loading: false,
    error: null,
  };
  
  export const createBlogReducer = (state = initialState, { type, payload }) => {
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


export const getBlogReducer=(state=initialState,{type,payload})=>{
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