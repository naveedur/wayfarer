import React from 'react'
import AdminMenu from '../../adminManu/AdminManu'
const Users = () => {
  return (
    <div className="container-fluid dashboard">
    <div className="row">
      
       <AdminMenu/>
      
      <div className="col-md-9">
        <div className="card w-75 p-3">
      <h2>users</h2>
        </div>
      </div>
    </div>
  </div>  )
}

export default Users