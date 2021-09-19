import React from 'react'

import TaskItem from '../TaskItem/TaskItem'

import './TodoList.css'

const TodoList = props => {
    return (
        <ul className="todo-list">
            {props.tasks.map((task) => {
                return (
                    <TaskItem onRemove={props.onRemoveHandler} key={task.id} task={task} />
                    )
                })
            }
        </ul>
    )
}

export default TodoList