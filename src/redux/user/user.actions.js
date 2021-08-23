import UserActionTypes from "./user.types";

export const AddUser = userInfo => ({
    type: UserActionTypes.ADD_USER,
    user: userInfo,
});

export const SetCurrUser = userId => ({
    type: UserActionTypes.SET_CURR_USER,
    userId: userId,
});
