import { useNavigate, Link } from "react-router-dom";
import logo from "../logo.png";
import{BsSearch} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import AuthDetails from "./AuthDetails";


const Navbar = ({ searchText, setSearchText }) => {
  const Navigate = useNavigate();

  const updateSearchText = (e) => {
    Navigate("/Search");
    setSearchText(e.target.value);
  };

  return (
    <>
      <nav className="sticky-top  dark-page">
        <div className="container d-flex">
          <Link className="navbar-brand" to="/">
          <img src={logo} className="logo" alt="logo" />
          </Link>
          
          <form className="">
            <span className="search-icon">
            <BsSearch />
            </span>
            <input
              className=" search dark-page me-2"
              type="search"
              placeholder="Search Movies."
              aria-label="Search"
              value={searchText}
              onChange={updateSearchText}
            />
          </form>
            <div className="mb-menu">
            <Link
            class="menu-icon"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <GiHamburgerMenu />
          </Link>
          <ul className="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/About">
                About
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/Login">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/Contact">
                Contacts
              </Link>
            </li>
          </ul>
          <div className="user">
        <Link
          to="/SignUp"
          type="button"
          className=""
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Create Account"
        >
          <AuthDetails />
        </Link>
      </div>
          </div>
       
        </div>
      </nav>
    </>
  );
};

export default Navbar;
