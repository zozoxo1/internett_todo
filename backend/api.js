let db = require('./persistence/mongodb.js');

exports.init = () => {
    return db.connect();
}

exports.getTodos = (req, res) => {

    console.log("getTodo: %o", req.body);
    db.queryAll()
        .then(result => {
            console.log("getTodo: db returned %o", result);
            res.send(result);
        })
        .catch(err => {
            console.log("error: %o", err);
            res.status(500).send(err)
        });

}

exports.createTodo = (req, res) => {

    console.log("createTodo: %o", req.body);
    db.insert(req.body)
        .then(result => {
            console.log("createTodo: db returned %o", result);
            
            db.queryById(result.insertedId)
                .then(re => {
                    res.status(201).send(re);
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));

}

exports.updateTodo = (req, res) => {
    let id = req.params.id;

    console.log("updateTodo: %s %o", id, req.body);

    db.queryById(id)
        .then(result => {
            let updated_todo = req.body;

            for(var i in updated_todo) {
                result[i] = updated_todo[i];
            }

            db.update(id, result)
                .then(re => {
                    console.log("updateTodo: db returned %o", re);
                    
                    res.send(result);
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
}

exports.deleteTodo = (req, res) => {
    let id = req.params.id;

    console.log("deleteTodo: %s", id);
    db.delete(id)
        .then(result => {
            console.log("deleteTodo: db returned %o", result);
            res.status(204).send();
        })
        .catch(err => res.status(500).send(err));
}