import { useState, useMemo, useCallback } from 'react';
import './navBar.css';
import { ImCross } from 'react-icons/im';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useSelector ,useDispatch} from 'react-redux';
import { logoutAction } from '../../redux/actions/authAction';

const NavBar = () => {
  const userSelector = useSelector((state) => state.loginUser);
  const user = useMemo(() => userSelector.user, [userSelector]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }, []);

  const handleLogout = useCallback(() => {
    setShowMenu(false);
    localStorage.removeItem('travelUser');
    dispatch(logoutAction());
    navigate('/login');
  }, [navigate,dispatch]);

  const userRole = useMemo(() => user?.data?.role, [user]);

  return (
    <>
      <div className="containers">
        <div className="left">
          <button className="navbarBtn" onClick={toggleMenu}>
            {showMenu ? <ImCross size={40} style={{ color: 'white' }} /> : <FaBars size={40} style={{ color: 'white' }} />}
          </button>
        </div>
        <div className="center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="right">
          <Link to={userRole === 1 ? '/dashboard' : '/User-profile'}>Dashboard</Link>
        </div>
      </div>
      <div className={showMenu ? 'showNav' : 'hideNav'}>
        <div className="navList">
          <ul className="listItems">
            <li className="listItem" onClick={toggleMenu}>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="listItem" onClick={toggleMenu}>
              <Link to="/trips">Trips</Link>
            </li>
            <li className="listItem" onClick={toggleMenu}>
              <Link to="/about-us">about us</Link>
            </li>
            <li className="listItem" onClick={toggleMenu}>
              <Link to="/user-profile/create-post">Create Blog</Link>
            </li>
            <li className="listItem" onClick={toggleMenu}>
              <Link to="/user-profile/create-trip">Create Trip</Link>
            </li>
            <li className="listItem" onClick={handleLogout}>
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
