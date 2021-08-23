import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {UserProvider} from "./context";

// ========================================

ReactDOM.render(
    <UserProvider>
        <Root/>
    </UserProvider>,
    document.getElementById('root')
);
