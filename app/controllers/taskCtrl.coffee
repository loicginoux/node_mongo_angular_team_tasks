Task    = require "../models/Task"

exports.index = (req, res, next) ->
	Task
	.where("project_id").equals(req.query.project_id)
	.exec((err,tasks) ->
		throw err if err
		res.json(tasks)
	)

exports.create = (req, res, next) ->
	project = req.params.project_id
	task = req.body
	task = new Task(task).save((err, newTask)->
		throw err if err
		console.log "success task"
		console.log newTask
		res.json({status: "success", task: newTask})
	)


exports.update = (req, res, next) ->
	console.log "update: ", req.params.task_id, req.body.name
	Task.findOne({_id: req.params.task_id}).exec((err, proj) ->
		throw err if err
		proj.name = req.body.name
		proj.save (err, proj)->
			throw err if err
			console.log "success update task"
			res.json({status:"success"})
	)


exports.destroy = (req, res, next) ->
	task = req.params.task_id
	console.log "deleting task:", task
	Task.find({_id: task}).remove (err, proj)->
		throw err if err
		console.log "success delete task", proj
		res.json({status:"success"})

