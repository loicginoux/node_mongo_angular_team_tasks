mongoose = require 'mongoose'

Team = new mongoose.Schema(
  name: String
)




module.exports = mongoose.model 'Team', Team

