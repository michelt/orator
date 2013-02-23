debug = require("debug") "app"
express = require "express"
mongoose = require "mongoose"
settings = require "./settings"
routes = require "./routes"
models = require "./models"

app = express()
server = require("http").createServer app

settings.set "io", require("socket.io").listen server

mongoose.connect process.env.DB_URI

app.configure ->
  app.set "port", process.env.PORT ? 3000
  app.set "views", "#{__dirname}/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger "dev"
  app.use express.bodyParser()
  app.use app.router
  app.use express.static "#{__dirname}/public"

app.configure "development", ->
  app.use express.errorHandler
    dumpExceptions: yes
    showStack: yes

app.configure "production", ->
  app.use express.errorHandler()

app.param "slug", (req, res, next, slug) ->
  models.Presentation.findOne {slug}, (err, doc) ->
    if err
      debug err
      next err
    else unless doc
      if req.xhr then res.json 404, status: "ERROR"
      else res.render "errors/404"
    else
      req.presentation = doc
      next()

app.all "/", routes.home
app.get "/create", routes.create.view
app.post "/create", routes.create.save
app.all "/:slug/show", routes.show
app.get "/:slug/edit", routes.edit.view
app.post "/:slug/edit", routes.edit.save
app.all "/:slug/start", routes.run.start
app.all "/:slug/stop", routes.run.stop

server.listen app.get("port"), ->
  debug "server listening on port #{app.get "port"} in #{app.settings.env} mode"
