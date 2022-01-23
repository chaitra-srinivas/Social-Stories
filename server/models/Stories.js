const {Schema, model} = require('mongoose');

const storySchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    templateID: {

    },
    pages:{
        type: Array,
        /* {
            id:{},
            variables:{},
            content:{},
            title:{},
        },    */
    },

});

module.exports = model('Stories', storySchema);