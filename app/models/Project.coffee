mongoose = require 'mongoose'

Project = new mongoose.Schema(
  name: String,
  team_id: String
)




module.exports = mongoose.model 'Project', Project

