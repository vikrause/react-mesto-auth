import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit({
            name: name,
            link: url
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName('');
            setUrl('');
        }
    }, [props.isOpen]);
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            name={'card-add'}
            form={'add-card'}
            title={'Новое место'}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={'Добавить'}
            children={(
                <div className="popup__inputs">
                    <input
                        id="placeName-input"
                        className="popup__input"
                        onChange={handleNameChange}
                        value={name}
                        type="text"
                        name="placeName-input"
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        required/>
                    <span className="placeName-input-error popup__input-error"/>
                    <input
                        id="placeUrl-input"
                        className="popup__input"
                        type="url"
                        onChange={handleLinkChange}
                        value={url}
                        name="placeUrl-input"
                        placeholder="Ссылка на картинку"
                        required/>
                    <span className="placeUrl-input-error popup__input-error"/>
                </div>
            )}
        />
    )
}
