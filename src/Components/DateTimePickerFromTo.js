import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import {useMarginStyles} from "../Styles/MarginStyles";

DateTimePickerFromTo.defaultProps = {
    dateFrom: new Date(),
    setDateFrom: (date)=>console.log("specify setDateFrom prop: "+date),
    dateFromError: "",
    setDateFromError: (error)=>console.log("specify setDateFromError prop: "+error),
    dateTo: new Date(),
    setDateTo: (date)=>console.log("specify setDateTo prop: "+date),
    dateToError: "",
    setDateToError: (error)=>console.log("specify setDateToError prop: "+error),
    handleShowButton: () => console.log("Показать данные в указанном периоде")
}

export default function DateTimePickerFromTo(props){
    const theme = useTheme();//todo custom theme
    const margins = useMarginStyles(theme);

    const handleDateFromError = (error, _) => {
        props.setDateFromError(error);
    }

    const handleDateToError = (error, _) => {
        props.setDateToError(error);
    }

    const handleDateFromInput = (date) => {
        props.setDateFrom(date);
    };

    const handleDateToInput = (date) => {
        props.setDateTo(date);
    };

    return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={2} justify='flex-start' alignItems='stretch' className={margins.m1}>
                    <Grid item xs={7} sm={10} md={3}>
                        <KeyboardDateTimePicker
                            fullWidth
                            size="small"
                            disableFuture
                            value={props.dateFrom}
                            onChange={handleDateFromInput}
                            maxDate={props.dateTo}
                            onError={handleDateFromError}
                            error={!props.dateFrom || props.dateFromError !== ""}
                            helperText={!props.dateFrom
                                ? "Укажите начальную дату"
                                : props.dateFromError
                            }
                            format="dd/MM/yyyy HH:mm"
                            inputVariant="outlined"
                            ampm={false}
                            label="От"
                            id="date-picker-from"
                            variant="inline"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            invalidDateMessage='Неверный формат даты'
                            maxDateMessage='Дата не может быть позднее даты в поле «До»'
                        />
                    </Grid>
                    <Grid item xs={7} sm={10} md={3}>
                        <KeyboardDateTimePicker
                            fullWidth
                            size="small"
                            disableFuture
                            value={props.dateTo}
                            onChange={handleDateToInput}
                            minDate={props.dateFrom}
                            onError={handleDateToError}
                            error={!props.dateTo || props.dateToError !== ""}
                            helperText={! props.dateTo
                                ? "Укажите конечную дату"
                                : props.dateToError
                            }
                            format="dd/MM/yyyy HH:mm"
                            inputVariant="outlined"
                            ampm={false}
                            label="До"
                            id="date-picker-to"
                            variant="inline"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            invalidDateMessage='Неверный формат даты'
                            maxDateMessage='Дата не может быть позднее текущего времени'
                            minDateMessage='Дата не может быть раньше даты в поле «От»'
                        />
                    </Grid>
                    <Grid item xs={7} sm={8} md={4}>
                        <Button disableElevation variant="contained" color="primary" size='medium'
                                onClick={props.handleShowButton}>
                            Показать
                        </Button>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
    );
}