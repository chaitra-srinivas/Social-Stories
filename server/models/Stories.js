const { Schema, model } = require("mongoose");

const variablesSchema = new Schema({
  varId: {
    type: String,
    required: true,
  },
   name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  }, 
  value: {
    type: String,
    required: false,
  },
});


const pageSchema = new Schema({
    pageId: {
      type: String,
      required: true,
    },
    content:{
        type: String,
        required: true,
    },
    image:{
      type: String,
      required: false,
    },
    variables: [variablesSchema],
  });
// A subdocument for page variables


const storySchema = new Schema({
  templateId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },    
  
  pages: [pageSchema],  
  
});

// A subdocument for pages in a story



module.exports = model("Stories", storySchema);
