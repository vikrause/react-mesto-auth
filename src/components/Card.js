import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like-active'}`
    );

    return(
                <article className="card">
                    <img className="card__img" src={props.url} alt={props.name} onClick={handleClick}/>
                    <div className="card__info">
                        <h2 className="card__title">{props.name}</h2>
                        <div className="card__like-box">
                            <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}/>
                            <p className="card__like-count">{props.likes}</p>
                        </div>
                        {isOwn && <button className="card__remove button-hover" type="button" aria-label="Удалить" onClick={handleDeleteClick}/>}
                    </div>
                </article>
    )
}
