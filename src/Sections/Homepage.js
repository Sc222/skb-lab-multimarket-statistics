import './Homepage.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";
import React from "react";
import {MoodRounded} from "@material-ui/icons";

function Homepage() {
    const DemoSections = [
        {link: `${HomepageUrl}/register`, title: 'Регистрация'},
        {link: `${HomepageUrl}/login`, title: 'Вход'},
        {link: `${HomepageUrl}/password-reset`, title: 'Сброс пароля'},
        {link: `${HomepageUrl}/user/af19aef2-ddd0-42f6-8613-4685a50f35eb/apps`, title: 'Пользователь малый'},
        {link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/apps`, title: 'Пользователь большой'},
        {
            link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/profile`,
            title: 'Профиль пользователя большого'
        },
        {
            link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/new-app`,
            title: 'Добавить приложение'
        },
        {
            link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/app/614828b5-6f50-4d62-a011-d2b501a92629/dashboard`,
            title: 'Панель управления VK (bigUser)'
        },
        {
            link: `${HomepageUrl}/user/029c065-29b1-4897-8623-0f06301f5eaf/app/614828b5-6f50-4d62-a011-d2b501a92629/settings`,
            title: 'Настройки приложения VK (bigUser)'
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
            <Typography variant='caption' style={{color: '#61dafb'}}>
                smallUser : test
            </Typography>
            <Typography variant='caption' style={{color: '#61dafb'}}>
                bigUser : testPassword
            </Typography>
            <Typography variant='h6'>
                Разделы сайта:
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
