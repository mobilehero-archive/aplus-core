"use strict";
/***
 *                          __     _  __       __                     
 *       ____ ___   ____   / /_   (_)/ /___   / /_   ___   _____ ____ 
 *      / __ `__ \ / __ \ / __ \ / // // _ \ / __ \ / _ \ / ___// __ \ 
 *     / / / / / // /_/ // /_/ // // //  __// / / //  __// /   / /_/ / 
 *    /_/ /_/ /_/ \____//_.___//_//_/ \___//_/ /_/ \___//_/    \____/ 
 *                                                                    
 *                  mobile solutions for everyday heroes
 *                                                                    
 * @file 
 * Alloy+ => Mobile framework for building upon Appcelerator Alloy projects
 * 
 * @module 
 * alloy-plus
 * 
 * @author 
 * Brenton House <brenton.house@gmail.com>
 * 
 * @copyright
 * Copyright (c) 2016 by Superhero Studios Incorporated.  All Rights Reserved.
 *      
 * @license
 * Licensed under the terms of the MIT License (MIT)
 * Please see the LICENSE.md included with this distribution for details.
 * 
 */

var _ = require("lodash");
var path = require("path");
var resolve = require("resolve");
var config;
var _event;

function handler() {}
module.exports = handler;

var loadConfig = function() {
	console.log("Loading alloy config file");
	config = require(path.join(path.relative(__dirname, handler.event.dir.resourcesPlatform), "alloy", "CFG"));
	// config.mobile = config.mobile || {};
	// config.mobile.scripts = config.mobile.scripts || {};
	config.tasks = config.tasks || {};

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

	var tasks = config.tasks[eventName] || [];
	handler.logger.error("tasks: " + JSON.stringify(tasks));

	_.forEach(tasks, function(task) {
		task = _.template(task)({
			event: handler.event,
			config: handler.config,
			logger: handler.logger
		})
		handler.logger.trace("task: " + task);
		var scriptArgs = task.split(" ");
		var target = require(resolve.sync(scriptArgs.shift(), { basedir: handler.event.dir.project }));

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