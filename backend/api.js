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
                    res.send(re);
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));

}

/** TODO: FIX UPDATE ERROR */
exports.updateTodo = (req, res) => {
    let id = req.params.id;

    console.log("updateTodo: %s %o", id, req.body);
    db.update(id, req.body)
        .then(result => {
            console.log("updateTodo: db returned %o", result);
            
            db.queryById(id)
                .then(re => {
                    res.send(re);
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