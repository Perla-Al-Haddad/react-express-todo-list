const uuid = require('uuid').v4

const HttpError = require('../models/http-error')

let DUMMY_TASKS = [
    {
        id: 't1',
        text: 'This is the first task TEST',
        checked: false
    },
    {
        id: 't2',
        text: 'This is the second task',
        checked: true
    }
]

const getTasks = (req, res, next) => {
    res.status(200).json({tasks: DUMMY_TASKS})
}

const getTaskById = (req, res, next) => {
    const taskId = req.params.tid
    const task = DUMMY_TASKS.find(p => p.id == taskId)
    if (!task) { throw new HttpError("Could not find a task for the specified id", 404) }
    res.status(200).json({task})
}

const createTask = (req, res, next) => {
    const {text} = req.body
    const newTask = {
        id: uuid(),
        text,
        checked: false
    }
    DUMMY_TASKS.push(newTask)
    res.status(201).json({task: newTask})
}

const updateTaskStatus = (req, res, next) => {
    const taskId = req.params.tid
    const updatedTask = {...DUMMY_TASKS.find(p => p.id == taskId)}
    if (!updatedTask) { throw new HttpError("Could not find a task for the specified id", 404) }
    const taskIndex = DUMMY_TASKS.findIndex(p => p.id == taskId)
    updatedTask.checked = !updatedTask.checked
    DUMMY_TASKS[taskIndex] = updatedTask
    res.status(201).json({task: updatedTask})
}
const editTaskText = (req, res, next) => {
    const taskId = req.params.tid
    const updatedTask = {...DUMMY_TASKS.find(p => p.id == taskId)}
    if (!updatedTask) { throw new HttpError("Could not find a task for the specified id", 404) }
    const taskIndex = DUMMY_TASKS.findIndex(p => p.id == taskId)
    const {text} = req.body
    updatedTask.text = text
    DUMMY_TASKS[taskIndex] = updatedTask
    res.status(201).json({task: updatedTask})
}

const deleteTask = (req, res, next) => {
    const taskId = req.params.tid
    DUMMY_TASKS = DUMMY_TASKS.filter(p => p.id != taskId)
    res.status(200).json({tasks: DUMMY_TASKS})
}

exports.getTasks = getTasks
exports.getTaskById = getTaskById
exports.createTask = createTask
exports.updateTaskStatus = updateTaskStatus
exports.editTaskText = editTaskText
exports.deleteTask = deleteTask