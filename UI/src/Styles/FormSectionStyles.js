export default function FormSectionStyles(theme) {
    return {
        //todo create new theme with theme.mixins.toolbar height set to 48 ALWAYS (dense toolbar breaks spacer)
        appBarSpacer: {
            height: '48px'
        },
        titleCentered: {
            flexGrow: 1,
            textAlign: "center"
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        fullWidthDivider: {
            width: '100%',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(0.5),
        },
        paper: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1.5),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        container: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            width: '100%'
        },

        containerWithYPadding:{
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            width: '100%'
        },

        cardContainer: {
            width: '100%'
        },
        buttonGrid: {
            marginTop: theme.spacing(1)
        }
    };
}