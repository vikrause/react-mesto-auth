import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})`}}/>
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__editor button-hover" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}/>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__add-button button-hover" type="button" aria-label="Добавить карточку" onClick={props.onAddPlace}/>
            </section>

            <section className="cards">
                    {props.cards.map((card, _id) =>(
                        <Card
                        key={_id}
                        card={card}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        url={card.link}
                        />
                    ))}
            </section>
        </main>
    )
}
