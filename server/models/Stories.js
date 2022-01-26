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
            pageId:{}, // create just id
            variables:{}, // var id, value
            content:{}, // content string
            title:{},
        },    */
    },

});

module.exports = model('Stories', storySchema);