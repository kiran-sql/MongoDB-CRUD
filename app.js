const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const port = 4000;
const app = express();
app.use(bodyParser.json());
const collection = "todo";

db.connect((err) => {
 if(err){
  console.log('Unable to connect to database');
  process.exit(1);
 }
 else{
  app.listen(port, () => {
   console.log("Listening on port "+ port)
 });
 }
});

//static page send to user
app.get('/',(req,res) => {
 res.sendFile(path.join(__dirname,'index.html'));
});

//get the to do list stored in the database
app.get('/getTodos',(req,res) => {
 db.getDB().collection(collection).find().toArray((err,documents) => {
  if(err){
   console.log(err);
  }
  else{
   console.log(documents);
   res.json(documents);
  }
 });
});

//update a todo
app.put('/:id',(req,res) => {
 const id = req.params.id;
 const userInput = req.body;

 db.getDB().collection(collection).findOneAndUpdate({_id:db.getPrimarykey(id)},{$set:{todo:userInput.todo}},{returnOriginal:false},(err,result) => {
  if(err){
   console.log(err);
  }
  else{
   res.json(result);
  }
 });
});

//add a new todo
app.post('/',(req,res) => {
  const userInput = req.body;
  db.getDB().collection(collection).insertOne(userInput,(err,result) => {
    if(err){
      console.log(err);
    }
    else{
      res.json({result:result,document: result,msg:"Successfully inserted todo"});
    }
  });
});

//delete a todo
app.delete('/:id',(req,res) => {
  const todoId = req.params.id;
  db.getDB().collection(collection).findOneAndDelete({_id:db.getPrimarykey(todoId)},(err,result) => {
    if(err){
      console.log(err)
    }
    else{
      res.json(result);
    }
  });
});