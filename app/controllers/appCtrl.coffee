exports.index = (req, res) ->
	user = req.user
	console.log "isAuthenticated:" + req.isAuthenticated()
	# res.render "index"
	if req.isAuthenticated()
		res.redirect "/team/" + user.team_id
	else
		res.redirect "/login"

