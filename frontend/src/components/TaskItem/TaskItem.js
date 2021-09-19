import {React, useState} from 'react'

import './TaskItem.css'

const TaskItem = props => {
    const [checkedState, setCheckedState] = useState(props.task.checked)

    const handeClick = async event => {
        try {
            const response = await fetch('http://localhost:5000/tasks/' + props.task.id, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            })
            const responseData = await response.json()
        } catch (error) {
            console.log(error)
        }
    }

    const checkboxHandler = (e) => {
        setCheckedState(!checkedState)
    }

    return (
        <li className={checkedState ? 'checked' : ''}>
            <div className="left">
                {props.task.text}
            </div>
            <div className="buttons right">
                <table>
                    <tr>
                        <td><input type="checkbox" onClick={handeClick} checked={checkedState} onChange={checkboxHandler}/></td>
                        <td><button onClick={() => props.onRemove(props.task.id)}><span>X</span></button></td>
                    </tr>
                </table>
            </div>
        </li>
    )
}

export default TaskItem