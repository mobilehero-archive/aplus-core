var _ = require("lodash");
var path = require("path");

var config;
var _event;

function handler() {}
module.exports = handler;

var loadConfig = function() {
	console.log("Loading alloy config file");
	config = require(path.join(path.relative(__dirname, handler.event.dir.resourcesPlatform), "alloy", "CFG"));
	config.mobile = config.mobile || {};
	config.mobile.scripts = config.mobile.scripts || {};

	_.defaults(config.mobile.scripts, {
		preload: [],
		precompile: [],
		postcompile: [],
		appjs: [],
	})
}

Object.defineProperty(handler, "event", {

	get: function() {
		return _event;
	},
	set: function(event) {
		if(!_event) {
			_event = event;
			event.dir.resourcesPlatform = path.join(event.dir.resources, event.alloyConfig.platform === 'ios' ? 'iphone' : event.alloyConfig.platform);
			loadConfig();
		} else {
			_event = event;
		}
	},
	enumerable: true,
	configurable: false
});

function executeScripts(eventName) {

	var scripts = config.mobile.scripts[eventName];
	handler.logger.error("scripts: " + JSON.stringify(scripts));

	_.forEach(scripts, function(script) {
		script = _.template(script)({
			event: handler.event,
			config: handler.config,
			logger: handler.logger
		})
		handler.logger.error("script: " + script);
		var scriptArgs = script.split(" ");

		var requirex = require(path.join(path.relative(__dirname, handler.event.dir.project), "scripts", "requirex"));
		var target = requirex(scriptArgs.shift());

		scriptArgs.unshift({
			logger: handler.logger,
			event: handler.event,
			config: handler.config
		})

		_.isFunction(target) && _.spread(target)(scriptArgs);
	});

}

var events = ["preload", "precompile", "postcompile", "appjs"];
_.forEach(events, function(eventName) {
	handler[eventName] = function(event, logger) {
		logger.warn("********************* STARTING EVENT: " + eventName + " ***************************");
		handler.event = event;
		handler.logger = logger;
		executeScripts(eventName);
		logger.warn("********************* FINISHED EVENT: " + eventName + " ***************************");
	}
});