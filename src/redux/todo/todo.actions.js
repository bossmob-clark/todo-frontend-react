import TodoActionTypes from "./todo.types";

export const CreateTodo = (userId, todoInfo) => ({
    type: TodoActionTypes.CREATE_USER_TODO,
    userId: userId,
});

export const SaveTodo = (userId, todos) => ({
    type: TodoActionTypes.CHANGE_TODO_DATAS,
    userId: userId,
    todos: todos,
});
