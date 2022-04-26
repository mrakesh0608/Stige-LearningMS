const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required:true
    }
});

module.exports.Task = mongoose.model('task', taskSchema);