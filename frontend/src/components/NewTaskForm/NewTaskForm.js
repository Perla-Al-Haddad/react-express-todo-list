import {React, useState} from "react";

import './NewTaskForm.css'

const NewTaskForm = props => {
    const [enteredText, setEnteredText] = useState("")

    const submitHandler = event => {
        event.preventDefault()
        setEnteredText("")
        props.addTaskHandler(enteredText)
    }

    const textChangeHandler = event => {
        setEnteredText(event.target.value)
    }

    return (
        <form method="post" className="newItemForm" onSubmit={submitHandler}>
            <input type="text" placeholder="Enter a new task" value={enteredText} onChange={textChangeHandler}></input>
            <button type="submit">Add Task</button>
        </form>
    )
}

export default NewTaskForm