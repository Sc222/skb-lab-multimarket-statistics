import {makeStyles} from "@material-ui/core/styles";

export const useMarginStyles = makeStyles((theme) => MarginStyles(theme));

function MarginStyles(theme) {
    return {
        m1: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
    };
}
