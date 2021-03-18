import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";
import React, {useRef} from "react";
import Avatar from "@material-ui/core/Avatar";
import {useFormSectionStyles} from "../Styles/FormSectionStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ServiceNameAndLogo from "../Components/ServiceNameAndLogo";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {getCookieUserId, isUserLoggedIn} from "../Helpers/CookieHelper";
import IconButton from "@material-ui/core/IconButton";
import demoProfile from "../images/demo_profile.png";
import {makeStyles} from "@material-ui/core/styles";
import {useMarginStyles} from "../Styles/MarginStyles";
import clsx from "clsx";
import {MarketsIndexes, MarketsInfo} from "../Helpers/MarketsInfoHelper";
import Chip from "@material-ui/core/Chip";
import {useMarketChipStyles} from "../Styles/MarketChipStyles";
import {
    AccessibilityNewRounded,
    AccountTreeRounded,
    FlareRounded,
    LockOpenRounded,
    MoneyOffRounded
} from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";
import HomepageHero from "../Components/HomepageHero";
import HomepageSection from "../Components/HomepageSection";
import {Typography} from "@material-ui/core";
import StatusAlert from "../Components/StatusAlert";
import HomepageFooter from "../Components/HomepageFooter";

const useStyles = makeStyles((theme) => ({
    defaultBackground: {
        backgroundColor: theme.palette.background.default
    },
    profileIconButton: {
        marginLeft: theme.spacing(1.5),
        padding: 0
    },
    profileIcon: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5)
    },
    fluidIcon: {
        maxWidth: "100%",
        maxHeight: "100%"
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

function Homepage() {
    const statusAlert = useRef();

    const classes = useStyles();
    const margins = useMarginStyles();
    const marketClasses = useMarketChipStyles();
    const formClasses = useFormSectionStyles();

    const showStatusAlert = (message, severity) => {
        statusAlert.current?.show(message, severity);
    };

    return (
        <div>
            <AppBar className={classes.defaultBackground} elevation={0}>
                <Toolbar variant="dense">
                    <ServiceNameAndLogo fontColor="primary"/>
                </Toolbar>
                <Divider/>
            </AppBar>
            <main className={formClasses.content}>
                <HomepageHero/>
                <Divider/>
                <HomepageSection
                    md={12}
                    icon={AccessibilityNewRounded}
                    title={"Легкость запуска"}
                    subtitle={"Для развертывания всей системы достаточно выполнить всего три команды:"}
                    extraContent={
                        () => {
                            function Content(props) {
                                const getSubtitleVariant = () => props.isLarge ? "h6" : "body2";
                                const getButtonSize = () => props.isLarge ? "medium" : "small";
                                return (
                                    <div>
                                        <Typography variant={getSubtitleVariant()} noWrap className={margins.m1T}>
                                            <code>
                                                git clone https://github.com/Sc222/skb-lab-multimarket-statistics<br/>
                                                cd skb-lab-multimarket-statistics<br/>
                                                docker-compose up<br/>
                                            </code>
                                        </Typography>
                                        <Button
                                            className={margins.m2T}
                                            size={getButtonSize()}
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    "git clone https://github.com/Sc222/skb-lab-multimarket-statistics\n" +
                                                    "cd skb-lab-multimarket-statistics\n" +
                                                    "docker-compose up");
                                                showStatusAlert("Скопировано!", "success");
                                            }}>
                                            Копировать
                                        </Button>
                                    </div>);
                            }

                            return <>
                                <Hidden mdUp>
                                    <Content/>
                                </Hidden>
                                <Hidden smDown>
                                    <Content isLarge/>
                                </Hidden>
                            </>
                        }
                    }
                />
                <Divider/>
                <HomepageSection
                    isRightAligned
                    icon={FlareRounded}
                    title={"Широкий функционал"}
                    subtitle={"Сервис позволяет отслеживать множество информации у неограниченного количества приложений:\n" +
                    "график изменения оценок, текущая оценка приложения, отзывы приложения с возможностью их фильтрации.\n" +
                    "Также есть возможность отправлять уведомления в Slack."}
                />
                <Divider/>
                <HomepageSection
                    icon={AccountTreeRounded}
                    title={"Универсальность"}
                    subtitle={"Возможность просмотра в одном месте информации о приложениях, размещенных в данных маркетах:"}
                    extraContent={
                        () => <div className={clsx(marketClasses.marketsContainer, margins.m1Xneg)}>
                            {
                                MarketsIndexes.map(marketIndex => {
                                    return <Chip key={marketIndex}
                                                 variant="outlined"
                                                 clickable
                                                 component="a"
                                                 label={MarketsInfo[marketIndex].name}
                                                 href={MarketsInfo[marketIndex].homepage}
                                                 target="_blank"
                                                 rel="noreferrer"
                                                 color={"primary"}
                                                 avatar={<Avatar className={marketClasses.transparentBg}
                                                                 variant="square"
                                                                 src={MarketsInfo[marketIndex].getIcon(false)}/>}/>
                                })
                            }
                        </div>
                    }
                />
                <Divider/>
                <HomepageSection
                    isRightAligned
                    icon={LockOpenRounded}
                    title={"Никаких преград"}
                    subtitle={"Для получения данных о приложении некоторые маркеты требуют наличие токена.\n" +
                    "Данному сервису не нужно ничего кроме ссылки на приложение."}
                />
                <Divider/>
                <HomepageSection
                    icon={MoneyOffRounded}
                    title={"Абсолютно бесплатно"}
                    subtitle={"Система запускается на вашей машине, поэтому нам не нужно платить за хостинг\n" +
                    "и все предоставляется абсолютно бесплатно."}
                />
                <HomepageFooter showStatusAlert={showStatusAlert}/>
            </main>
            <StatusAlert ref={statusAlert}/>
        </div>
    );
}

export default Homepage;
