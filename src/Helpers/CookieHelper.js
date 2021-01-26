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

export function setCookieToken(token){
    const cookies = new Cookies();
    cookies.set('token',token, { path: '/' });
}

export function getCookieToken(){
    const cookies = new Cookies();
    const token = cookies.get('token');
    return token ? token : "";
}

export function deleteCookiesWhenLogout(){
    const cookies = new Cookies();
    cookies.remove('userId', { path: '/' });
    cookies.remove('token', { path: '/' });
}