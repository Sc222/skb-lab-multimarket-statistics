import {
    ErrorBadRequest,
    ErrorForbidden,
    ErrorNotUniqueEmail,
    ErrorNotUniqueUsername,
    ErrorNotUniqueUsernameAndEmail
} from "../Api/ApiHelper";
import {MarketsInfo} from "./MarketsInfoHelper";

export function getSlackCredentialsError(areErrorsVisible, enableNotifications, slackCredentials) {
    if (!areErrorsVisible)
        return "";
    if (!enableNotifications)
        return "";
    if (slackCredentials === "")
        return "Введите Slack-токен";
    if (!slackCredentials.match(/^https:\/\/hooks.slack.com\/services\/[\S]*$/))
        return "Введите Slack-токен в формате https://hooks.slack.com/services/UNIQUE-TOKEN-PART";
    return "";
}


//NewApplication errors

export function getAppNameError(areErrorsVisible, name){
    if (!areErrorsVisible)
        return "";
    if (name === "")
        return "Введите название приложения";
    return "";
}

export function getAppDescriptionError(areErrorsVisible, description){
    if (!areErrorsVisible)
        return "";
    if (description === "")
        return "Введите описание приложения";
    return "";
}

export function getAppMarketError(areErrorsVisible, marketIndex, isSelected, marketLink, marketId){
    console.log("app market error: "+areErrorsVisible+" "+marketIndex+" "+isSelected+" "+marketLink+" "+marketId)
    if (!areErrorsVisible)
        return "";
    if (!isSelected)
        return "";
    if (marketLink === "")
        return `Укажите ссылку на приложение в ${MarketsInfo[marketIndex].name}`;
    if (marketLink !== "" && marketId==="")
        return `Ссылка должна иметь формат: ${MarketsInfo[marketIndex].demoFormat}`;
    return "";
}


//Login + Register error
export function getPasswordError(areErrorsVisible, password) {
    if (!areErrorsVisible)
        return "";
    if (password === "")
        return "Введите пароль";
    return "";
}

//Login + Register error
export function getUsernameError(areErrorsVisible, username, usernameServerError="") {
    if (!areErrorsVisible)
        return "";
    if (username === "")
        return "Введите логин";
    return usernameServerError;
}


// Login errors

export function parseLoginWrongCredentialsServerError(errorMessage) {
    return errorMessage === "Username or password is incorrect";
}


// Register errors

export function parseServerMailAndUsernameErrors(responseJson) {
    if (!responseJson.isEmailUnique && !responseJson.isUsernameUnique)
        return ErrorNotUniqueUsernameAndEmail;
    if (!responseJson.isEmailUnique)
        return ErrorNotUniqueEmail;
    if (!responseJson.isUsernameUnique)
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