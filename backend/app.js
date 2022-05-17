require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = require('./api.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/api/todos')
    .get(api.getTodos)
    .post(api.createTodo);

app.route('/api/todos/:id')
    .put(api.updateTodo)
    .delete(api.deleteTodo);

app.listen(port, (error) => {
    if(error) {
        console.log(`Error occured while starting to listen on Port ${port}`, error);
        return;
    }

    console.log(`App is listening on port ${port}`);
});