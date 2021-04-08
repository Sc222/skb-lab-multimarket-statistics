import {makeStyles} from "@material-ui/core/styles";

export const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

function MarketChipStyles(theme) {
    return {
        marketAvatar: {
            width: theme.spacing(7),
            height: theme.spacing(7)
        },
        marketAvatarSmall: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            marginLeft: theme.spacing(-0.5)
        },
        transparentBg: {
            background: 'transparent !important'
        },
        iconMargin: {
            marginRight: theme.spacing(1)
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
                        marginRight: theme.spacing(0.2)
                    }
                }
        }
    };
}