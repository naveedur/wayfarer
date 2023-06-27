import React from "react";
import { useState } from "react";
import './adminManu.css'
import {ImCross} from 'react-icons/im'
import {FaBars} from 'react-icons/fa'
import { Link } from "react-router-dom";
const AdminMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    
  };

  return (
    <>
    <div className={showMenu ? "showToggle navToggle" : "navToggle" }> 
    <button className='navbarBtn' onClick={()=>toggleMenu()}> 
               {showMenu ? <ImCross size={40}  style={{ color: 'white' }}/>:
                <FaBars size={40}  style={{ color: 'white' }}/>}</button></div>
    <div className={showMenu ? "col-md-2 manuBar d-lg-flex " : "col-md-2 manuBar d-none d-lg-flex " }>
      
      <h4 className="heading"> <Link to='/dashboard'>Admin Dashboard</Link></h4>
    <div className="manuItems">
           

              <div className="menuItem">
              <Link to='/dashboard/trips'>Trips</Link>
              </div>
            <div className="menuItem">
            <Link to='/dashboard/blogs'>Blogs</Link>
            </div>
            <div className="menuItem">
            <Link to='/dashboard/trip-enrollments'>Enrollments</Link>
            </div>
            <div className="menuItem"></div>
           

          </div>
          </div>

          </>
  );
};

export default AdminMenu;
