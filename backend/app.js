const express = require('express')
const bodyParser = require('body-parser')

const HttpError = require('./models/http-error')

const tasksRoutes = require('./routes/tasks-routes')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/tasks', tasksRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find the specified route')
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "Some unspecified error occured!"})
})

app.listen(5000)