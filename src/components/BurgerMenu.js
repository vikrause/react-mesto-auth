import {Link} from "react-router-dom";

export default function BurgerMenu(props) {
    return (
        <div className={`header__burger ${props.isActive ? `header__burger_active` : ""}`}>
            <p className="header__text">{props.email}</p>
            <Link to={props.route} className="header__link" type="button" onClick={props.onClick} style={{
                alignSelf: "center",
                marginRight: "0px"
            }}>{props.title}</Link>
        </div>
    )
}
