const express = require("express");
const router = express.Router();

// importing models file
const Task = require('../models/todo');


// get request
router.get('/', (req, res) => {
    Task.find({})
        .then(item => {
            res.render('todo', {
                items: item
            });
        })
        .catch(err => console.log(err.message));
});

// post request to database
router.post('/addNewTask', (req, res) => {
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
});

// delete method for todo list

router.post('/delete', (req, res) => {
    console.log('I m in delete route');
    const id = req.body.task_id;
    Task.findByIdAndRemove(id)
        .then(() => {
            console.log(id + 'deleted');
            res.redirect('/todo');
        })
        .catch(err => console.log(err));
});

// post method for todo list

// router.post("/todo", (req, res) => {
//     items.push(req.body.NewTask);
//     res.redirect("/todo");
// })

// get request for todo page.
// router.get("/todo", (req, res) => {
//     res.render("todo", {
//         items: items
//     });
//     // res.json(list);
// });

//delete method for todo list
// router.delete("/todo", (req, res) => {
//     let item = req.body.item;
//     items.pop(item);
// })


module.exports = router;