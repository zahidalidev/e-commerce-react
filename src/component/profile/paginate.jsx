import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Paginate extends Component {

   
    render() { 
        const selectedId = window.location.pathname.substr(6);
        const classesActive = selectedId === "profile/orders" ? "list-group-item active page-link" : "list-group-item page-link";
        const classesColor = selectedId === "profile/orders" ? "white" : "#3f51b5";
        const classesActive2 = selectedId === "profile/accountDetails" ? "list-group-item active page-link" : "list-group-item page-link";
        const classesColor2 = selectedId === "profile/accountDetails" ? "white" : "#3f51b5";

        return ( 
            <nav>
                <ul className="list-group" style={{marginTop: 200}}>
                    <li className={classesActive2}>
                        <NavLink style={{color: classesColor2}} className="nav-item nav-link" to="/home/profile/accountDetails">
                            Account details
                        </NavLink>
                    </li>
                    <li className={classesActive} >
                        <NavLink style={{color: classesColor}} className={"nav-item nav-link"} to="/home/profile/orders">
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </nav>
         );
    }
}
 
export default Paginate;