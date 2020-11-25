import './Homepage.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "./App";
import React from "react";
import {MoodRounded} from "@material-ui/icons";

function Homepage() {
    const DemoSections = [
        {link: `${HomepageUrl}/register`, title: 'Регистрация'},
        {link: `${HomepageUrl}/login`, title: 'Вход'},
        {link: `${HomepageUrl}/password-reset`, title: 'Сброс пароля'},
        {link: `${HomepageUrl}/user/refusedguy/apps`, title: 'Пользователь без приложений (refusedguy)'},
        {link: `${HomepageUrl}/user/sc222/profile`, title: 'Профиль пользователя (refusedguy) (еще не реализовано)'},
        {link: `${HomepageUrl}/user/sc222/apps`, title: 'Пользователь с приложениями (sc222)'},
        {link: `${HomepageUrl}/user/sc222/profile`, title: 'Профиль пользователя (sc222) (еще не реализовано)'},
        {link: `${HomepageUrl}/user/sc222/new-app`, title: 'Добавить приложение (sc222) (карточки маркетов пока статичны)'},
        {
            link: `${HomepageUrl}/user/sc222/app/pixel-fishing/dashboard`,
            title: 'Панель управления (sc222, pixel-fishing) (доделать боковое меню)'
        },
        {
            link: `${HomepageUrl}/user/sc222/app/pixel-fishing/settings`,
            title: 'Настройки приложения (sc222, pixel-fishing) (доделать боковое меню)'
        },
    ];

    return (
        <div className="root">
            <MoodRounded className="App-logo" alt="temporary logo" style={{color: '#61dafb'}}/>
            <Typography variant='h5'>
                Здесь будет домашняя страница сайта
            </Typography>
            <Typography variant='subtitle1'>
                (Landing с информацией о программе, меню входа и прочим)
            </Typography>
            <Typography variant='subtitle2'>
                Разделы сайта (пока демо без сервера и темы + без редиректов по неверным ссылкам):
            </Typography>
            <Typography variant='subtitle2'>
                TODO: <br/>
                - profile / notification POPOVER <br/>
                - profile setup section <br/>
                - app dashboard menu + cards <br/>
                - app settings menu + cards <br/>
            </Typography>
            <List dense style={{color: '#61dafb'}}>
                {DemoSections.map(
                    section => {
                        return (<ListItem
                            key={section.link}
                            button
                            component={RouterLink}
                            rel='noreferrer'
                            target="_blank"
                            to={section.link}
                        >
                            <ListItemText primary={section.title}/>
                        </ListItem>)
                    }
                )}
            </List>
        </div>
    );
}

export default Homepage;
