import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            name={'avatar'}
            form={'popup-form-avatar'}
            title={'Аватар'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            children={(
                <>
                    <input ref={avatarRef} className="popup__input" type="url" placeholder="Ссылка на картинку"  id="avatar"  name="avatar" required/>
                    <span className="avatar-input-error popup__input-error"/>
                </>)}
        />
    )
}
