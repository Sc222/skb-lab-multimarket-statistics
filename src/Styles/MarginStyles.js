import {makeStyles} from "@material-ui/core/styles";

export const useMarginStyles = makeStyles((theme) => MarginStyles(theme));

function MarginStyles(theme) {
    return {
        m05X:{
            marginLeft: `${theme.spacing(0.5)}px !important`,
            marginRight: `${theme.spacing(0.5)}px !important`
        },
        m05R:{
            marginRight: `${theme.spacing(0.5)}px !important`
        },
        m1: {
            marginTop: `${theme.spacing(1)}px !important`,
            marginBottom: `${theme.spacing(1)}px !important`,
            marginLeft: `${theme.spacing(1)}px !important`,
            marginRight: `${theme.spacing(1)}px !important`
        },
        m1Y: {
            marginTop: `${theme.spacing(1)}px !important`,
            marginBottom: `${theme.spacing(1)}px !important`,
        },
        m1T: {
            marginTop: `${theme.spacing(1)}px !important`,
        },
        m1L: {
            marginLeft: `${theme.spacing(1)}px !important`,
        },
        m1B: {
            marginBottom: `${theme.spacing(1)}px !important`
        },
        m1Xneg: {
            marginLeft: `${-theme.spacing(1)}px !important`,
            marginRight: `${-theme.spacing(2)}px !important`
        },
        m2T: {
            marginTop: `${theme.spacing(2)}px !important`
        },
        m2L: {
            marginLeft: `${theme.spacing(2)}px !important`
        },
        m3T: {
            marginTop: `${theme.spacing(3)}px !important`
        },
        m3Y: {
            marginTop: `${theme.spacing(3)}px !important`,
            marginBottom: `${theme.spacing(3)}px !important`
        },
        m3X: {
            marginLeft: `${theme.spacing(3)}px !important`,
            marginRight: `${theme.spacing(3)}px !important`
        },
        m3: {
            marginTop: `${theme.spacing(3)}px !important`,
            marginBottom: `${theme.spacing(3)}px !important`,
            marginLeft: `${theme.spacing(3)}px !important`,
            marginRight: `${theme.spacing(3)}px !important`
        },
    };
}
