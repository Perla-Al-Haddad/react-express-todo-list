const express = require('express')

const tasksControllers = require('../controllers/tasks-controllers')

const router = express.Router()

router.get('/', tasksControllers.getTasks)

router.get('/:tid', tasksControllers.getTaskById)

router.post('/', tasksControllers.createTask)

router.post('/:tid', tasksControllers.updateTaskStatus)

router.patch('/:tid', tasksControllers.editTaskText)

router.delete('/:tid', tasksControllers.deleteTask)

module.exports = router