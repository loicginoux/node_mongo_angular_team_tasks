mongoose = require 'mongoose'

Team = new mongoose.Schema(
  name: {type: String, required:true}
)




module.exports = mongoose.model 'Team', Team

