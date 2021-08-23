import TodoActionTypes from "./todo.types";

const INITIAL_STATE = {
}

const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TodoActionTypes.CREATE_USER_TODO:
            return {
                ...state,
                [action.userId]: [],
            };
        case TodoActionTypes.CHANGE_TODO_DATAS:
            return {
                ...state,
                [action.userId]: action.todos,
            };
        default:
            return state;
    }
}

export default todoReducer;