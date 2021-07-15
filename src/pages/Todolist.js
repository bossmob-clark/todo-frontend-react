import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";

import './Todolist.css';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.default
    },
    paperTitle: {
        margin: 0,
        paddingBottom: theme.spacing(1),
    },
    containerAddBtn: {
        textAlign: "right"
    }
}));

function Todolist() {
    const history = useHistory();

    const [addAlertDatas, setOpenAddAlert] = React.useState({
        open: false,
        title: '',
        openState: '',
    });

    const [inputs, setInputs] = useState({
        addMsg: '',
    });

    const {addMsg} = inputs;

    const onChangeTodolistInput = (e) => {
        const {name, value} = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        }

        setInputs(nextInputs)
    }

    const currId = sessionStorage.getItem('currId');
    if (!currId) {
        history.push('/login');
    }

    let savedData = localStorage.getItem(`todo_${currId}`);
    if (savedData === undefined || savedData === null || savedData.length === 0) {
        savedData = [];
    } else {
        savedData = JSON.parse(savedData);
    }

    let [todoDatas, todoDatasChange] = useState(savedData);

    function handleAddBtn(_state) {
        setOpenAddAlert({
            open: true,
            title: `Add ${_state}`,
            openState: _state,
        });
    }

    const handleCloseAddAlert = () => {
        // TODO : 유효성 검사

        const now = new Date();

        const addData = [
            ...todoDatas,
            {
                msg: inputs.addMsg,
                date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`,
                state: addAlertDatas.openState,
            }
        ];

        todoDatasChange(addData);

        localStorage.setItem(`todo_${currId}`, JSON.stringify(addData))

        setOpenAddAlert({
            open: false
        });
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper variant={'outlined'} className={classes.paper}>
                        <h4 className={classes.paperTitle}>TODO</h4>

                        {todoDatas.filter(todo => todo.state === 'TODO').map((todoData, idx) => (
                            <TodoListItem data={todoData}/>
                        ))}

                        <div className={classes.containerAddBtn}>
                            <Button color={"primary"} onClick={() => handleAddBtn('TODO')}>Add</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper variant={'outlined'} className={classes.paper}>
                        <h4 className={classes.paperTitle}>DOING</h4>

                        {todoDatas.filter(todo => todo.state === 'DOING').map((todoData, idx) => (
                            <TodoListItem data={todoData}/>
                        ))}

                        <div className={classes.containerAddBtn}>
                            <Button color={"primary"} onClick={() => handleAddBtn('DOING')}>Add</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper variant={'outlined'} className={classes.paper}>
                        <h4 className={classes.paperTitle}>WAITING</h4>

                        {todoDatas.filter(todo => todo.state === 'WAITING').map((todoData, idx) => (
                            <TodoListItem data={todoData}/>
                        ))}

                        <div className={classes.containerAddBtn}>
                            <Button color={"primary"} onClick={() => handleAddBtn('WAITING')}>Add</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper variant={'outlined'} className={classes.paper}>
                        <h4 className={classes.paperTitle}>DONE</h4>

                        {todoDatas.filter(todo => todo.state === 'DONE').map((todoData, idx) => (
                            <TodoListItem data={todoData}/>
                        ))}

                        <div className={classes.containerAddBtn}>
                            <Button color={"primary"} onClick={() => handleAddBtn('DONE')}>Add</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog
                open={addAlertDatas.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddAlert}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{addAlertDatas.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="message"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        onChange={onChangeTodolistInput}
                        name={"addMsg"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddAlert} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function TodoListItem(props) {
    return (
        <Card className={"mb-10"}>
            <CardContent>
                <div className={"text-right"}>
                    <IconButton aria-label="delete" size={"small"}>
                        <Delete/>
                    </IconButton>
                </div>
                <Typography variant="h5" component="h2">
                    {props.data.msg}
                </Typography>
                <Typography color="textSecondary" component="p" align={"right"}>
                    {props.data.date}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="primary" size="small">Change state</Button>
            </CardActions>
        </Card>
    );
}

export default Todolist;