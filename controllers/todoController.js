// importing models file
const Task = require('../models/todo');

// method to get task list
exports.getTaskList = (req, res) => {
    Task.find({})
        .then(item => {
            res.render('todo', {
                items: item
            });
        })
        .catch(err => console.log(err.message));
}

// method to add a task in the list
exports.postTask = (req, res) => {
    Task.findOne({
            list: req.body.NewTask
        })
        .then(item => {
            if (item) {
                res.redirect('/todo');
            } else {
                const newItem = new Task({
                    list: req.body.NewTask
                });
                newItem.save().then(res.redirect('/todo'))
                    .catch(err => console.log(err));
            }
        })
}

// method to delete a task from the list
exports.deleteTask = (req, res) => {
    console.log('I m in delete route');
    const id = req.body.task_id;
    Task.findByIdAndRemove(id)
        .then(() => {
            console.log(id + 'deleted');
            res.redirect('/todo');
        })
        .catch(err => console.log(err));
}