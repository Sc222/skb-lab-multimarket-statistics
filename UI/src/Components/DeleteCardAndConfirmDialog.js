import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
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

DeleteCardAndConfirmDialog.defaultProps = {
    cardTitle: "Удаление данных",
    cardSubtitle: "Удаление данных без возможности восстановления",
    buttonTitle: "Удалить данные",
    dialogTitle: "Вы точно уверены?",
    dialogDescriptionComponent: () => <>
        <Typography>
            Это действие невозможно отменить.<br/>
            Будут навсегда удалены все данные.
        </Typography>
    </>,
    confirmFieldLabel: "Название данных",
    confirmFieldExpectedValue: "Название",
    handleDeleteButton: () => console.log("Удаление данных")
}

export default function DeleteCardAndConfirmDialog(props) {
    const classes = useStyles();
    const DialogDescription = props.dialogDescriptionComponent;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [confirmFieldValue, setConfirmFieldValue] = React.useState("");

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmFieldInput = (event) => {
        setConfirmFieldValue(event.target.value);
    };

    function isDeleteAllowed() {
        return confirmFieldValue !== props.confirmFieldExpectedValue;
    }

    return (
        <>
            <Paper elevation={1} className={classes.paper}>
                <div className={classes.container}>
                    <Typography variant='h6'>
                        {props.cardTitle}
                    </Typography>
                    <Typography variant='body2'>
                        {props.cardSubtitle}
                    </Typography>
                </div>
                <Divider className={classes.fullWidthDivider}/>
                <Container maxWidth='sm' className={classes.containerNotCentered}>
                    <Box mt={1}>
                        <Alert severity="error">
                            Действие невозможно отменить, все данные будут утеряны
                        </Alert>
                        <Box mt={1.5}>
                            <Button
                                onClick={() => setDialogOpen(true)}
                                disableElevation
                                size='small'
                                variant="outlined"
                                color="secondary">
                                {props.buttonTitle}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Paper>

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth='xs'>
                <DialogTitle>{props.dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <DialogDescription/>
                    </DialogContentText>
                    <TextField
                        value={confirmFieldValue}
                        onChange={handleConfirmFieldInput}
                        autoFocus
                        variant='outlined'
                        margin="dense"
                        id="confirm-delete"
                        label={props.confirmFieldLabel}
                        fullWidth/>
                    <Typography
                        variant='caption'
                        color='textPrimary'>
                        Пожалуйста введите <Box color='primary.main' component='span'
                                                fontWeight="fontWeightBold">{props.confirmFieldExpectedValue}</Box> для
                        удаления данных.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={props.handleDeleteButton} disabled={isDeleteAllowed()} color="secondary"
                            disableElevation variant='contained'>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}