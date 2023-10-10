import React from 'react'
import {MdWindow} from  "react-icons/md"
import AuthDetails from "./AuthDetails";
import { Link } from 'react-router-dom';


const SideMenu = () => {
  return (
    <div className="menu-container sticky-left">
    <nav className="menu-icons">
    <div className="dropend">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  <MdWindow />
    
  </button>
  <ul class="dropdown-menu">
    <li>
    <Link to="/">Home</Link>
    </li>
    <li>
    <Link to="/">Home</Link>
    </li>
    <li>
    <Link to="/">Home</Link>
    </li>


  </ul>
</div>
 
<div className='menu'> 
        </div>
        <div className="user">
        <AuthDetails />
        </div>
     </nav>
    </div>
  )
}

export default SideMenu
