import {ErrorBadRequest, ErrorForbidden} from "../Api/ApiHelper";

export function getPasswordError(areErrorsVisible, shouldChangePassword, password) {
    if (!areErrorsVisible)
        return "";
    if (!shouldChangePassword)
        return "";
    if (password === "")
        return "Введите новый пароль";
    return "";
}

export function getSlackCredentialsError(areErrorsVisible, enableNotifications, slackCredentials) {
    if (!areErrorsVisible)
        return "";
    if (!enableNotifications)
        return "";
    if (slackCredentials === "")
        return "Введите Slack-токен";
    return "";
}


// Register errors

export function parseUsernameServerError(responseStatus) {
    if (responseStatus === ErrorBadRequest)
        return "Пользователь с таким логином уже существует";
    return "";
}

export function parseEmailServerError(responseStatus) {
    if (responseStatus === ErrorBadRequest)
        return "Пользователь с такой почтой уже существует";
    return "";
}

export function getRegisterUsernameError(areErrorsVisible, username, usernameServerError) {
    if (!areErrorsVisible)
        return "";
    if (username === "")
        return "Введите новый логин";
    return usernameServerError;
}

export function getRegisterEmailError(areErrorsVisible, email, emailServerError) {
    if (!areErrorsVisible)
        return "";
    if (email === "")
        return "Введите новую почту";
    if (!email.match(/^[\w\-\.]+@([\w\-]+\.)+[\w\-]+$/))
        return "Введите новую почту в формате example@mail.com";
    return emailServerError;
}


// Profile errors

export function getProfileUsernameError(areErrorsVisible, shouldChangeLogin, username) {
    if (!areErrorsVisible)
        return "";
    if (!shouldChangeLogin)
        return "";
    if (username === "")
        return "Введите новый логин";
    return "";
}

export function getProfileEmailError(areErrorsVisible, shouldChangeEmail, email) {
    if (!areErrorsVisible)
        return "";
    if (!shouldChangeEmail)
        return "";
    if (email === "")
        return "Введите новую почту";
    if (!email.match(/^[\w\-\.]+@([\w\-]+\.)+[\w\-]+$/))
        return "Введите новую почту в формате example@mail.com";
    return "";
}

export function parseCurrentPasswordServerError(responseStatus) {
    if (responseStatus === ErrorBadRequest)
        return "Введите текущий пароль";
    if (responseStatus === ErrorForbidden)
        return "Неверный пароль";
    return "";
}

export function getCurrentPasswordError(areErrorsVisible, shouldTypeCurrentPassword, currentPassword, currentPasswordServerError) {
    if (!areErrorsVisible)
        return "";
    if (!shouldTypeCurrentPassword)
        return "";
    if (currentPassword === "")
        return "Введите текущий пароль";
    return currentPasswordServerError;
}