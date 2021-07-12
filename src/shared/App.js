import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Home, Login, Signup, Todolist} from "../pages";

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/todolist' component={Todolist}/>
            </div>
        );
    }
}

export default App;