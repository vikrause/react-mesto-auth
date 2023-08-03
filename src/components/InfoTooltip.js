export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__info">
                <button className="popup__exit popup__exit_image button-hover" type="button" aria-label="Закрыть окно" onClick={props.onClose}/>
                <img className="popup__status" src={props.image} alt={props.title}/>
                <h2 className="popup__message">{props.title}</h2>
            </div>
        </div>
    );
}
