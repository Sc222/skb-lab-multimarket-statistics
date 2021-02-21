import {getCookieToken} from "../Helpers/CookieHelper";

export const ApiRoot="http://localhost:5000";
export const HttpStatusCodeLength = 3;
export const ErrorInternalServerErr = "500";
export const ErrorBadRequest = "400";
export const ErrorForbidden = "403";
export const ErrorConflict = "409";
export const NoContent = "204"; //treat as error if app does not exist for ex
export const Success = 200;

//custom errors
export const ErrorNotUniqueEmail = "badEmail";
export const ErrorNotUniqueUsername = "badUsername";
export const ErrorNotUniqueUsernameAndEmail = "badUsernameAndEmail";

export function getRequestHeaders(hasContentType, contentType="application/json",accept="application/json"){
    const result = {};
    if(hasContentType)
        result["Content-Type"]=contentType;
    result["Accept"]=accept;
    result["Authorization"]=`Bearer ${getCookieToken()}`;
    return result
}