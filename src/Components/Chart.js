import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as ChartTooltip, XAxis, YAxis} from 'recharts';
import {MarketsInfo, MarketsRatingKeys} from "../Helpers/MarketsInfoHelper";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";

const useChartStyles = makeStyles((theme) => ({
    chartStyle: {
        overflow: 'hidden',
        '& tspan': {
            fontSize: theme.typography.fontSize
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

Chart.defaultProps = {
    selectedMarkets: [false, false],
    data: [],
    isAnimationActive: false
}

export default function Chart(props) {
    const theme = useTheme();
    const chartClasses = useChartStyles(theme);
    const [errorAlert, setErrorAlert] = React.useState({title: "", text: ""});

    function processErrors() {
        let error = {title: "", text: ""};
        if (!props.selectedMarkets.some(isSelected => isSelected)) {
            error.title = "Выберите маркеты";
            error.text = "Укажите хотя бы один маркет и нажмите кнопку показать, чтобы увидеть график";
        } else if (props.data && props.data.length === 0) {
            error.title = "Нет оценок за выбранный период";
            error.text = "Пользователи не оставили оценок или сервер еще не обновил данные";
        } else if (props.data === undefined) {
            error.title = "Загрузка...";
            error.text = "Идет загрузка графика";
        }
        setErrorAlert(error);
    }

    useEffect(() => {
        processErrors();
    }, [props.selectedMarkets, props.data]);

    if (errorAlert.title !== "" && errorAlert.text !== "") {
        return (
            <Container maxWidth="md" className={chartClasses.containerErrors}>
                <Alert severity="info">
                    <AlertTitle>{errorAlert.title}</AlertTitle>
                    {errorAlert.text}
                </Alert>
            </Container>
        );
    }

    return (
        <ResponsiveContainer height={300}>
            {props.data &&
            <LineChart
                data={props.data}
                margin={{
                    top: theme.spacing(1),
                    left: theme.spacing(0),
                    right: theme.spacing(3),
                    bottom: theme.spacing(0)
                }}>
                <CartesianGrid vertical={false}/>
                <XAxis dataKey="date" stroke={theme.palette.text.secondary}
                       padding={{left: theme.spacing(2), right: theme.spacing(2)}}/>
                <YAxis allowDecimals stroke={theme.palette.text.secondary} domain={['auto', 'auto']}
                       padding={{bottom: theme.spacing(2)}}
                       tickCount={5}/>
                <ChartTooltip/>
                {props.selectedMarkets.map((selectedMarket, index) => {
                    return selectedMarket &&
                        <Line key={index}
                              isAnimationActive={props.isAnimationActive} type="monotone"
                              dataKey={MarketsRatingKeys[index]}
                              name={MarketsInfo[index].name}
                              stroke={MarketsInfo[index].getChartColor(theme)}/>
                })
                }
            </LineChart>
            }
        </ResponsiveContainer>
    );
}
