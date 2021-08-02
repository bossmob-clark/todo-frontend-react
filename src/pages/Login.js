import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './Login.css';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useHistory} from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import {makeStyles} from '@material-ui/core/styles';
import {LOGIN} from "../context/actionTypes";
import {useUserDispatch, useUserState} from "../context";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    btnContainer: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useUserDispatch();
    const { userList } = useUserState();

    const [loginAlertDatas, setOpenLoginAlert] = React.useState({
        open: false,
        title: '',
        msg: ''
    });

    const handleCloseLoginAlert = () => {
        setOpenLoginAlert({
            open: false
        });
    }

    const [inputs, setInputs] = useState({
        id: '',
        pw: ''
    });

    const {id, pw} = inputs;

    const onChangeLoginInput = (e) => {
        const {name, value} = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        }

        setInputs(nextInputs)
    }

    function handleLoginClick() {
        console.log("userList");
        console.log(userList);

        if (inputs.id.length === 0) {
            setOpenLoginAlert({
                open: true,
                title: '로그인 실패',
                msg: 'ID를 입력해주세요.'
            });
            return;
        }

        if (inputs.pw.length === 0) {
            setOpenLoginAlert({
                open: true,
                title: '로그인 실패',
                msg: '비밀번호를 입력해주세요.'
            });
            return;
        }

        const matchUsers = userList.filter(user => user.id === inputs.id);
        console.log("matchUsers");
        console.log(matchUsers);
        if (matchUsers.length > 0) {
            if (matchUsers[0].pw === inputs.pw) {
                dispatch({
                    type: LOGIN,
                    userId: inputs.id,
                });
                history.push('/todolist');
            } else {
                setOpenLoginAlert({
                    open: true,
                    title: '로그인 실패',
                    msg: '비밀번호가 다릅니다.'
                });
            }
        } else {
            setOpenLoginAlert({
                open: true,
                title: '로그인 실패',
                msg: 'ID가 없어용'
            });
        }
    }

    function handleSignupClick() {
        history.push('/signup');
    }

    return (
        <div>
            <Container maxWidth={"sm"} className="text-center">
                <h2>Login</h2>
                <br></br>
                <form>
                    <TextField label={"id"} onChange={onChangeLoginInput} name={"id"} value={id}></TextField>
                    <br></br>
                    <TextField label={"password"} type={"password"} onChange={onChangeLoginInput} name={"pw"}
                               value={pw}></TextField>
                </form>
                <br></br>

                <div className={classes.btnContainer}>
                    <Button variant={"contained"} color={"primary"} onClick={handleLoginClick}>Login</Button>
                    <Button variant={"outlined"} color={"primary"} onClick={handleSignupClick}>SignUp</Button>
                </div>
            </Container>

            <Dialog
                open={loginAlertDatas.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseLoginAlert}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{loginAlertDatas.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {loginAlertDatas.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLoginAlert} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Login;