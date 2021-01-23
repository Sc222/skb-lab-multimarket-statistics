export function getUsernameError(areErrorsVisible, shouldChangeLogin, username) {
    if(!areErrorsVisible)
        return "";
    if (!shouldChangeLogin)
        return "";
    if(username==="")
        return "Введите новый логин";
    return "";
}

export function getEmailError(areErrorsVisible, shouldChangeEmail, email) {
    if(!areErrorsVisible)
        return "";
    if (!shouldChangeEmail)
        return "";
    if(email==="")
        return "Введите новую почту";
    if(!email.match(/^[\w\-\.]+@([\w\-]+\.)+[\w\-]+$/))
        return "Введите новую почту в формате example@mail.com";
    return "";
}

export function getNewPasswordError(areErrorsVisible, shouldChangePassword, password) {
    if(!areErrorsVisible)
        return "";
    if (!shouldChangePassword)
        return "";
    if(password==="")
        return "Введите новый пароль";
    return "";
}

export function getCurrentPasswordError(areErrorsVisible, shouldChangePassword, shouldChangeEmail, shouldChangeLogin, currentPassword, currentPasswordServerError) {
    if(!areErrorsVisible)
        return "";
    if (!shouldChangePassword && !shouldChangeEmail && !shouldChangeLogin)
        return "";
    if(currentPassword==="")
        return "Введите текущий пароль";
    return currentPasswordServerError;
}

export function getSlackCredentialsError(areErrorsVisible, enableNotifications, slackCredentials) {
    if(!areErrorsVisible)
        return "";
    if(!enableNotifications)
        return "";
    if(slackCredentials==="")
        return "Введите Slack-токен";
    return "";
}