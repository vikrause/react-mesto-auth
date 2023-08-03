import React from "react";

export default function PopupWithForm({isOpen, onClose, name, title, form, buttonText, children, onSubmit}) {
    return(
        <section className={`popup popup_${name} ${isOpen ? `popup_opened` : ''}`} >
            <div className="popup__container">
                <button className="popup__exit button-hover" type="button" aria-label="Закрыть окно" onClick={onClose}/>
                <h3 className="popup__title">{title}</h3>
                <form className="popup__form" name={form} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__save" type="submit" aria-label="Сохранить новые данные">{buttonText}</button>
                </form>
            </div>
        </section>
    )
}