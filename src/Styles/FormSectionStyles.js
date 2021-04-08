import {makeStyles} from "@material-ui/core/styles";

export const useFormSectionStyles = makeStyles((theme) => FormSectionStyles(theme));

function FormSectionStyles(theme) {
    return {
        //todo create new theme with theme.mixins.toolbar height set to 48 ALWAYS (dense toolbar breaks spacer)
        appBarSpacer: {
            height: '48px'
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
        },
        fullWidthDivider: {
            width: '100%',
            marginTop: `${theme.spacing(1)}px !important`,
            marginBottom: `${theme.spacing(0.5)}px !important`
        },
        paper: {
            marginTop: `${theme.spacing(2)}px !important`,
            marginBottom: `${theme.spacing(2)}px !important`,
            paddingTop: `${theme.spacing(1.5)}px !important`,
            paddingBottom: `${theme.spacing(1.5)}px !important`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        container: {
            paddingLeft: `${theme.spacing(2)}px !important`,
            paddingRight: `${theme.spacing(2)}px !important`,
            width: '100%'
        },
        containerWithYPadding: {
            paddingTop: `${theme.spacing(2)}px !important`,
            paddingBottom: `${theme.spacing(2)}px !important`,
            paddingLeft: `${theme.spacing(2)}px !important`,
            paddingRight: `${theme.spacing(2)}px !important`,
            width: '100%'
        },
        cardContainer: {
            width: '100%'
        },
        buttonGrid: {
            marginTop: `${theme.spacing(1)}px !important`
        }
    };
}