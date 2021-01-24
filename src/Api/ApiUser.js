import {ApiRoot, ErrorConflict} from "./ApiHelper";
import {parseServerMailAndUsernameErrors} from "../Helpers/ErrorHelper";

export async function getUser(userId) {
    return fetch(`${ApiRoot}/api/User/${userId}`,
        {
            headers: {
                "Accept": "application/json"
            },
            method: "GET",
        })
        .then(result => {
            if (result.ok) {
                if (result.status === 200)
                    return result.json();
                throw new Error("User does not exist: " + result.status);
            }
            throw new Error("User get error: " + result.status);
        });
}

export async function createUser(user) {
    return fetch(`${ApiRoot}/api/User/create`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user),
            method: "POST",
        })
        .then(result => {
            if (result.ok) //returns token
                return result.json();
            if (result.status.toString() === ErrorConflict)
                return result.json();
            throw new Error(result.status.toString());
        })
        .then(json => {

            console.log("processing json");
            console.log(json);

            //it's error json
            if (json.isEmailUnique !== undefined && json.isUsernameUnique !== undefined)
                throw new Error(parseServerMailAndUsernameErrors(json));
            return json;
        });
}

export async function updateUser(user) {
    return fetch(`${ApiRoot}/api/User/update`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
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
            console.log("processing json");
            console.log(json);

            //it's error json
            if (json.isEmailUnique !== undefined && json.isUsernameUnique !== undefined)
                throw new Error(parseServerMailAndUsernameErrors(json));
            return json;
        });
}