import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import {useMarginStyles} from "../Styles/MarginStyles";

const useStyles = makeStyles((theme) => ({
    textWithIcon: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    iconButtonMarginXShrink: {
        marginLeft: theme.spacing(-1.5),
        marginRight: theme.spacing(-1.5)
    }
}));

//todo PROPS DOCUMENTATION
//props: text, link, icon, maxLength
export default function AdaptiveBreadcrumbItem(props) {
    const classes = useStyles();
    const margins = useMarginStyles();
    const Icon = props.icon;

    function shortenText(text) {
        return text.length <= props.maxLength
            ? text
            : text.slice(0, props.maxLength) + "…";
    }

    return (
        <>
            <Hidden mdUp>
                {props.maxLength &&
                <Link
                    color={props.isSelected ? "primary" : "inherit"}
                    component={RouterLink}
                    to={props.link}
                    className={classes.textWithIcon}>
                    <Icon className={margins.m05R}/>
                    {shortenText(props.text)}
                </Link>
                }
                {!props.maxLength &&
                <IconButton
                    color={props.isSelected ? "primary" : "inherit"}
                    className={classes.iconButtonMarginXShrink}
                    aria-label={props.text}
                    component={RouterLink}
                    to={props.link}
                >
                    <Icon fontSize='inherit'/>
                </IconButton>
                }
            </Hidden>
            <Hidden smDown>
                <Link
                    color={props.isSelected ? "primary" : "inherit"}
                    component={RouterLink}
                    to={props.link}
                    className={classes.textWithIcon}>
                    <Icon className={margins.m05R}/>
                    {props.text}
                </Link>
            </Hidden>
        </>
    );
}
