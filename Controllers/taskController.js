const {ObjectId} = require('mongodb');

exports.createTask = async(req,res)=>{
    const db = req.app.locals.db;
    try{
        const newTask = req.body;
        const result = await db.collection('tasks').insertOne(newTask);
        res.status(201).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

//get all tasks
exports.getAlltasks = async (req, res) => {
    const db = req.app.locals.db;
  
    const { title,notEmail, email } = req.query; // Extract the title query parameter
    let query = {};
    // if (title) {
    //   query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex search
    // }
    // if (notEmail) {
    //   query.sellerEmail = { $ne: notEmail }; // Exclude products from this email
    //   query.status = 1; // Ensure only products with status 1 are retrieved
    // }
    // if (email) {
    //   query.sellerEmail = email; // Ensure only products with status 1 are retrieved
    // }
    try {
      const tasks = await db.collection('tasks').find(query).toArray();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.updateTaskById = async (req, res) => {
    const db = req.app.locals.db;
    try {
      const taskId = new ObjectId(req.params.id);
      const updatedTask = req.body;
  
      const task = await db.collection('tasks').findOne({ _id: taskId });
      if (!task) {
        return res.status(404).json({ message: 'task not found' });
      }
  
      // Update the task
      await db.collection('tasks').updateOne(
        { _id: taskId },
        { $set: updatedTask }
      );
  
      // Get the updated task
      const updatedTaskDetails = await db.collection('tasks').findOne({ _id: taskId });
  
      const response = {
        acknowledged: true,
        data: updatedTaskDetails
      };
  
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };