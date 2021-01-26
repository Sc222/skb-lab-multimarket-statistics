import "./App.css";
import Homepage from "./Homepage";
import React from "react";
import {BrowserRouter, Redirect, Route, Switch as RouteSwitch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormSections from "./Forms/FormSections";
import UserSection from "./User/UserSection";
import {getCookieToken, getCookieUserId} from "./Helpers/CookieHelper";

// for gh-pages it would be /skb-lab-multimarket-statistics
export const HomepageUrl = '';

export default function App() {

    return (
        <React.StrictMode>
            <CssBaseline/>
            <BrowserRouter>
                <RouteSwitch>
                    {/* TODO LANDING PAGE WITH LOGIN FORM ON TOP (LIKE GITHUB)*/}
                    <Route exact path={`${HomepageUrl}/`} component={Homepage}/>
                    <Route path={`${HomepageUrl}/user/:userId/`} component={UserSection}/>

                    {getCookieToken() !== "" && getCookieUserId() !== "" &&
                    <Redirect to={`${HomepageUrl}/user/${getCookieUserId()}/apps`}/>}

                    <Route path={`${HomepageUrl}/(login|register)/`} component={FormSections}/>

                    {/*TODO REDIRECT TO HOME IF NOT LOGGED IN AND REDIRECT TO DASHBOARD IF LOGGED IN*/}
                    {/*TODO REDIRECT TO 404 NOT FOUND PAGE*/}
                    <Redirect to={`${HomepageUrl}/`}/>

                    {/* TODO: PASSWORD-RESET IN DEVELOPMENT
                     <Route path={`${HomepageUrl}/(login|register|password-reset)/`} component={FormSections}/>
                    */}
                </RouteSwitch>
            </BrowserRouter>
        </React.StrictMode>
    );
}