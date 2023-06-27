import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { FaFacebook, FaFacebookMessenger,FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className=' footer container-fluid '>
      
       <div className="row ">
  <div className="col-md-3 col-12 footerLeft text-center">
  <img className='footerImage' src={logo} alt="" />

  </div>
  <div className="col-md-6 col-12 footerCenter text-center">
  <div className="text">
                we are committed to creating personalized, high-quality 
                experiences that exceed your expectations and leave you
                with memories that last a lifetime.
            </div>
            <div className="links">
                <Link to="/trips">DESTINATIONS</Link>
                <Link to="/blogs">BLOGS</Link>
            </div>
  </div>
  <div className="col-md-3 col-12 footerRight text-center">
  <div className="socialIcons mb-3">
                <Link to=""><FaFacebook   size={35}  style={{ color: 'rgb(28,69,81)', backgroundColor:"white" , padding:"8px", borderRadius:"50% "}}/></Link>
                <Link to=""><FaInstagram    size={35}  style={{ color: 'rgb(28,69,81)', backgroundColor:"white" , padding:"8px", borderRadius:"50% "}}/></Link>
       </div>
  <div className="mail">naveedur1039@gmail.com</div>
       <div className="number">+923032589343</div>
       
  </div>
</div>
<div className="row">
          
            <div className='copyWrite'> <span>copywrite &copy PRODIGAL TRAVEL. All Rights Reserved</span></div>
           
        </div>
    </div>
  )
}

export default Footer