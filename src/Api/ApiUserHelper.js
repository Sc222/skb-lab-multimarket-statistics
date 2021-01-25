export function getDefaultLoginCredentials(){
    return {username:"",password:""};
}

export function getDefaultUserNoId(){
    return {username:"",password:"",email:"",slackCredentials:""};
}

export function getDefaultUser(){
    const user = getDefaultUserNoId();
    user.id="";
    return user;
}

export function getDefaultFieldsStateUser(){
    const user = getDefaultUser();
    user.currentPassword = ""; //extra field for applying changes
    return user;
}

//TODO ADD PROFILE PHOTO CHANGES
export function createUserForUpdate(immutableUser, fieldsStateUser, enableNotifications){
    const user = getDefaultUser();
    user.id = immutableUser.id;
    user.username = fieldsStateUser.username!==""? fieldsStateUser.username : immutableUser.username;
    user.password = fieldsStateUser.password!==""? fieldsStateUser.password : immutableUser.password;
    user.email = fieldsStateUser.email!==""? fieldsStateUser.email : immutableUser.email;

    if(enableNotifications)
        user.slackCredentials = fieldsStateUser.slackCredentials!==""? fieldsStateUser.slackCredentials : immutableUser.slackCredentials;
    else
        user.slackCredentials = "";

    //new values
    if(fieldsStateUser.username!=="")
        user.newUsername = fieldsStateUser.username;
    if(fieldsStateUser.email!=="")
        user.newEmail = fieldsStateUser.email;

    user.currentPassword=fieldsStateUser.currentPassword;
    //PROFILE-PHOTO
    return user;
}

export function createUserForCreate(user, enableNotifications) {
    if (!enableNotifications)
        user.slackCredentials = "";
    return user;
}

