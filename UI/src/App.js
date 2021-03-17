import "./App.css";
import Homepage from "./Sections/Homepage";
import React from "react";
import {BrowserRouter, Redirect, Route, Switch as RouteSwitch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormsSection from "./Sections/Forms/FormsSection";
import UserSection from "./Sections/User/UserSection";

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
                    <Route path={`${HomepageUrl}/(login|register)`} component={FormsSection}/>
                    {/*TODO: PASSWORD-RESET IN DEVELOPMENT (login|register|password-reset)*/}

                    {/*redirect to home if no path matches*/}
                    <Redirect to={`${HomepageUrl}/`}/>
                </RouteSwitch>
            </BrowserRouter>
        </React.StrictMode>
    );
}