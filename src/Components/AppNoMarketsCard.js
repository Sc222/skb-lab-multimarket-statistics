import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


//image imports
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {HomepageUrl} from "../App";

const useStyles = makeStyles((theme) => ({

    paper: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%'
    },

    paperContainer: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        width: '100%'
    },

    coloredText: {
        color: theme.palette.primary.light
    }
}));

export default function AppNoMarketsCard(props) {
    const classes = useStyles();

    return (
        <>
            {props.isShown &&
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <div className={classes.paperContainer}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Не указаны магазины приложений
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Зайдите в раздел <Link component={RouterLink}
                                                      to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/settings`}>настройки</Link> для
                            того, чтобы указать маркеты, где приложение опубликовано.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            В противном случае не удастся посмотреть <i><span className={classes.coloredText}>график изменения средней оценки</span></i> и <i><span
                            className={classes.coloredText}>новые отзывы на приложение</span></i>.
                        </Typography>
                    </div>
                </Paper>
            </Grid>}
        </>);
}
