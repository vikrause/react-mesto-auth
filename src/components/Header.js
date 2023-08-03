import vector from "../images/logo/Vector.svg";
import React from "react";
import {Link} from "react-router-dom";

export default function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={vector} alt="Логотип"/>
            <div className="header__auth">
                <p className="header__text">{props.email}</p>
                <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
            </div>
        </header>
    )
}
