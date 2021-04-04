import React ,{Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { withRouter } from "react-router";

const navbar = (props) => {
    return (
        <nav>
            <label className="logo">Data Huddle</label>
            <ul>
                <Fragment> 
                    <li><NavLink exact to='/data'>Data</NavLink></li>
                    {/* <li><NavLink exact to='/detail'>Details</NavLink></li> */}
                </Fragment>
                
            </ul>
        </nav>
    )
}

export default (withRouter(navbar))