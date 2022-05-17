const TODOS = [
    {
        id: 0,
        title: 'Aufgabe 4 abgeben',
        due: '2021-05-21T10:00:00.000Z',
        status: 'done'
    },
    {
        id: 1,
        title: 'Aufgabe 6 abgeben',
        due: '2021-06-08T10:00:00.000Z',
        status: 'doing'
    },
    {
        id: 2,
        title: 'ToDo-Anwendung fertig stellen',
        due: '2021-06-22T10:00:00.000Z',
        status: 'open'
    },
    {
        id: 3,
        title: 'Für die Klausur lernen',
        due: '2021-07-01T11:00:00.000Z',
        status: 'open'
    }
];

function getFreeTodoID() {
    let index = 0;

    while(TODOS.find(element => element.id === index)) {
        index++;
    }

    return index;
}

module.exports = {

    getTodos: (req, res) => {
        res.send(TODOS);
    },

    createTodo: (req, res) => {
        console.log("createTodo: %o", req.body);

        var new_todo = req.body;
        new_todo.id = getFreeTodoID();
        new_todo.status = 'open';

        TODOS.push(new_todo);

        res.send(new_todo);
    },

    updateTodo: (req, res) => {
        let id = req.params.id;

        const element = TODOS.find(element => element.id == id);

        if(element == undefined) {
            res.status(400);
            res.send("Ungültige ID");
            return;
        }

        console.log("updateTodo: %s %o", id, req.body);
        let updated_todo = req.body;

        const elementIndex = TODOS.findIndex(element => element.id == id);
        for(var i in updated_todo) {
            TODOS[elementIndex][i] = updated_todo[i];
        }
        
        res.send(TODOS[elementIndex]);
    },

    deleteTodo: (req, res) => {
        let id = req.params.id;

        const element = TODOS.find(element => element.id == id);

        if(element == undefined) {
            res.status(400);
            res.send("Ungültige ID");
            return;
        }

        console.log("deleteTodo: %s %o", id, req.body);

        const elementIndex = TODOS.findIndex(element => element.id == id);

        TODOS.splice(elementIndex, 1);

        res.status(204);
        res.send();
    }

}