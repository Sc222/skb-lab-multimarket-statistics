import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import {AppsRounded, ArrowDropDownRounded, ArrowRightRounded, SettingsRounded} from "@material-ui/icons";
import indigo from '@material-ui/core/colors/indigo';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    nestedItem: {
        paddingLeft: theme.spacing(6.5),
        color: theme.palette.action,
    },
    mainItem: {
        paddingLeft: theme.spacing(0),
    },
    mainItemSelected: {
        backgroundColor: "transparent !important",
        color: theme.palette.primary.main,
    },
    nestedItemSelected: {
        backgroundColor: `${indigo[50]} !important`, // todo use theme
        color: theme.palette.primary.main,
    }
}));

export default function DrawerMenu() {
    //todo toggle selected menu: 0,0 if dashboard, 1,0 if settings
    //todo add links for routing
    const classes = useStyles();
    const [isPanelOpened, setIsPanelOpened] = React.useState(false);
    const [isSettingsOpened, setIsSettingsOpened] = React.useState(false);
    const [selectedMain, setSelectedMain] = React.useState(-1);
    const [selectedNested, setSelectedNested] = React.useState(-1);

    const menusStates = [isPanelOpened, isSettingsOpened];
    const setMenusStates = [setIsPanelOpened, setIsSettingsOpened];
    const menus = [
        {
            title: 'Панель управления',
            icon: (<AppsRounded color={getMainItemColor(0)}/>),
            nested: ['Информация о приложении', 'Уведомления', 'Средняя оценка', 'Отзывы']
        },
        {
            title: 'Настройки',
            icon: (<SettingsRounded color={getMainItemColor(1)}/>),
            nested: ['Информация о приложении', 'Магазины приложений', 'Удалить приложение']
        }
    ];

    function isMainSelected(index) {
        return selectedMain === index;
    }

    function getMainItemColor(index) {
        return isMainSelected(index) ? "inherit" : "action";
    }

    function isNestedSelected(index, nestedIndex) {
        return selectedMain === index && selectedNested === nestedIndex;
    }

    function selectMenuItem(index, nestedIndex) {
        setSelectedMain(index);
        setSelectedNested(nestedIndex);
    }

    return (
        <List
            dense
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {menus.map((item, index) => {
                return (<Box>
                    <ListItem classes={{selected: classes.mainItemSelected}}
                              className={classes.mainItem}
                              selected={isMainSelected(index)}
                              onClick={() => setMenusStates[index].call(this, !menusStates[index])}
                              button
                    >
                        {menusStates[index]
                            ? <ArrowDropDownRounded color={getMainItemColor(index)}/>
                            : <ArrowRightRounded color={getMainItemColor(index)}/>
                        }
                        {item.icon}
                        <Box ml={0.5}>
                            <ListItemText primary={item.title} color={getMainItemColor(index)}/>
                        </Box>
                    </ListItem>
                    <Collapse in={menusStates[index]} timeout="auto" unmountOnExit>
                        <List dense component="div" disablePadding>
                            {item.nested.map((nestedElement, nestedIndex) => {
                                return (
                                    <ListItem className={classes.nestedItem}
                                              classes={{selected: classes.nestedItemSelected}}
                                              selected={isNestedSelected(index, nestedIndex)}
                                              onClick={() => selectMenuItem(index, nestedIndex)}
                                              button
                                    >
                                        <ListItemText primary={nestedElement}/>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Collapse>
                </Box>)
            })}
        </List>
    );
}