import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect,useState} from 'react';
import { domain } from "../../../domain.js";
import axios from 'axios';
import { toast } from 'react-hot-toast';


const EnrollUser = (props) => {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const fetchUsers= async ()=>{
           const res=await axios.get(`${domain}/api/users`)
           if (res.status===200){
            setUsers(res.data.data)
           }
        }
        fetchUsers()
    },[props.tripid])
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const actualData = new FormData(e.currentTarget);
        actualData.append("tripId", props.tripid);
        const data={
            tripId:props.tripid,
            userId:actualData.get('userId'),
            seats:parseInt(actualData.get('seats')),
        }
        await axios.post(`${domain}/api/enrollment/add`,data)
        .then(()=>{toast.success("enrolled user successfully")})
        .catch((error)=>{toast.error(error.message)})
        
    }
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Enroll User
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="enrollForm">
      <form  onSubmit={handleSubmit} method="post" >
      <div className="form-group">
              <label>User</label>
              <select type="text" className="form-select" name="userId" id="trip" placeholder='where you visited'>
                {users && users.map((user, index) => (
                    <option  value={user._id} key={index}>{user.name}</option>
                ))}
              </select>
            </div>

              <div className="form-group">
                <label>Number of seats</label>
                <input
                  type="text"
                  className="form-control"
                  name="seats"
                  required
                />
              </div>

            

              <button type="submit" className="formButton">
                Add
              </button>
            </form>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EnrollUser