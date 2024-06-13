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