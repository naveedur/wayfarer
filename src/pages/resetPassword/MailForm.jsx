import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export const MailForm = () => {
    const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      email: data.get('email'),
    };

    axios.post('/api/add-otp', actualData)
    .then(response => {
      if (response.data.status===401) {
        toast.error(response.data.message)
      } else {

        toast.success(response.data.message)
        navigate('/reset-password')
      }
    })
    .catch(error => {
      toast.error("invalid email"); 
    });     

  };

  
 

  return (
    <div className="account row">
      <div className="form col-md-5 col-10">
        <h3 className="heading mb-5">Enter Your mail</h3>
        <form method="post" onSubmit={handleSubmit}>
          <div className="inputField">
            
            <input required type="email" name="email" id="email" placeholder="EMAIL" />
          </div>
         

          <div className="inputField">
            <button type="submit">send</button>
          </div>
        </form>
        
      </div>
    </div>
  );
};
