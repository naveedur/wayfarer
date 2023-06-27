import { Link } from 'react-router-dom'
import './homeAbout.css'
import { FaCamera,FaAward,FaClock } from 'react-icons/fa'
const HomeAbout = () => {
  return (
    <div className="about container-fluid px-5">
        <div className="row px-1 mt-3">
<div className=" col-md-4 aboutLeft">
  <p>  we are passionate crafting unforgettable travel experiences 
    that take you on the journey of relaxation, experiences and exploration in some 
    of the world's most breathtaking destinations.
  </p>
<Link to="/about-us">More About Us</Link>
</div>
<div className=" col-md-6 aboutRight ">
    <div className="box">
        <FaCamera  size={50}  style={{ color: 'white', backgroundColor:"#BB975D" , padding:"8px", borderRadius:"50% "}}/>
        <h5 className='my-2'>MEMORIES THAT WILL LAST FOR LIFE TIME</h5>
        <p>We will help you to create beautiful MEMORIES and capture them in stunning
            PHOTOS to bring home.

        </p>
    </div>
    <div className="box">
        <FaClock size={50}  style={{ color: 'white', backgroundColor:"#BB975D" , padding:"8px", borderRadius:"50% "}}/>
        <h5 className='my-2'>GUIDANCE AND SUPPORT 24/7</h5>
        <p>Ouer expertizem knowledge and SUPPORT will be at your service throughout entire journey.

        </p>
    </div>
    <div className="box">
       <FaAward  size={50}  style={{ color: 'white', backgroundColor:"#BB975D" , padding:"8px", borderRadius:"50% "}}/>
        <h5 className='my-2'>LUXURY AND HIGH-END SERVICES</h5>
        <p>You can expect only top and HIGH-QUALITY experiences when choosing our services.

        </p>
    </div>
</div>
        </div>
    </div>
  )
}

export default HomeAbout