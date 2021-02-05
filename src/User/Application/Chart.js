import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as ChartTooltip, XAxis, YAxis} from 'recharts';
import {MarketsInfo, MarketsRatingKeys} from "../../Helpers/MarketsInfoHelper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useChartStyles = makeStyles((theme) => ({
    chartStyle: {
        overflow: 'hidden',
        '& tspan': {
            fontSize:theme.typography.fontSize
        }
    },
    containerErrors: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    }
}));

export default function Chart(props) {
    const theme = useTheme();

    const chartClasses = useChartStyles(theme);

    if(!props.selectedMarkets.some(isSelected=>isSelected)){
        return (
            <Container className={chartClasses.containerErrors}>
                <Typography variant='subtitle1' color='primary'>
                    Выберите маркеты
                </Typography>
                <Typography variant='body2' color='inherit'>
                    Укажите хотя бы один маркет и нажмите кнопку показать, чтобы увидеть график
                </Typography>
            </Container>
        );
    }

    if(props.data && props.data.length===0){
        return (
            <Container maxWidth='md' className={chartClasses.containerErrors}>
                <Typography variant='subtitle1' color='primary'>
                    Нет оценок за выбранный период
                </Typography>
                <Typography variant='body2' color='inherit'>
                   Пользователи не оставили оценок или сервер еще не обновил данные
                </Typography>
            </Container>
        );
    }

    if(props.data===undefined){
        return (
            <Container maxWidth='md' className={chartClasses.containerErrors}>
                <Typography variant='subtitle1' color='error'>
                    Загрузка...
                </Typography>
                <Typography variant='body2' color='inherit'>
                    Идет загрузка графика
                </Typography>
            </Container>
        );
    }

    {/*todo chart error message*/}

    return (
        <ResponsiveContainer height={300}>
            {props.data &&
            <LineChart
                className={chartClasses.containerChart}
                data={props.data}
                margin={{
                    top: theme.spacing(1),
                    left: theme.spacing(0),
                    right: theme.spacing(3),
                    bottom: theme.spacing(0)
                }}
            >
                <CartesianGrid vertical={false}/>
                <XAxis dataKey="date" stroke={theme.palette.text.secondary}
                       padding={{left: theme.spacing(2), right: theme.spacing(2)}}/>
                <YAxis allowDecimals stroke={theme.palette.text.secondary} domain={['auto', 'auto']}
                       padding={{bottom: theme.spacing(2)}}
                       tickCount={5}/>

                <ChartTooltip/>
                {/* todo OPTION epic charts animation can be turned on */}
                {props.selectedMarkets.map((selectedMarket, index) => {
                    return selectedMarket &&
                        <Line key={index}
                              isAnimationActive={false} type="monotone" dataKey={MarketsRatingKeys[index]}
                              name={MarketsInfo[index].name}
                              stroke={MarketsInfo[index].getChartColor(theme)}/>
                })
                }
            </LineChart>
            }
        </ResponsiveContainer>
    );
}
