const {Schema, model} = require('mongoose');

const storySchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    }
});

module.exports = model('Stories', storySchema);