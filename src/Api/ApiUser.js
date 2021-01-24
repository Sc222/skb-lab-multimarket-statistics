import {ApiRoot} from "./ApiHelper";

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
                if(result.status===200)
                    return result.json();
                throw new Error("User does not exist: " + result.status);
            }
            throw new Error("User get error: " + result.status);
        });
}

export async function createUser(user){
    return fetch(`${ApiRoot}/api/User/create`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            },
            body: JSON.stringify(user),
            method: "POST",
        })
        .then(result => {
            if (result.ok) //returns token
                return result.text();
            throw new Error(result.status.toString());
        });
}

export async function updateUser(user){
    return fetch(`${ApiRoot}/api/User/update`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            },
            body: JSON.stringify(user),
            method: "PUT",
        })
        .then(result => {
            if (result.ok)
                return result.text();
            throw new Error(result.status.toString());
        });
}