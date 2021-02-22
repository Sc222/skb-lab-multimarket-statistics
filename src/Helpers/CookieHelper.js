import Cookies from "universal-cookie";

export function setCookieUserId(userId){
    const cookies = new Cookies();
    cookies.set('userId', userId, { path: '/' });
}

export function getCookieUserId(){
    const cookies = new Cookies();
    const userId =  cookies.get('userId');
    console.log("userCookie:");
    console.log(userId ? userId : "");
    return userId ? userId : "";
}

export function setCookieUsername(login){
    const cookies = new Cookies();
    cookies.set('login', login, { path: '/' });
}

export function getCookieUsername(){
    const cookies = new Cookies();
    const login =  cookies.get('login');
    return login ? login : "";
}

export function setCookieToken(token, expirationDate){
    const cookies = new Cookies();
    cookies.set('token',token, { path: '/', expires: expirationDate});
}

export function getCookieToken(){
    const cookies = new Cookies();
    const token = cookies.get('token');
    console.log("tokenCookie:");
    console.log(token ? token : "");
    return token ? token : "";
}

export function deleteAllSessionCookies(){
    const cookies = new Cookies();
    cookies.remove('userId', { path: '/' });
    cookies.remove('token', { path: '/' });
}