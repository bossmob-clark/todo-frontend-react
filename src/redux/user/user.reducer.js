import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    users: [],
    user: null,
    currUserId: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.user),
            };
        case UserActionTypes.SET_CURR_USER:
            return {
                ...state,
                currUserId: action.userId,
            };
        default:
            return state;
    }
}

export default userReducer;