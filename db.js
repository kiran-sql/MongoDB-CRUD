const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbName = "crud_mongodb";

const url = "mongodb+srv://notes:reshyamk666@cluster0.q6lb8.mongodb.net/notes?retryWrites=true&w=majority";
const mongoOptions = {useNewUrlParser: true};

const state = {
 db : null
}

const connect = (cb) => {
 if(state.db){
  //if db is not created then call back
  cb();
 }
 else{
  MongoClient.connect(url,mongoOptions,(err,client) => {
   if(err){
    cb(err);
   }
   else{
    state.db = client.db(dbName);
    cb();
   }
  });
 }
}

const getPrimarykey = (_id) => {
 return ObjectID(_id);
}

const getDB = () =>{
 return state.db;
}

module.exports = {getDB,connect, getPrimarykey};