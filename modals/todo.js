const mongodb = require('mongoose');
const todo = mongodb.Schema({
    isim:String
},{collection:'todo',versionKey:false});

module.exports = mongodb.model('todo',todo);