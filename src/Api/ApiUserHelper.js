export function getDefaultUser(){
    return {id:"",username:"",password:"",email:"",slackCredentials:""};
}

export function getDefaultFieldsStateUser(){
    const user = getDefaultUser();
    user.currentPassword = ""; //extra field for applying changes
    return user;
}

//TODO ADD CURRENT PASSWORD AFTER NEOEZOP UPDATE
//TODO ADD PROFILE PHOTO CHANGES
//TODO !!! IGNORE PASSWORD IN REQUEST IF IT IS EMPTY
export function createNewUser(immutableUser, fieldsStateUser, enableNotifications){
    const user = getDefaultUser();
    user.id = immutableUser.id;
    user.username = fieldsStateUser.username!==""? fieldsStateUser.username : immutableUser.username;
    user.password = fieldsStateUser.password!==""? fieldsStateUser.password : immutableUser.password;
    user.email = fieldsStateUser.email!==""? fieldsStateUser.email : immutableUser.email;
    if(enableNotifications)
        user.slackCredentials = fieldsStateUser.slackCredentials!==""? fieldsStateUser.slackCredentials : immutableUser.slackCredentials;
    else
        user.slackCredentials = "";
    //user.currentPassword=fieldsStateUser.currentPassword
    //PROFILE-PHOTO
    return user;
}
