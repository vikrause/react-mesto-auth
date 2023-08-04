import vector from "../images/logo/Vector.svg";
import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";

export default function Header(props) {
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [route, setRoute] = useState("");

    React.useEffect(() => {
        switch (location.pathname) {
            case '/sign-in':
                setRoute("/sign-up");
                setTitle("Регистрация");
                break;
            case '/sign-up':
                setRoute("/sign-in");
                setTitle("Войти");
                break;
            case '/':
                setRoute("/sign-in");
                setTitle("Выйти");
                break;
            default:
                break;
        }
    }, [location.pathname]);


    return (
        <header className="header">
            <img className="header__logo" src={vector} alt="Логотип"/>
            <div className="header__auth">
                <p className="header__text">{props.email}</p>
                <Link to={route} className="header__link" type="button" onClick={props.onClick}>{title}</Link>
            </div>
        </header>
    )
}
