import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import {
    ReviewFilterDateKey,
    ReviewFilterInfo,
    ReviewFilterRatingKey,
    ReviewFilterRatings,
    ReviewFilterTypes,
    ReviewFilterVersionKey
} from "../Helpers/MarketsInfoHelper";
import MenuItem from "@material-ui/core/MenuItem";
import DateTimePickerFromTo from "./DateTimePickerFromTo";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {useMarginStyles} from "../Styles/MarginStyles";
import clsx from "clsx";
import {UIDefaultValues} from "../Config";
import {AppVersionNullKey, AppVersionNullName} from "../Api/Helpers/ApiAppHelper";

const useStyles = makeStyles((theme) => ({
    selectStyle: {
        minWidth: '200px',
    },
    paper: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%'
    },
    fullWidthDivider: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
    },
    sectionMarginTop: {
        marginTop: theme.spacing(1)
    },
    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    },
    container: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%'
    },
}));

ReviewsFilterSelectDialog.defaultProps = {
    dialogOpen: false,
    setDialogOpen: (value) => console.log("specify setDialogOpen prop: " + value),
    filterTypes: ReviewFilterTypes(UIDefaultValues.reviewFilters),
    filterToEdit: UIDefaultValues.reviewFilterToEdit,
    filterVersions: [],
    filterRatings: ReviewFilterRatings,
    handleAddFilter: (filterType, filterValue) => console.log(`Добавление фильтра: ${filterType} ${filterValue}`)
}

export default function ReviewsFilterSelectDialog(props) {
    const classes = useStyles();
    const margins = useMarginStyles();

    const [selectedFilter, setSelectedFilter] = React.useState("");
    const [filterSelectedVersions, setFilterSelectedVersions] = React.useState([]);
    const [filterSelectedRatings, setFilterSelectedRatings] = React.useState([]);
    const [filterDateFrom, setFilterDateFrom] = React.useState(UIDefaultValues.dateTimePickerFrom());
    const [filterDateTo, setFilterDateTo] = React.useState(new Date());
    const [filterDateFromError, setFilterDateFromError] = React.useState('');
    const [filterDateToError, setFilterDateToError] = React.useState('');

    React.useEffect(() => {
        if (props.filterToEdit.key !== "") {
            setSelectedFilter(props.filterToEdit.key);
            setFilterToEditValue(props.filterToEdit);
        }
    }, [props.filterToEdit]);

    function hasFilterDateErrors() {
        return !filterDateFrom || !filterDateTo ||
            filterDateFromError + filterDateToError !== "";
    }

    const handleDialogClose = () => {
        props.setDialogOpen(false);
        resetLastFilter();
        setSelectedFilter("");
    };

    const handleAddButton = () => {
        props.handleAddFilter(selectedFilter, getFilterValue());
        handleDialogClose();
    };

    function setFilterToEditValue(filterToEdit) {
        switch (filterToEdit.key) {
            case ReviewFilterDateKey:
                setFilterDateFrom(filterToEdit.value.dateFrom);
                setFilterDateTo(filterToEdit.value.dateTo);
                break;
            case ReviewFilterVersionKey:
                setFilterSelectedVersions(filterToEdit.value);
                break;
            case ReviewFilterRatingKey:
                setFilterSelectedRatings(filterToEdit.value);
                break;
        }
    }

    function getFilterValue() {
        switch (selectedFilter) {
            case ReviewFilterDateKey:
                return {dateTo: filterDateTo, dateFrom: filterDateFrom};
            case ReviewFilterVersionKey:
                return filterSelectedVersions;
            case ReviewFilterRatingKey:
                return filterSelectedRatings;
            default:
                return undefined;
        }
    }

    function isAddProhibited() {
        switch (selectedFilter) {
            case ReviewFilterDateKey:
                return hasFilterDateErrors();
            case ReviewFilterVersionKey:
                return filterSelectedVersions.length === 0;
            case ReviewFilterRatingKey:
                return filterSelectedRatings.length === 0;
            default:
                return !selectedFilter;
        }
    }

    function resetLastFilter() {
        switch (selectedFilter) {
            case ReviewFilterDateKey:
                setFilterDateFrom(UIDefaultValues.dateTimePickerFrom());
                setFilterDateTo(new Date());
                break;
            case ReviewFilterVersionKey:
                setFilterSelectedVersions([]);
                break;
            case ReviewFilterRatingKey:
                setFilterSelectedRatings([]);
                break;
        }
    }

    const handleSelectedFilterChange = (event) => {
        resetLastFilter();
        setSelectedFilter(event.target.value);
    };

    const handleSelectedVersions = (event) => {
        setFilterSelectedVersions(event.target.value);
    };

    const handleSelectedRatings = (event) => {
        setFilterSelectedRatings(event.target.value.sort((r1, r2) => r1 > r2));
    };

    return (
        <Dialog open={props.dialogOpen} onClose={handleDialogClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                {props.filterToEdit.key !== "" ? "Редактирование фильтра" : "Добавление фильтра"}
            </DialogTitle>
            <DialogContent>
                <FormControl variant="outlined" className={clsx(classes.selectStyle, margins.m1)}>
                    <InputLabel id="filter-select-label">Тип фильтра</InputLabel>
                    <Select
                        value={selectedFilter}
                        onChange={handleSelectedFilterChange}
                        labelId="filter-select-label"
                        id="filter-select"
                        label="Тип фильтра"
                    >
                        {props.filterTypes.map(type =>
                            <MenuItem disabled={type.disabled} key={type.value} value={type.value}>
                                {type.name}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                {selectedFilter === ReviewFilterDateKey &&
                <DateTimePickerFromTo
                    dateFrom={filterDateFrom}
                    setDateFrom={setFilterDateFrom}
                    dateFromError={filterDateFromError}
                    setDateFromError={setFilterDateFromError}
                    dateTo={filterDateTo}
                    setDateTo={setFilterDateTo}
                    dateToError={filterDateToError}
                    setDateToError={setFilterDateToError}
                />
                }
                {selectedFilter === ReviewFilterVersionKey &&
                <FormControl variant="outlined" className={clsx(classes.selectStyle, margins.m1)}>
                    <InputLabel id="version-select-label">Версия</InputLabel>
                    <Select
                        multiple
                        labelId="version-select-label"
                        id="version-select"
                        renderValue={(selected) => ReviewFilterInfo[ReviewFilterVersionKey].getLabel(selected, props.filterVersions)}
                        label="Версия"
                        value={filterSelectedVersions}
                        onChange={handleSelectedVersions}
                    >
                        {props.filterVersions.map(version => (
                            <MenuItem key={version} value={version}>
                                <Checkbox checked={filterSelectedVersions.indexOf(version) > -1}/>
                                {version === AppVersionNullKey
                                    ? <ListItemText primary={AppVersionNullName}/>
                                    : <ListItemText primary={version}/>
                                }
                            </MenuItem>))
                        }
                    </Select>
                </FormControl>
                }
                {selectedFilter === ReviewFilterRatingKey &&
                <FormControl variant="outlined" className={clsx(classes.selectStyle, margins.m1)}>
                    <InputLabel id="rating-select-label">Оценка</InputLabel>
                    <Select
                        multiple
                        labelId="rating-select-label"
                        id="rating-select"
                        renderValue={(selected) => ReviewFilterInfo[ReviewFilterRatingKey].getLabel(selected)}
                        label="Оценка"
                        value={filterSelectedRatings}
                        onChange={handleSelectedRatings}
                    >
                        {props.filterRatings.map(rating => (
                            <MenuItem key={rating.value} value={rating.value}>
                                <Checkbox checked={filterSelectedRatings.indexOf(rating.value) > -1}/>
                                <ListItemText primary={rating.name}/>
                            </MenuItem>))
                        }
                    </Select>
                </FormControl>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleAddButton} disabled={isAddProhibited()} color="primary"
                        disableElevation variant='contained'>
                    {props.filterToEdit.key !== "" ? "Редактировать фильтр" : "Добавить фильтр"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}