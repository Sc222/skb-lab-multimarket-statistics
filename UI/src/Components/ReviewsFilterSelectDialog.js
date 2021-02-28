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
    ReviewFilterRatingKey,
    ReviewFilterRatings,
    ReviewFilterTypes, ReviewFilterVersionKey
} from "../Helpers/MarketsInfoHelper";
import MenuItem from "@material-ui/core/MenuItem";
import DateTimePickerFromTo from "./DateTimePickerFromTo";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {useMarginStyles} from "../Styles/MarginStyles";
import clsx from "clsx";

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
    filterTypes: ReviewFilterTypes,
    filterVersions: [],
    filterRatings: ReviewFilterRatings,
    selectedVersions: [],
    selectedRatings: [],
    handleSelectedVersions: (event) => console.log("specify handleSelectedVersions prop: " + event.target.value),
    handleSelectedRatings: (event) => console.log("specify handleSelectedRatings prop: " + event.target.value),
    handleAddButton: () => console.log("Добавление фильтра")
}

export default function ReviewsFilterSelectDialog(props) {
    const classes = useStyles();
    const margins = useMarginStyles();

    const [selectedFilter, setSelectedFilter] = React.useState("");

    const handleDialogClose = () => {
        props.setDialogOpen(false);
    };

    //todo add add allow check
    function isAddProhibited() {
        return !selectedFilter;
    }

    const handleSelectedFilterChange = (event) => {
        const filter = event.target.value;
        setSelectedFilter(filter);
    };

    return (
        <Dialog open={props.dialogOpen} onClose={handleDialogClose} fullWidth maxWidth='sm'>
            <DialogTitle>Добавление фильтра</DialogTitle>
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
                        {/* TODO
                             value={reviewsSelectedMarket}
                             onChange={handleSelectedFilterChange}
                     */}
                        {props.filterTypes.map(type =>
                            <MenuItem disabled={type.disabled} key={type.value} value={type.value}>
                                {type.name}
                            </MenuItem>
                        )}
                        {/*props.app
                            && getAppMarketsArray(props.app)
                                .map(index =>
                                    <MenuItem key={index} value={MarketsRequestKeys[index]}>
                                        {MarketsInfo[index].name}
                                    </MenuItem>)
                            */}
                    </Select>
                </FormControl>
                {selectedFilter === ReviewFilterDateKey && <DateTimePickerFromTo/>}
                {/*TODO PROPS FOR DATETIMEPICKER*/}
                {selectedFilter === ReviewFilterVersionKey &&
                <FormControl variant="outlined" className={clsx(classes.selectStyle, margins.m1)}>
                    <InputLabel id="version-select-label">Версия</InputLabel>
                    <Select
                        multiple
                        labelId="version-select-label"
                        id="version-select"
                        renderValue={(selected) => selected.length === 0
                            ? "Любая"
                            : `Выбрано версий: ${selected.length}`}
                        label="Версия"
                        value={props.selectedVersions}
                        onChange={props.handleSelectedVersions}
                    >
                        {props.filterVersions.map(version =>(
                            <MenuItem key={version} value={version}>
                                <Checkbox checked={props.selectedVersions.indexOf(version) > -1}/>
                                <ListItemText primary={version}/>
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
                        renderValue={(selected) => selected.length === 0
                            ? "Любая"
                            : `Число звезд: ${selected.length}`}
                        label="Оценка"
                        value={props.selectedRatings}
                        onChange={props.handleSelectedRatings}
                    >
                        {props.filterRatings.map(rating =>(
                            <MenuItem key={rating.value} value={rating.value}>
                                <Checkbox checked={props.selectedRatings.indexOf(rating.value) > -1}/>
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
                <Button onClick={props.handleAddButton} disabled={isAddProhibited()} color="primary"
                        disableElevation variant='contained'>
                    Добавить фильтр
                </Button>
            </DialogActions>
        </Dialog>
    );
}