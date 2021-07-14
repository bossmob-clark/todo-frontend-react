import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
    const history = useHistory();

    const [signupAlertDatas, setOpenSignupAlert] = React.useState({
        open: false,
        title: '',
        msg: ''
    });

    const handleCloseSignupAlert = () => {
        setOpenSignupAlert({
            open: false
        });
    }

    const [inputs, setInputs] = useState({
        id: '',
        pw: '',
        pwConfirm: '',
    });

    const {id, pw, pwConfirm} = inputs;

    const onChangeSignupInput = (e) => {
        const {name, value} = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        }

        setInputs(nextInputs)
    }

    function handleSignupClick() {
        if (inputs.pw !== inputs.pwConfirm) {
            setOpenSignupAlert({
                open: true,
                msg: '비밀번호와 비밀번호 확인이 다릅니다.'
            });
            return;
        }

        if (localStorage.getItem(inputs.id)) {
            setOpenSignupAlert({
                open: true,
                msg: '이미 존재하는 id입니다.'
            });
            return;
        }

        localStorage.setItem(inputs.id, inputs.pw);
        localStorage.setItem(`todo_${inputs.id}`, '{}');

        history.push('/login');
    }

    return (
        <div>
            <Container maxWidth={"sm"} className="text-center">
                <h2>Signup</h2>
                <br></br>
                <form>
                    <TextField label={"id"} onChange={onChangeSignupInput} name={"id"} value={id}></TextField>
                    <br></br>
                    <TextField label={"password"} type={"password"} onChange={onChangeSignupInput} name={"pw"}
                               value={pw}></TextField>
                    <br></br>
                    <TextField label={"password confirm"} type={"password"} onChange={onChangeSignupInput}
                               name={"pwConfirm"} value={pwConfirm}></TextField>
                </form>
                <br></br>
                <Button variant={"contained"} color={"primary"} onClick={handleSignupClick}>Signup</Button>
            </Container>

            <Dialog
                open={signupAlertDatas.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSignupAlert}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{signupAlertDatas.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {signupAlertDatas.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSignupAlert} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Signup;