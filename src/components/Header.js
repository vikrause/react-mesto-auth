import vector from "../images/logo/Vector.svg";
import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

export default function Header(props) {
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [route, setRoute] = useState("");
    const [isHeaderBurgerActive, setIsHeaderBurgerActive] = useState(false);
    const isLogged = props.loggedIn;

    function addClassActive() {
        setIsHeaderBurgerActive(!isHeaderBurgerActive);
    }

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
        <React.Fragment>
            {isLogged &&
                <BurgerMenu
                    email={props.email}
                    route={route}
                    title={title}
                    onClick={props.onClick}
                    isActive={isHeaderBurgerActive}
                />
            }
            <header className="header">
                <img className="header__logo" src={vector} alt="Логотип"/>
                <div className={`header__auth ${isLogged ? `header__auth_inactive` : ""}`}>
                    <p className="header__text">{props.email}</p>
                    <Link to={route} className="header__link" type="button" onClick={props.onClick}>{title}</Link>
                </div>
                {isLogged &&
                    <>
                        <input className={"header__checkbox"} id={"header__checkbox"} type={"checkbox"}/>
                        <label htmlFor={"header__checkbox"} className="header__burger-toggle" onClick={addClassActive}>
                            <span className="header__burger-bars"></span>
                            <span className="header__burger-bars"></span>
                            <span className="header__burger-bars"></span>
                        </label>
                    </>
                }
            </header>
        </React.Fragment>
    )
}
