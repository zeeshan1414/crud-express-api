const express = require("express");
const router = express.Router();
const controller = require('../controllers/todoController');

// get request
router.get('/', controller.getTaskList);

// post request to database
router.post('/addNewTask', controller.postTask);

// delete method for todo list
router.post('/delete', controller.deleteTask);

module.exports = router;