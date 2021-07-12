import React, {useState} from 'react';
import './Todolist.css';

let dummyData = [
    {
        title: 'title1',
        contents: 'contents1',
        date: '2021-06-01',
        totoSate: 'TODO',
    },
    {
        title: 'title2',
        contents: 'contents2',
        date: '2021-06-07',
        totoSate: 'DOING',
    },
    {
        title: 'title3',
        contents: 'contents3',
        date: '2021-06-23',
        totoSate: 'DONE',
    }
];

function Todolist() {
    let [todoDatas, todoDatasChange] = useState(dummyData);
    return (
        <div className='container-todo'>
            <TodoListItem
                data={todoDatas[0]}
            />
        </div>
    );
}

function TodoListItem(props) {
    return (
        <div className='container-todo-item'>
            <h4>{props.data.title}</h4>
            <p>{props.data.contents}</p>
            <p>{props.data.date}</p>
            <p>{props.data.totoSate}</p>
        </div>
    );
}

export default Todolist;