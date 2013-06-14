Project   = require "../models/Project"


exports.index = (req, res, next) ->
	console.log req.params
	Project
	.where("team_id").equals(req.params.team_id)
	.select("_id name")
	.exec((err,projects) ->
		throw err if err
		res.json(projects)
	)

exports.create = (req, res, next) ->
	team = req.params.team_id
	project = req.body
	project.team_id = team
	project = new Project(project).save((err, newProject)->
		throw err if err
		console.log "success project"
		console.log newProject
		res.json({status: "success", project: newProject})
	)


exports.update = (req, res, next) ->
	console.log "update: ", req.params.project_id, req.body.name
	Project.findOne({_id: req.params.project_id}).exec((err, proj) ->
		throw err if err
		proj.name = req.body.name
		proj.save (err, proj)->
			throw err if err
			console.log "success update project"
			res.json({status:"success"})
	)


exports.destroy = (req, res, next) ->
	project = req.params.project_id
	console.log "deleting project:", project
	Project.find({_id: project}).remove (err, proj)->
		throw err if err
		console.log "success delete project", proj
		res.json({status:"success"})

