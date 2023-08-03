import {useState} from "react";
import {Link} from "react-router-dom";

export default function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailInput(e) {
        setEmail(e.target.value);
    }

    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__input" type="email" value={email} placeholder="Email" onChange={handleEmailInput}/>
                    <input className="login__input" type="password" value={password} placeholder="Пароль" onChange={handlePasswordInput}/>
                    <button className="login__button" type="submit">Зарегистрироваться</button>
                </form>
                <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link>
                </p>
            </section>
        </>
    );
}
