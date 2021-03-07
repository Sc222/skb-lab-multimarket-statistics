import Cookies from "universal-cookie";

export function setCookieUserId(userId){
    const cookies = new Cookies();
    cookies.set('userId', userId, { path: '/' });
}

export function getCookieUserId(){
    const cookies = new Cookies();
    const userId =  cookies.get('userId');
    return userId ? userId : "";
}

export function setCookieLogin(login) {
    const cookies = new Cookies();
    cookies.set('login', login, {path: '/'});
}

export function getCookieLogin() {
    const cookies = new Cookies();
    const login = cookies.get('login');
    return login ? login : "";
}

export function setCookieToken(token, expirationDate){
    const cookies = new Cookies();
    cookies.set('token',token, { path: '/', expires: expirationDate});
}

export function getCookieToken(){
    const cookies = new Cookies();
    const token = cookies.get('token');
    return token ? token : "";
}

export function deleteAllSessionCookies(){
    const cookies = new Cookies();
    cookies.remove('login', {path: '/'});
    cookies.remove('userId', {path: '/'});
    cookies.remove('token', { path: '/' });
}

export function isCookieTokenExpired(){
    return getCookieToken() === "" && getCookieUserId() !== "";
}