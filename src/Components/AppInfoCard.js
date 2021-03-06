import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import defaultAppIcon from "../images/default_app_icon.png";
import {createLinkFromId, MarketsIndexes, MarketsInfo} from "../Helpers/MarketsInfoHelper";
import {getMarketIdByStoreIndex} from "../Api/Helpers/ApiAppHelper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {useFormSectionStyles} from "../Styles/FormSectionStyles";
import {useMarketChipStyles} from "../Styles/MarketChipStyles";

const useStyles = makeStyles((theme) => ({
    paperNoPadding: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%',
    },
    containerTopPadded: {
        flexGrow: 1,
        textAlign: "left",
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%'
    },
    appDescriptionContainer: {
        flexGrow: 1,
        textAlign: "left",
        color: theme.palette.text.primary,
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        paddingBottom: theme.spacing(1),
        width: '100%'
    },
    applicationIcon: {
        borderRadius: "1.5em",
        maxWidth: "100%",
        maxHeight: '100%'
    },
    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
    },
}));

AppInfoCard.defaultProps = {
    app: undefined,
    iconGridMd: 1,
}

export default function AppInfoCard(props) {
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    return (
        <Paper className={classes.paperNoPadding} elevation={1}>
            <div className={classes.containerTopPadded}>
                <Typography variant="h6">
                    Информация о приложении
                </Typography>
                <Typography variant="body2">
                    Текущая информация о приложении
                </Typography>
            </div>
            <Divider className={formClasses.fullWidthDivider}/>
            <div className={classes.appDescriptionContainer}>

                <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={3} sm={2} md={props.iconGridMd}>
                        <img alt='app icon'
                             src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                             className={classes.applicationIcon}/>
                    </Grid>
                    <Grid item xs={9} sm={10} md={12 - props.iconGridMd}>
                        <Typography component="h5" variant="h6">{props.app.name}</Typography>
                        <Typography component="p" variant="body1">
                            {props.app.description}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider className={classes.fullWidthDivider}/>
            <div className={marketClasses.marketsContainer}>
                {
                    MarketsIndexes.map(marketIndex => {
                        let marketId = getMarketIdByStoreIndex(props.app, marketIndex);
                        return <Chip key={marketIndex}
                                     variant="outlined"
                                     clickable
                                     component='a'
                                     label={MarketsInfo[marketIndex].name}
                                     href={createLinkFromId(marketIndex, marketId)}
                                     target="_blank"
                                     rel='noreferrer'
                                     disabled={marketId === undefined}
                                     color={marketId === undefined ? "default" : "primary"}
                                     avatar={<Avatar className={marketClasses.transparentBg}
                                                     variant='square'
                                                     src={MarketsInfo[marketIndex].getIcon(marketId === undefined)}/>}/>
                    })
                }
            </div>
        </Paper>
    );
}
