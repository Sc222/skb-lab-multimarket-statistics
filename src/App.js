import "./App.css";
import ApplicationDashboard from "./Dashboard/ApplicationDashboard";
import Homepage from "./Homepage";
import React from "react";
import {BrowserRouter, Route, Switch as RouteSwitch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormSections from "./Forms/FormSections";
import UserSection from "./User/UserSection";

//site is hosted on gh pages, so there is additional nesting in url, normally should be /
export const HomepageUrl = 'skb-lab-multimarket-statistics';

export default function App() {

    return (
        <React.StrictMode>
            <CssBaseline/>
            <BrowserRouter>
                <RouteSwitch>
                    <Route exact path={`/${HomepageUrl}/`}>
                        {/* TODO LANDING PAGE WITH LOGIN FORM ON TOP (LIKE GITHUB)*/}
                        <Homepage/>
                    </Route>

                    {/* todo pass 99 as link argument*/}
                    <Route path={`/${HomepageUrl}/user/:username/`} component={UserSection}/>

                    <Route path={`/${HomepageUrl}/(login|register|password-reset)/`}>
                        <FormSections/>
                    </Route>

                    {/* todo render 404 not found page*/}

                </RouteSwitch>
            </BrowserRouter>
        </React.StrictMode>
    );
}