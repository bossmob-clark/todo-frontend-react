import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
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
import {useUserState} from "../context";

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
    const { user } = useUserState();

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

    const [editSerial, setEditSerial] = useState();

    const onChangeTodolistInput = (e) => {
        const {name, value} = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        }

        setInputs(nextInputs)
    }

    if (!user || !user.userId) {
        history.push('/login');
    }

    let savedData = localStorage.getItem(`todo_${user.userId}`);
    if (savedData === undefined || savedData === null || savedData.length === 0) {
        savedData = [];
    } else {
        savedData = JSON.parse(savedData);
    }

    let [todoDatas, todoDatasChange] = useState(savedData);

    function saveLocalstorage(_todoDatas) {
        localStorage.setItem(`todo_${user.userId}`, JSON.stringify(_todoDatas));
    }

    function handleAddBtn(_state) {
        setOpenAddAlert({
            open: true,
            title: `Add ${_state}`,
            openState: _state,
        });
    }

    const convertDateToStr = (_date) => {
        return `${_date.getFullYear()}.${_date.getMonth() + 1}.${_date.getDate()} ${_date.getHours()}:${_date.getMinutes()}`
    }

    const handleCloseAddAlert = () => {
        if (inputs.addMsg.length > 0) {
            const now = new Date();
            const serial = todoDatas.length + 1;

            const addData = [...todoDatas, {
                serial: serial,
                msg: inputs.addMsg,
                date: convertDateToStr(now),
                state: addAlertDatas.openState,
                mode: "show"
            }];

            todoDatasChange(addData);
            saveLocalstorage(addData);
        }

        setOpenAddAlert({
            open: false
        });
    }

    function handleDeleteBtn(_serial) {
        const delDatas = todoDatas.filter(data => data.serial !== _serial);
        todoDatasChange(delDatas);
        saveLocalstorage(delDatas);
    }

    function handleMsgClick(_serial) {
        setEditSerial(_serial);

        const datas = [...todoDatas];
        datas.map(data => {
            if (data.serial === _serial) {
                data.mode = 'edit';
            } else {
                data.mode = 'show';
            }
        });

        todoDatasChange(datas);
    }

    let mPressKeys = [];

    function handleMsgEditKeyDown(e) {
        mPressKeys.push(e.key);

        if (mPressKeys[0] === 'Enter') {
            handleMsgEdit(e.target.value);
            e.preventDefault();
        }
    }

    function handleMsgEditKeyUp(e) {
        const index = mPressKeys.findIndex((sKey) => sKey === e.key);
        mPressKeys = mPressKeys.slice(0, index);
    }

    function handleMsgEdit(_val) {
        const now = new Date();

        const editDatas = [...todoDatas];
        editDatas.map(data => {
            if (data.serial === editSerial) {
                data.msg = _val;
                data.mode = 'show';
                data.date = convertDateToStr(now);
            }
        });

        todoDatasChange(editDatas);
        saveLocalstorage(editDatas);
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <DrawTodoList
                    state={'TODO'}
                    datas={todoDatas}
                    handleDeleteBtn={handleDeleteBtn}
                    handleMsgClick={handleMsgClick}
                    handleMsgEditKeyDown={handleMsgEditKeyDown}
                    handleMsgEditKeyUp={handleMsgEditKeyUp}
                    handleAddBtn={handleAddBtn}
                />
                <DrawTodoList
                    state={'DOING'}
                    datas={todoDatas}
                    handleDeleteBtn={handleDeleteBtn}
                    handleMsgClick={handleMsgClick}
                    handleMsgEditKeyDown={handleMsgEditKeyDown}
                    handleMsgEditKeyUp={handleMsgEditKeyUp}
                    handleAddBtn={handleAddBtn}
                />
                <DrawTodoList
                    state={'WAITING'}
                    datas={todoDatas}
                    handleDeleteBtn={handleDeleteBtn}
                    handleMsgClick={handleMsgClick}
                    handleMsgEditKeyDown={handleMsgEditKeyDown}
                    handleMsgEditKeyUp={handleMsgEditKeyUp}
                    handleAddBtn={handleAddBtn}
                />
                <DrawTodoList
                    state={'DONE'}
                    datas={todoDatas}
                    handleDeleteBtn={handleDeleteBtn}
                    handleMsgClick={handleMsgClick}
                    handleMsgEditKeyDown={handleMsgEditKeyDown}
                    handleMsgEditKeyUp={handleMsgEditKeyUp}
                    handleAddBtn={handleAddBtn}
                />
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

function DrawTodoList(props) {
    const classes = useStyles();

    return (
        <Grid item xs>
            <Paper variant={'outlined'} className={classes.paper}>
                <h4 className={classes.paperTitle}>{props.state}</h4>

                {props.datas.filter(todo => todo.state === props.state).map((todoData, idx) => (
                    <TodoListItem
                        data={todoData}
                        handleDeleteBtn={props.handleDeleteBtn}
                        handleMsgClick={props.handleMsgClick}
                        handleMsgEditKeyDown={props.handleMsgEditKeyDown}
                        handleMsgEditKeyUp={props.handleMsgEditKeyUp}/>
                ))}

                <div className={classes.containerAddBtn}>
                    <Button color={"primary"} onClick={() => props.handleAddBtn(props.state)}>Add</Button>
                </div>
            </Paper>
        </Grid>
    );
}

function TodoListItem(props) {
    return (
        <Card className={"mb-10"}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant={"caption"} color="textSecondary">
                            {props.data.date}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={"text-right"}>
                            <IconButton aria-label="delete" size={"small"}
                                        onClick={() => props.handleDeleteBtn(props.data.serial)}>
                                <Delete/>
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>

                {props.data.mode === "show" &&
                <Typography variant="h5" component="h2" onClick={() => props.handleMsgClick(props.data.serial)}>
                    {props.data.msg}
                </Typography>
                }

                {props.data.mode === "edit" &&
                <TextField
                    id="filled-required"
                    label=""
                    defaultValue={props.data.msg}
                    variant="outlined"
                    multiline
                    onKeyDown={(e) => props.handleMsgEditKeyDown(e)}
                    onKeyUp={(e) => props.handleMsgEditKeyUp(e)}
                >
                </TextField>
                }

            </CardContent>
        </Card>
    );
}

export default Todolist;