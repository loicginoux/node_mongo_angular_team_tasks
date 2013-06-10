
###
Module dependencies.
###


express       = require "express"
engine        = require 'ejs-locals'
config        = require "./config"
userCtrl      = require config.controllerDir + "/userCtrl"
teamCtrl      = require config.controllerDir + "/teamCtrl"
appCtrl       = require config.controllerDir + "/appCtrl"
User          = require config.modelDir + "/User"
Team          = require config.modelDir + "/Team"
auth          = require config.helperDir + "/auth"
http          = require "http"
path          = require "path"
flash         = require 'connect-flash'
mongoose      = require "mongoose"
passport      = require "passport"
LocalStrategy = (require 'passport-local').Strategy
app           = express()

# all environments
app.set "port", process.env.PORT or 3001
app.set "views", config.viewsDir
app.engine 'ejs', engine
app.set "view engine", "ejs"
app.use express.favicon()
app.use express.logger("dev")
app.use express.cookieParser('keyboard cat')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.session(
	secret: 'SECRET'
	cookie:
		maxAge: 60000
)
app.use flash()
app.use passport.initialize()
app.use passport.session()
app.use app.router
app.use require('connect-assets')()
app.use require("less-middleware")(src: __dirname + "/assets")
app.use express.static(path.join(__dirname, "assets"))

# development only
app.use express.errorHandler()  if "development" is app.get("env")


# Database and Models
mongoose.connect("mongodb://localhost/londy");


# passeport initialisation
passport.use new LocalStrategy((email, password, done) ->
	console.log email, password
	User.authenticate email, password, (err, user, info) ->
		done err, user, info

)

passport.serializeUser (user, done) ->
	done null, user.id


passport.deserializeUser (id, done) ->
	User.findById id, (err, user) ->
		done err  if err
		if user
			done null, user
		else
			User.findById id, (err, user) ->
				done err  if err
				done null, user

userExist = (req, res, next)->
	User.count
			email: req.body.user.email
		, (err, count) ->
			if count is 0
				next()
			else
				console.log "User already exists!"+ user.email
				res.redirect "/register"


teamExist = (req, res, next) ->
  Team.count
    name: req.body.name
  , (err, count) ->
    if count is 0
      next()
    else
      console.log "Team already exists!"+ req.body.name
      res.redirect "/register"

# Routing
app.get "/", appCtrl.index
# app.get('/partials/:name', appCtrl.partials)

app.get "/login", userCtrl.new
app.post '/login', (req, res, next) ->
	console.log "here"
	passport.authenticate('local', (err,user,info)->
		console.log err
		return next(err) if err
		if !user
			console.log "no", err, info
			res.redirect("/login", {error:true})
		else
			req.login user, (err) ->
					return next(err)  if err
					console.log "ok"
					res.redirect "/"
	)(req,res,next)

app.get "/register", teamCtrl.new
app.post "/register", userExist, teamExist, teamCtrl.create
app.get "/team/:id", teamExist, teamCtrl.show
app.get "/logout", (req, res) ->
	req.logout()
	res.redirect "/login"



# start the beast
http.createServer(app).listen app.get("port"), ->
	console.log "["+app.get("env")+"] Express server listening on port " + app.get("port")


