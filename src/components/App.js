import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./popups/PopupWithForm";
import ImagePopup from "./popups/ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./popups/EditProfilePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth.js';
import iconError from '../images/iconError.svg'
import iconItsOk from '../images/iconItsOk.svg'

export default function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [infoTooltip, setInfoTooltip] = useState(false);


    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupImg, setPopupImg] = useState("");
    const [emailName, setEmailName] = useState(null);

    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();


    function register(email, password) {
        auth.registerUser(email, password).then(() => {
            setPopupImg(iconItsOk);
            setPopupTitle("Вы успешно зарегистрировались!");
            navigate("/sign-in");
        }).catch(() => {
            setPopupImg(iconError);
            setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        }).finally(handleInfoTooltip);
    }

    function login(email, password) {
        auth.loginUser(email, password).then((res) => {
            localStorage.setItem("jwt", res.token);
            api.setHeadersAuth(res.token);
            setLoggedIn(true);
            setEmailName(email);
            navigate("/");
        }).catch(() => {
            setPopupImg(iconError);
            setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
            handleInfoTooltip();
        });
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.getToken(jwt).then((res) => {
                if (res) {
                    api.setHeadersAuth(jwt);
                    setLoggedIn(true);
                    setEmailName(res.email);
                }
            }).catch(console.error);
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userData, cards]) => {
                    setCards(cards);
                    setCurrentUser(userData);
                }).catch(console.error);
            navigate("/");
        }
    }, [loggedIn, navigate]);

    function handleInfoTooltip() {
        setInfoTooltip(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleAddPlaceSubmit(cardData) {
        api.addNewCard(cardData.name, cardData.link).then((newCard) => {
            setCards([newCard, ...cards]);
            closePopups();
        }).catch(console.error);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        if (!isLiked) {
            api.addCardLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch(console.error);
        } else {
            api.removeCardLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch(console.error);
        }
    }

    function handleCardDelete(card) {
        api.removeCard(card).then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id && c));
        }).catch(console.error);
    }

    function handleUpdateUser(userData) {
        api.setUserInfo(userData.name, userData.about).then((user) => {
            setCurrentUser(user);
            closePopups();
        }).catch(console.error);
    }

    function handleUpdateAvatar(data) {
        api.updateAvatar(data).then((avatar) => {
            setCurrentUser(avatar);
            closePopups();
        }).catch(console.error);
    }

    function signOut() {
        setLoggedIn(false);
        setEmailName(null);
        localStorage.removeItem("jwt");
        api.setHeadersAuth("");
        navigate("/sign-in");
    }

    function closePopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        setInfoTooltip(false);
        setIsImagePopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    onClick={signOut}
                    email={emailName}
                />
                <Routes>
                    <Route path='/sign-in' element={
                        <Login onLogin={login}/>
                    }/>
                    <Route path='/sign-up' element={
                        <Register onRegister={register}/>
                    }/>
                    <Route exact path='/' element={
                        <>
                            <ProtectedRoute
                                component={Main}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                loggedIn={loggedIn}
                            />
                            <Footer/>
                        </>
                    }/>
                    <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"}/>}/>
                </Routes>
                <InfoTooltip
                    image={popupImg}
                    title={popupTitle}
                    isOpen={infoTooltip}
                    onClose={closePopups}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closePopups}
                    onUpdateUser={handleUpdateUser}/>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closePopups}
                    onUpdateAvatar={handleUpdateAvatar}/>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closePopups}
                    onSubmit={handleAddPlaceSubmit}/>
                <PopupWithForm
                    onClose={closePopups}
                    name={'delete-card'}
                    title={'Вы уверены?'}
                    buttonText={'Удалить'}
                />
                <ImagePopup
                    isOpen={isImagePopupOpen}
                    onClose={closePopups}
                    card={selectedCard}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}
