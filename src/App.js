import "./App.css";
import Homepage from "./Homepage";
import React from "react";
import {BrowserRouter, Route, Switch as RouteSwitch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormSections from "./Forms/FormSections";
import UserSection from "./User/UserSection";

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
                    <Route path={`${HomepageUrl}/(login|register)/`} component={FormSections}/>
                    {/* TODO: PASSWORD-RESET IN DEVELOPMENT
                     <Route path={`${HomepageUrl}/(login|register|password-reset)/`} component={FormSections}/>
                    }

                    {/* todo render 404 not found page*/}
                </RouteSwitch>
            </BrowserRouter>
        </React.StrictMode>
    );
}