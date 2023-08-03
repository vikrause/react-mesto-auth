import React from "react";

export default function ImagePopup(props) {
    return(
        <section className={`popup popup_image ${props.isOpen ? `popup_opened` : ''}`}>
            <div className="popup__container popup__container_image">
                <button className="popup__exit popup__exit_image button-hover" type="button" aria-label="Закрыть окно" onClick={props.onClose}/>
                <img className="popup__image popup__image_image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""}/>
                <h2 className="popup__caption popup__caption_image">{props.card ? props.card.name : ""}</h2>
            </div>
        </section>
    )
}