import {makeStyles} from "@material-ui/core/styles";

export const useMarginStyles = makeStyles((theme) => MarginStyles(theme));

function MarginStyles(theme) {
    return {
        m05X:{
            marginLeft: theme.spacing(0.5),
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

    };
}
