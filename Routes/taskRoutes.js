const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

router.post('/',taskController.createTask);

router.get('/', taskController.getAlltasks);

router.put('/:id',taskController.updateTaskById);


module.exports = router;