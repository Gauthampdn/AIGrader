const mongoose = require("mongoose")

const Schema = mongoose.Schema

const rubricValueSchema = new Schema({
  point: {
    type: Number,
  },
  description: {
    type: String,
  }
});

const rubricSchema = new Schema({
  name: {
    type: String,
  },
  values: [rubricValueSchema]
});

//feedback schema
const feedbackCriteriaSchema = new Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
  total:{
    type: Number,
  },
  comments: {
    type: String,
  },
});


const submissionSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
  },
  dateSubmitted: {
    type: Date
  },
  status: {
    type: String,
    enum: ['open', 'submitted', 'graded', 'regrade', 'error'],  // make open, 
    default: 'open' // Optional: you can set a default status
  },
  feedback: {
    type: [feedbackCriteriaSchema],
    default: [] // Optional: you can set a default status
  },
  pdfURL: {
    type: String,
  },
  pdfKey: {
    type: String,
  }

});


const assignmentSchema = new Schema({
  name: {
    type: String,  // name of the assignment
    required: true
  },
  description: {  // description of the assignment (what it is about)
    type: String,
    required: true
  },
  classId: {
    type: String,  // use the class's object id NOT THE JOIN CODE
    required: true 
  },
  dueDate: {
    type: Date
  },
  rubric: {  // the rubric we can store as schema type to?? ill do that
    type: [rubricSchema],
  },
  submissions: {
    type: [submissionSchema], // multiple submissions in an assignment
  }
}, { timestamps: true });


// Create the model based on the schema

module.exports = mongoose.model('assignment', assignmentSchema);



/*
classroom
 - assignments
  - submissions for assignemnt



  when an assignment is made made an empty submission for all
  so when a student submits it edits the submissions 
  than having to make one and then have another one for editting for resubmissions
  

*/