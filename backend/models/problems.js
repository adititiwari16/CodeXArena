const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problem_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sample_input: {
        type: String,
        required: true,
    },
    sample_output: {
        type: String,
        required: true,
    },
    constraints: {
        type: String,
        required: true,
    },
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;