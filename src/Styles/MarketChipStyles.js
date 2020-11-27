export default function MarketChipStyles(theme) {
    return {
        transparentBg: {
            background: 'transparent !important'
        },
        marketsContainer: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(1.5),
            '& > *': {
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(0.5),
                marginRight: theme.spacing(0.5),
            },
            [theme.breakpoints.down('xs')]:
                {
                    paddingLeft: theme.spacing(0.25),
                    paddingRight: theme.spacing(0.25),
                    '& > *': {
                        marginLeft: theme.spacing(0.2),
                        marginRight: theme.spacing(0.2),
                    }
                }
        }
    };
}