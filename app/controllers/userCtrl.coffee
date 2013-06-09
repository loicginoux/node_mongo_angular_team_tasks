config = require "../../config"
User   = require config.modelDir + '/User'

exports.new = (req, res) ->
  res.render "user/login"


exports.create = (req, res) ->
  res.send "respond with a resource"

