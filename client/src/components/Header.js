import React from "react";
import "../styles/header.css"
import logo from "../img/logo.svg"

const Header = () => {
    return(
        <div className="Header">
            <div className="header wrapper">
                <img src={logo} alt="akg" className="logo"></img>
                <h1>Tag der offenen Tür</h1>
            </div>
        </div>
    )
}

export default Header