import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from '@material-ui/lab';

export default class StatusAlert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAlertOpen: false,
            alertMessage: "",
            severity: "success"
        };
    }

    show(message, severity) {
        this.setState({alertMessage: message});
        this.setState({severity: severity});
        this.setState({isAlertOpen: true});
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({isAlertOpen: false});
    };

    render() {
        return (
            <Snackbar open={this.state.isAlertOpen} autoHideDuration={1000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity={this.state.severity}>
                    {this.state.alertMessage}
                </Alert>
            </Snackbar>
        );
    }
}