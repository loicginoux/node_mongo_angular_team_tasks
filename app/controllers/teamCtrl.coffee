auth   = require "../helpers/auth"
Team   = require "../models/Team"
User   = require "../models/User"

exports.new = (req, res) ->
	res.render("team/register")

exports.create = (req, res, next) ->
	team = new Team(
		name: req.body.team.name
	).save((err, newTeam)->
		throw err if err
		auth.hash req.body.user.password, (err, salt, hash) ->
			throw err if err
			user = new User(
				name: req.body.user.name
				email: req.body.user.email
				team_id: newTeam._id
				role: "manager"
				salt: salt
				hash: hash
			)
			user.save((err, newUser) ->
				throw err if err
				req.login newUser, (err) ->
					return next(err)  if err
					res.redirect "/"
			)
	)


exports.show = (req, res) ->
	Team.findById(req.params.id).exec (err, team) ->
		res.render "team/show", {team: team}
