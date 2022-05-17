require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = require('./api.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/todos', api.getTodos);
app.post('/api/todos', api.createTodo);
app.put('/api/todos/:id', api.updateTodo);
app.delete('/api/todos/:id', api.deleteTodo);

app.listen(port, (error) => {
    if(error) {
        console.log(`Error occured while starting to listen on Port ${port}`, error);
        return;
    }

    console.log(`App is listening on port ${port}`);
});