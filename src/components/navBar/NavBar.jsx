import {useState} from 'react'
import './navBar.css'
import {ImCross} from 'react-icons/im'
import {FaBars} from 'react-icons/fa'
import { Link ,useNavigate } from 'react-router-dom'
import logo from '../../images/logo.png'

const NavBar = () => {
    const navigate=useNavigate();
    const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    
  };
  const handleLogout=()=>{
    setShowMenu(false)
    localStorage.removeItem("user");
    navigate('/register')

  }

  
  return (
    <>
   
    <div className="containers">
        
            <div className="left">
              <button className='navbarBtn' onClick={()=>toggleMenu()}> 
               {showMenu ? <ImCross size={40}  style={{ color: 'white' }}/>:
                <FaBars size={40}  style={{ color: 'white' }}/>}</button>
                
            </div>
            <div className="center">
              <Link to='/'><img src={logo} alt="logo" /></Link>  
            </div>
            <div className="right">
                <Link to='/trips'>Pick Adventure</Link>
            </div>
           
        
    </div>
           <div className={showMenu ? "showNav" : "hideNav"}>
            <div className="navList">
                    <ul className="listItems" >
                        <li className="listItem" onClick={()=>setShowMenu(false)}>
                            <Link to="/blogs" >Blogs</Link>
                        </li>
                        <li className="listItem" onClick={()=>setShowMenu(false)}>
                            <Link to="/trips" >Trips</Link>
                        </li>
                        <li className="listItem" onClick={()=>setShowMenu(false)}>
                            <Link to="/about-us" >about us</Link>
                        </li>
                        <li className="listItem" onClick={()=>setShowMenu(false)}>
                            <Link to="/add-post" >Create BLog</Link>
                        </li>
                        <li className="listItem" onClick={()=>setShowMenu(false)}>
                            <Link to="/create-trip" >create Trip</Link>
                        </li>

                       
                       
                        <li className="listItem" onClick={handleLogout}>
                            <Link onClick={handleLogout} >logout</Link>
                        </li>

                    </ul>
                    </div>
                </div>
           
  </>
  )
}

export default NavBar