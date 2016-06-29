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
// var config;
var _event;

function handler() {}
module.exports = handler;

var loadConfig = function() {
	console.log("Loading alloy config file");
	// handler.config = require(path.join(path.relative(__dirname, handler.event.dir.resourcesPlatform), "alloy", "CFG"));
	handler.config = require(path.join(handler.event.dir.resourcesPlatform, "alloy", "CFG"));
	// handler.logger.trace(JSON.stringify(handler.config, null, 2));
	handler.config.tasks = handler.config.tasks || {};

	_.defaults(handler.config.tasks, {
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

	var tasks = handler.config.tasks[eventName] || [];
	handler.logger.error("tasks: " + JSON.stringify(tasks));

	_.forEach(tasks, function(task) {

		if(_.isString(task)) {
			task = { id: task }
		}

		var taskParams = {
			event: handler.event,
			config: handler.config,
			logger: handler.logger
		};

		_.defaults(taskParams, task);
		handler.logger.trace("executing task: " + task.id);
		var target = require(resolve.sync(task.id, { basedir: handler.event.dir.project }));
		_.isFunction(target) && target(taskParams);

	});

}

var events = ["preload", "precompile", "postcompile", "appjs"];
_.forEach(events, function(eventName) {
	handler[eventName] = function(event, logger) {
		logger.warn("********************* STARTING EVENT: " + eventName + " ***************************");
		handler.logger = logger;
		handler.event = event;
		executeScripts(eventName);
		logger.warn("********************* FINISHED EVENT: " + eventName + " ***************************");
	}
});