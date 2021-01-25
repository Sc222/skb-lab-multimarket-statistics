import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as ChartTooltip, XAxis, YAxis} from 'recharts';
import {MarketsInfo, MarketsKeys} from "../../Helpers/MarketsInfoHelper";

const useChartStyles = makeStyles(() => ({
    disableScroll: {
        overflow: 'hidden'
    }
}));

export default function Chart(props) {
    const theme = useTheme();

    const chartClasses = useChartStyles();

    return (
        <ResponsiveContainer height={300}>
            {props.data &&
            <LineChart
                className={chartClasses.disableScroll}
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
                <YAxis allowDecimals stroke={theme.palette.text.secondary} domain={['auto', 'auto']} tickCount={5}/>

                <ChartTooltip/>
                {/* todo OPTION epic charts animation can be turned on */}
                {props.selectedMarkets.map((selectedMarket,index)=>
                { return selectedMarket &&
                    <Line isAnimationActive={false} type="monotone" dataKey={MarketsKeys[index]} name={MarketsInfo[index].name}
                          stroke={MarketsInfo[index].getChartColor(theme)}/>
                })
                }
            </LineChart>
            }
        </ResponsiveContainer>
    );
}
