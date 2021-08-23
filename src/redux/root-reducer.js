import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user.reducer";
import todoReducer from "./todo/todo.reducer";

// type of store
// localstorage 경로
// : import storage from 'redux-persist/lib/storage'
// Redux-persist한테 나는 localstorage를 사용할 것이라고 알려주는것

// sessiongstorage 경로
// : import storageSession from 'redux-persist/lib/storage/session';
// Redux-persist한테 나는 sessionstorage를 사용할 것이라고 알려주는것


const persistConfig = {
    // 새로운 persist config를 선언해준다.
    key: 'root',
    // reducer 객체의 어느 지점에서 부터 데이터를 저장할 것인지 설정해주는것이 key이다.
    // root부터 시작한다고 지정해준다.
    storage: storage,
    // 위에 import 한 성격의 storage를 지정해준다. 이 예제의 경우에는 localstorage
    whitelist: ["userDatas", "todoList"],
    // 유지 및 보존하고 싶은 데이터를 배열안에 지정해준다.
    // string 형태이고 아래 combineReducers에 지정된 값들을 사용해주면 된다.
};

const rootReducer = combineReducers({
    userDatas: userReducer,
    todoList: todoReducer
});


export default persistReducer(persistConfig, rootReducer)