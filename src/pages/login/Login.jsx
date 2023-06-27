import React, { useEffect, useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authAction';
import toast from 'react-hot-toast';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    dispatch(loginAction(actualData));
  };

  const user = useSelector((state) => state.loginUser);
  
  useEffect(() => {
    if (user.user) {
      toast.success('Login successful');
      navigate('/');
    } else if (user.error) {
      toast.error(user.error);
    }
  }, [user.user, user.error, navigate]);

  return (
    <div className="account row">
      <div className="form col-md-5 col-10">
        <h3 className="heading">Login to your account</h3>
        <form method="post" onSubmit={handleSubmit}>
          <div className="inputField">
          
            <input required type="email" name="email" id="email" placeholder="EMAIL" />
          </div>
          <div className="inputField">
          
            <input required type="password" name="password" id="password" placeholder="PASSWORD" />
          </div>

          <div className="inputField">
            <button type="submit">LOGIN</button>
          </div>
        </form>
        <div className="forgot">
          <Link className="forgotPassword" to='/mail-verification'>
            Forgot password?
          </Link>
          <Link className="createAnAcount" to="/register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
