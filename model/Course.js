const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    tasks:{
        type: Object,
        required: true
    }
});

module.exports.Course = mongoose.model('course', courseSchema);