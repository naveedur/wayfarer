import React from 'react'
import './adminInfo.css'
import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const AdminInfo = () => {
    const { user } = useSelector((state) => state.loginUser) || {}

  return (
    <div className=" w-100 p-3 adminInfo">
          <h3> Name : {user.data.name}</h3>
          <h3> Email : {user.data.email}</h3>
          <Link to="/">Visit Site</Link>
        </div>
  )
}

export default AdminInfo