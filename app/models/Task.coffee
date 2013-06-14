mongoose = require 'mongoose'

Task = new mongoose.Schema(
  content: {type: String, required:true}
  project_id: {type: String, required:true}
  creator_id: String
  assignee_id: String
  end_date: Date
  created_date: Date
  nb_comments: {type: Number, default: 0, min: 0}
  completed: {type:Boolean, default: false}
  archived: {type:Boolean, default: false}
)




module.exports = mongoose.model 'Task', Task

