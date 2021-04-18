import React ,{Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { withRouter } from "react-router";
import logo from "../assets/pics/logo.png"
import rect from "../assets/pics/rect.png"

const navbar = (props) => {
    console.log("props.location.pathname = " ,props.location.pathname)
    let url = props.location.pathname
    url = url.split("/")
    console.log(url)
    return (
        <nav className="container-fluid">
            <div className="row">
                <div className="col-md-2" style={{height:'50%'}}>
                    <img className="logo" src={logo} />
                </div>
                <div className="col-md-5" style={{height:'50%'}}>
                    <ul className="margin-top-24">
                        <li><NavLink exact to='/home'>Platform</NavLink></li>
                        <li><NavLink exact to='/home'>Use Cases</NavLink></li>
                        <li><NavLink exact to='/home'>Industries</NavLink></li>
                        <li><NavLink exact to='/home'>Roles</NavLink></li>
                        {url[1] == 'detail' && (
                            <li><NavLink exact to='/data'>Data</NavLink></li>
                        )}
                        {url[1] != 'detail' && (
                            <li><NavLink exact to='/home'>Resources</NavLink></li>
                        )}
                    </ul>

                </div>
                {(url[1] != 'data' && url[1] != 'detail') && (
                    <div className="col-md-5" style={{height:'50%'}}>
                        {/* <li><NavLink exact to='/home'>Sign In</NavLink></li> */}
                        <img  className="img-style" src={rect} />
                        

                    </div>
                )}
            </div>
            {/* <ul>
                <Fragment> 
                    <li><NavLink exact to='/data'>Data</NavLink></li>
                    <li><NavLink exact to='/detail'>Details</NavLink></li>
                </Fragment>
                
            </ul> */}
        </nav>
    )
}

export default (withRouter(navbar))