import React from "react";
import "../styles/header.css"
import logo from "../img/logo.svg"

const Header = () => {
    return(
        <div className="Header">
            <div className="header wrapper">
                <a href="http://www.akg-bensheim.de/home/informationen-fuer-grundschuleltern-schueler/107-tag-der-offenen-tuer"><img src={logo} alt="akg" className="logo"></img></a>
                <h1>Tag der offenen Tür</h1>
            </div>
        </div>
    )
}

export default Header