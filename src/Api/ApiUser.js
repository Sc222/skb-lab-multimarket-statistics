import {ApiRoot, ErrorBadRequest, ErrorConflict, getRequestHeaders, Success} from "./ApiHelper";
import {parseServerMailAndUsernameErrors} from "../Helpers/ErrorHelper";

export async function createUser(user) {
    return fetch(`${ApiRoot}/api/User/create`,
        {
            headers: getRequestHeaders(false),
            body: JSON.stringify(user),
            method: "POST",
        })
        .then(result => {
            if (result.ok) //returns token string
                return result.json();
            if (result.status.toString() === ErrorConflict)
                return result.json();
            throw new Error(result.status.toString());
        })
        .then(json => {
            //it's error json
            if (json.isEmailUnique !== undefined && json.isUsernameUnique !== undefined)
                throw new Error(parseServerMailAndUsernameErrors(json));
            return json;
        });
}

export async function updateUser(user) {
    return fetch(`${ApiRoot}/api/User/update`,
        {
            headers: getRequestHeaders(true),
            body: JSON.stringify(user),
            method: "PUT",
        })
        .then(result => {
            if (result.ok)
                return result.text();
            if (result.status.toString() === ErrorConflict)
                return result.json();
            throw new Error(result.status.toString());
        })
        .then(json => {
            //it's error json
            if (json.isEmailUnique !== undefined && json.isUsernameUnique !== undefined)
                throw new Error(parseServerMailAndUsernameErrors(json));
            return json;
        });
}

export async function getUser(userId) {
    return fetch(`${ApiRoot}/api/User/${userId}`,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok) {
                if (result.status === Success)
                    return result.json();
                throw new Error("User does not exist: " + result.status);
            }
            throw new Error("User get error: " + result.status);
        });
}

export async function deleteUser(userId) {
    return fetch(`${ApiRoot}/api/User/${userId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE",
        })
        .then(result => {
            if (result.ok)
                return result.text();
            throw new Error("User delete error: " + result.status);
        });
}

export async function authenticateUser(loginCredentials) {
    return fetch(`${ApiRoot}/api/User/authenticate`,
        {
            headers: getRequestHeaders(false),
            body: JSON.stringify(loginCredentials),
            method: "POST",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            if (result.status.toString() === ErrorBadRequest)
                return result.json();
            throw new Error(result.status+" "+result.statusText);
        })
        .then(json => {
            //it's error json
            if (json.message !== undefined)
                throw new Error(json.message);
            return json;
        });
}