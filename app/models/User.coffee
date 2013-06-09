mongoose = require 'mongoose'
auth     = require "../helpers/auth"


User = new mongoose.Schema(
	name: String
	email: String
	team_id: String
	role: String
	salt: String
	hash: String
)



User.static "authenticate", (email, password, callback) ->
	console.log "authentication", email, password
	@findOne({email: email}).exec (err, user) ->
		if err
			console.log "findOne error occurred"
			return callback(err)
		return callback(null, false)  unless user
		auth.hash password, user.salt, (err, hash) ->
			return callback(err)  if err
			console.log "hash" + hash
			console.log "user.hash" + user.hash
			if hash is user.hash
				console.log "User Found, returning user"
				callback(null, user)
			else
				callback(err, false,
					message: "bad password"
				)



module.exports = mongoose.model 'User', User


