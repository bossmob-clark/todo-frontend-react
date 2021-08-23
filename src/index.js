import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import './index.css';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';

// ========================================

ReactDOM.render(
    // 아래에 application의 최상단 컴포넌트를 PersistGate로 감싸주고 props로 persistor를 넘겨준다.
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Root/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
