import React, { useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authAction';
import toast from 'react-hot-toast';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector((state) => state.loginUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    dispatch(loginAction(actualData));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
      toast.success('Login successful');
    } else if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

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
