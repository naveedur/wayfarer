// import {useState, useEffect} from 'react'
import UserMenu from '../../../components/userProfile/adminManu/UserMenu';
import { Link } from 'react-router-dom'
// import toast from "react-hot-toast";
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux'
// import { getTripsAction } from "../../redux/actions/tripAction";
import AdminInfo from '../../../components/dashboard/adminInfo/AdminInfo';
// import { domain } from "../../domain";

const UserLayout = ({children}) => {


 
 
//   }
  return (
    <div className="container-fluid dashboard">
    <div className="row">
      
       <UserMenu/>
      
      <div className="col-md-10 m-0 p-0">
      <AdminInfo/>


        
{children}



      </div>
    </div>
  </div>
  )
}

export default UserLayout

