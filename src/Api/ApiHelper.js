export const ApiRoot="http://localhost:5000";
export const HttpStatusCodeLength = 3;
export const ErrorInternalServerErr = "500";
export const ErrorBadRequest = "400";
export const ErrorForbidden = "403";
export const ErrorConflict = "409";
export const NoContent = "204"; //treat as error if app does not exist for ex

//custom errors
export const ErrorNotUniqueEmail = "badEmail";
export const ErrorNotUniqueUsername = "badUsername";
export const ErrorNotUniqueUsernameAndEmail = "badUsernameAndEmail";