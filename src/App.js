import "./App.css";
import Homepage from "./Sections/Homepage";
import React from "react";
import {BrowserRouter, Redirect, Route, Switch as RouteSwitch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
export const HomepageUrl = '';

export default function App() {

    return (
        <React.StrictMode>
            <CssBaseline/>
            <BrowserRouter>
                <RouteSwitch>
                    {/* TODO LANDING PAGE WITH LOGIN FORM ON TOP (LIKE GITHUB)*/}
                    <Route exact path={`${HomepageUrl}/`} component={Homepage}/>
                    <Redirect to={`${HomepageUrl}/`}/>
                </RouteSwitch>
            </BrowserRouter>
        </React.StrictMode>
    );
}