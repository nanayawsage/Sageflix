import { useNavigate, Link } from "react-router-dom";
import logo from "../logo.png";
import{BsSearch} from "react-icons/bs"

const Navbar = ({ searchText, setSearchText }) => {
  const Navigate = useNavigate();

  const updateSearchText = (e) => {
    Navigate("/Search");
    setSearchText(e.target.value);
  };

  return (
    <>
      <nav className=" container sticky-top navbar-dark">
        <div className="container d-flex">
          <Link className="navbar-brand" to="/">
          <img src={logo} className="logo" alt="logo" />
          </Link>
          
          <form className="">
            <span className="search-icon">
            <BsSearch />
            </span>
            <input
              className=" search me-2"
              type="search"
              placeholder="Search for Movies."
              aria-label="Search"
              value={searchText}
              onChange={updateSearchText}
            />
          </form>

          {/* <span className="signin-btn">
            <Link to="/Login">
              <button className="btn btn-primary my-3">Sign In</button>
            </Link>
          </span> */}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/About"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Contact"
                >
                  Contact Us
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
