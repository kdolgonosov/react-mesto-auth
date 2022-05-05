import Header from './Header';
import FormWithTitle from './FormWithTitle';
import InfoTooltip from './InfoTooltip';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import authApi from '../utils/AuthApi';
function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resIsOk, setResIsOk] = useState(undefined);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function onLogin(e) {
        e.preventDefault();
        authApi.signIn(email, password).then((res) => {
            if (res === false) {
                setResIsOk(false);
                setIsInfoTooltipOpen(true);
            } else {
                handleLogin(email);
            }
        });
    }
    function onCloseInfoTooltip() {
        setIsInfoTooltipOpen(false);
    }
    return (
        <>
            <Header>
                <Link className="header__btn" to="/sign-up">
                    Регистрация
                </Link>
            </Header>
            <div className="auth">
                <FormWithTitle
                    titleClassName="auth__title"
                    title="Вход"
                    formClassName="pop-up__form"
                    onSubmit={onLogin}
                    submitBtnClassName="auth__submit-btn"
                    btnTitle="Войти"
                >
                    <input
                        type="email"
                        className="auth__input"
                        placeholder="Email"
                        required
                        minLength="2"
                        maxLength="30"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <input
                        type="password"
                        className="auth__input"
                        placeholder="Пароль"
                        required
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </FormWithTitle>
            </div>
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={onCloseInfoTooltip}
                resIsOk={resIsOk}
            />
        </>
    );
}
export default Login;
