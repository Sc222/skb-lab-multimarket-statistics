import {
    ErrorBadRequest,
    ErrorForbidden,
    ErrorNotUniqueEmail,
    ErrorNotUniqueUsername,
    ErrorNotUniqueUsernameAndEmail
} from "../Api/ApiHelper";

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

export function parseServerMailAndUsernameErrors(responseJson) {
    if(!responseJson.isEmailUnique && !responseJson.isUsernameUnique)
        return ErrorNotUniqueUsernameAndEmail;
    if(!responseJson.isEmailUnique)
        return ErrorNotUniqueEmail;
    if(!responseJson.isUsernameUnique)
        return ErrorNotUniqueUsername;
    return "";
}

export function parseUsernameServerError(errorCode) {
    if (errorCode === ErrorNotUniqueUsernameAndEmail || errorCode === ErrorNotUniqueUsername)
        return "Пользователь с таким логином уже существует";
    return "";
}

export function parseEmailServerError(errorCode) {
    if (errorCode === ErrorNotUniqueUsernameAndEmail || errorCode === ErrorNotUniqueEmail)
        return "Пользователь с такой почтой уже существует";
    return "";
}

export function getRegisterPasswordError(areErrorsVisible, password) {
    if (!areErrorsVisible)
        return "";
    if (password === "")
        return "Введите пароль";
    return "";
}

export function getRegisterUsernameError(areErrorsVisible, username, usernameServerError) {
    if (!areErrorsVisible)
        return "";
    if (username === "")
        return "Введите логин";
    return usernameServerError;
}

export function getRegisterEmailError(areErrorsVisible, email, emailServerError) {
    if (!areErrorsVisible)
        return "";
    if (email === "")
        return "Введите почту";
    if (!email.match(/^[\w\-\.]+@([\w\-]+\.)+[\w\-]+$/))
        return "Введите почту в формате example@mail.com";
    return emailServerError;
}


// Profile errors

export function getProfileUsernameError(areErrorsVisible, shouldChangeLogin, username, currentUsername, usernameServerError) {
    if (!areErrorsVisible)
        return "";
    if (!shouldChangeLogin)
        return "";
    if (username === "")
        return "Введите новый логин";
    if (username === currentUsername)
        return "Введите логин, отличный от текущего";
    return usernameServerError;
}

export function getProfileEmailError(areErrorsVisible, shouldChangeEmail, email, currentEmail, emailServerError) {
    if (!areErrorsVisible)
        return "";
    if (!shouldChangeEmail)
        return "";
    if (email === "")
        return "Введите новую почту";
    if (!email.match(/^[\w\-\.]+@([\w\-]+\.)+[\w\-]+$/))
        return "Введите новую почту в формате example@mail.com";
    if (email === currentEmail)
        return "Введите почту, отличную от текущей";
    return emailServerError;
}

export function getProfilePasswordError(areErrorsVisible, shouldChangePassword, password) {
    if (!areErrorsVisible)
        return "";
    if (!shouldChangePassword)
        return "";
    if (password === "")
        return "Введите новый пароль";
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