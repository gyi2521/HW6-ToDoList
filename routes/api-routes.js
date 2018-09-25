const toDoList = require('../data/toDoList.js');

module.exports = function (app) {

    app.get('/api/toDo', function (req, res) {
        console.log(toDoList);
        return res.json(toDoList);       
    });

    app.post('/api/toDo', function (req, res) {

        toDoList.push(req.body['action']);
        const confirmation = {success: true}
        return res.json(confirmation);
        //return res.json({ success: false });
    });

    app.delete('/api/toDo/:index', function (req, res) {
        toDoList.splice(req.params.index, 1);

    });

}