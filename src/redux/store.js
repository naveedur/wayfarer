import thunk from 'redux-thunk';
import {combineReducers, createStore,applyMiddleware} from 'redux';
import { loginReducer } from './reducers/authReducer';
import { getBlogReducer ,createBlogReducer} from './reducers/blogReducers';
import { createTripReducer,getTripsReducer } from './reducers/tripReducer';


const reducers = combineReducers({
    loginUser: loginReducer,
    getBlogs: getBlogReducer,
    newBlog: createBlogReducer,
    newTrip: createTripReducer,
    getTrips: getTripsReducer
  });
  
  const middleware = [thunk];
  
  const store = createStore(reducers, applyMiddleware(...middleware));

export default store;


