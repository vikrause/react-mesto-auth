import {useState} from "react";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVisibility, setPassVisibility] = useState("password");
    const [iconPassClass, setIconPassClass] = useState("login__icon-notPass");

    function handlePassVisibility() {
        switch (iconPassClass) {
            case "login__icon-notPass":
                setIconPassClass("login__icon-pass");
                setPassVisibility("text");
                break;
            case "login__icon-pass":
                setIconPassClass("login__icon-notPass");
                setPassVisibility("password");
                break;
        }
    }


    function handleEmailInput(e) {
        setEmail(e.target.value);
    }

    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(email, password);
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__input" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required/>
                    <div className="login__group">
                        <input className="login__input" type={passVisibility} placeholder="Пароль" value={password} onChange={handlePasswordInput} maxLength={30} required/>
                        <span className={iconPassClass} onClick={handlePassVisibility}></span>
                    </div>
                    <button className="login__button" type="submit">Войти</button>
                </form>
            </section>
        </>
    );
}
