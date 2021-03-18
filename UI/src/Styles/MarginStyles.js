import {makeStyles} from "@material-ui/core/styles";

export const useMarginStyles = makeStyles((theme) => MarginStyles(theme));

function MarginStyles(theme) {
    return {
        m05X:{
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5)
        },
        m05R:{
            marginRight: theme.spacing(0.5)
        },
        m1: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        m1Y: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        m1T: {
            marginTop: theme.spacing(1),
        },
        m1L: {
            marginLeft: theme.spacing(1),
        },
        m1B: {
            marginBottom: theme.spacing(1)
        },
        m1Xneg: {
            marginLeft: -theme.spacing(1),
            marginRight: -theme.spacing(1)
        },
        m2T: {
            marginTop: theme.spacing(2)
        },
        m2L: {
            marginLeft: theme.spacing(2)
        },
        m3T: {
            marginTop: theme.spacing(3)
        },
        m3Y: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        m3X: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3)
        },
        m3: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3)
        },
    };
}
