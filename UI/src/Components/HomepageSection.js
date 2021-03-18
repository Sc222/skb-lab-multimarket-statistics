import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import {useMarginStyles} from "../Styles/MarginStyles";
import Grid from "@material-ui/core/Grid";
import {StarRounded} from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        display: "block",
        fontWeight: 400
    },
    textWithIcon: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
    },
    flexAlignEnd: {
        justifyContent: "flex-end"
    },
}));

HomepageSectionContent.defaultProps = {
    isLarge: false,
    isRightAligned: false,
    icon: StarRounded,
    title: "Title",
    subtitle: "Subtitle",
    extraContent: undefined,
    md: 7
}

function HomepageSectionContent(props) {
    const classes = useStyles();
    const margins = useMarginStyles();

    const Icon = props.icon;
    const ExtraContent = props.extraContent;

    const getTitleVariant = () => props.isLarge ? "h3" : "h4";
    const getSubtitleVariant = () => props.isLarge ? "h5" : "body1";
    const getTextAlignment = () => props.isRightAligned ? "right" : "left";
    const getTextWithIconClasses = () => props.isRightAligned
        ? clsx(classes.sectionTitle, margins.m1Y, classes.textWithIcon, classes.flexAlignEnd)
        : clsx(classes.sectionTitle, margins.m1Y, classes.textWithIcon);

    return (
        <Grid justify={props.isRightAligned ? "flex-end" : "flex-start"}
              container alignItems="center" spacing={0} className={margins.m3Y}>
            <Grid item xs={12} sm={12} md={props.md}>
                <Typography
                    variant={getTitleVariant()}
                    className={getTextWithIconClasses()}>
                    <Icon
                        className={margins.m05R}
                        fontSize="inherit"
                        color="primary"/>
                    {props.title}
                </Typography>
                {
                    props.subtitle.split('\n').map(line =>
                        <Typography
                            align={getTextAlignment()}
                            variant={getSubtitleVariant()}>{line}</Typography>
                    )
                }
                {props.extraContent && <ExtraContent/>}
            </Grid>
        </Grid>
    );
}

HomepageSection.defaultProps = {
    isRightAligned: false,
    icon: StarRounded,
    title: "Title",
    subtitle: "Subtitle",
    extraContent: undefined,
    md: 7
}

export default function HomepageSection(props) {
    return (
        <Container maxWidth="lg">
            <Hidden mdUp>
                <HomepageSectionContent
                    isRightAligned={false}
                    icon={props.icon}
                    title={props.title}
                    subtitle={props.subtitle}
                    extraContent={props.extraContent}
                    md={props.md}
                />
            </Hidden>
            <Hidden smDown>
                <HomepageSectionContent
                    isLarge
                    isRightAligned={props.isRightAligned}
                    icon={props.icon}
                    title={props.title}
                    subtitle={props.subtitle}
                    extraContent={props.extraContent}
                    md={props.md}
                />
            </Hidden>
        </Container>
    );
}
