import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if(props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            name={'profile'}
            form={'profile-editor'}
            title={'Редактировать профиль'}
            buttonText={'Подтвердить'}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            children={(
                <div className="popup__inputs">
                    <input id="name-input" className="popup__input" value={name} onChange={handleNameChange} type="text" name="name" placeholder="Как вас зовут? :)" minLength="2" maxLength="40" required/>
                    <span className="name-input-error popup__input-error"/>
                    <input id="about-input" className="popup__input" value={description} onChange={handleDescriptionChange} type="text" name="about" placeholder="Расскажите о себе :)" minLength="2" maxLength="200" required/>
                    <span className="about-input-error popup__input-error"/>
                </div>
            )}
        />
    )
}
