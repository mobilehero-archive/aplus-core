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
 * @aplus/core
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
var debug = require('debug');
var log = debug('aplus');
var warn = debug('aplus');
debug.log = console.info.bind(console);

function handler() {}
module.exports = handler;

// var uglifyjs = require("uglify-js");
handler.preparse = function(func) {
	console.error("********* WRAPPING uglifyjs.parse **********");
	return _.wrap(func, function(func, code, options) {
		console.error("********* PRE:PARSE **********");
		// console.warn(JSON.stringify(code, null, 2));
		// console.warn(JSON.stringify(options, null, 2));

		var params = { code: code };
		executeScripts("preparse", params);
		// console.error("final-code: " + params.code);
		return func(params.code, options);

	});
}

function splitTasks(tasks) {
	var results = [];
	if(!_.isArray(tasks)) {
		tasks = [tasks];
	}
	// handler.logger.trace("tasks: " + JSON.stringify(tasks, null, 2));
	_.forEach(tasks, function(task) {

		if(_.isArray(task.events) && !_.isEmpty(task.events)) {
			_.forEach(task.events, function(event) {
				var splitTask = _.cloneDeep(task);
				splitTask.events = event;
				results.push(splitTask);
			});
		} else {
			results.push(task);
		}

	});
	return results;

}

function configureTasks(tasks) {
	var configuredTasks = [];
	var importedTasks = [];
	// handler.logger.trace("tasks coming into configureTasks(): " + JSON.stringify(tasks, null, 2));
	_.forEach(tasks, function(task) {
		// handler.logger.trace("task: " + JSON.stringify(task, null, 2));
		if(_.isString(task)) {
			// task = { name: task }
			// handler.logger.trace("getting default tasks for module: " + task);
			// handler.logger.error(handler.event.dir.project);
			var target = require(resolve.sync(task, { basedir: handler.event.dir.project }));
			// handler.logger.warn("imported tasks: " + JSON.stringify(importedTasks, null, 2));
			importedTasks = importedTasks.concat(target.tasks || []);
			// handler.logger.error("target.tasks: " + JSON.stringify(target.tasks, null, 2));
			// handler.logger.warn("imported tasks: " + JSON.stringify(importedTasks, null, 2));
			return true;
		} else {
			// handler.logger.trace("adding task: " + JSON.stringify(task, null, 2));
			configuredTasks.push(task);
		}
	});


	if(!_.isEmpty(importedTasks)) {
		handler.logger.debug("Configuring importedTasks")
		configuredTasks = configuredTasks.concat(configureTasks(importedTasks));
		// tasks = _.uniqWith(tasks, function(task1,task2){
		// 	return (task1.module === task2.module) && (task1.event === task2.event) && (task1.params === task2.params);
		// });
	} else {
		handler.configuredTasks = splitTasks(configuredTasks);
		// handler.logger.trace("handler.configuredTasks: " + JSON.stringify(handler.configuredTasks, null, 2));
	}

	// handler.configuredTasks = splitTasks(configuredTasks);
	// handler.logger.warn("handler.configuredTasks: " + JSON.stringify(handler.configuredTasks, null, 2));
	// return configuredTasks;

}

var loadConfig = function() {
	handler.logger.debug("Loading alloy config file");
	// handler.config = require(path.join(path.relative(__dirname, handler.event.dir.resourcesPlatform), "alloy", "CFG"));
	handler.config = require(path.join(handler.event.dir.resourcesPlatform, "alloy", "CFG"));
	// handler.logger.trace(JSON.stringify(handler.config, null, 2));


	// handler.config.tasks = handler.config.tasks || {};

	// _.defaults(handler.config.tasks, {
	// 	preload: [],
	// 	precompile: [],
	// 	postcompile: [],
	// 	appjs: [],
	// });

	handler.config.tasks = handler.config.tasks || [];
	var tasks = _.cloneDeep(handler.config.tasks);
	// handler.logger.trace("handler.config.tasks: " + JSON.stringify(handler.config.tasks, null, 2));
	tasks = configureTasks(tasks);

	// var pendingTasks = [];
	// _.forEach(tasks, function(task) {
	// 	if(_.isString(task)) {
	// 		// task = { name: task }
	// 		handler.logger.trace("getting default tasks for module: " + task.name);
	// 		var target = require(resolve.sync(task.name, { basedir: handler.event.dir.project }));
	// 		pendingTasks.concat(target.tasks || []);
	// 		return false;
	// 	}

	// 	task.events = task.events || [];

	// 	if(_.isEmpty(task.events)) {
	// 		handler.logger.trace("setting up task: " + task.name);
	// 		var target = require(resolve.sync(task.name, { basedir: handler.event.dir.project }));
	// 		task.events = target.events || [];
	// 	}

	// 	if(_.isString(task.events)) {
	// 		task.events = [task.events];
	// 	}

	// });

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

function executeScripts(eventName, params) {

	// handler.logger.trace("handler.configuredTasks: " + JSON.stringify(handler.configuredTasks, null, 2));
	var tasks = _.filter(handler.configuredTasks || [], ['events', eventName]);
	handler.logger.trace("task to execute: " + JSON.stringify(tasks, null, 2));

	params = params || {};

	_.forEach(tasks, function(task) {

		//TODO:  Check to make sure task is an object...

		var taskParams = {
			event: handler.event,
			config: handler.config,
			logger: handler.logger,
			code: params.code,
		};

		_.defaults(taskParams, task);
		handler.logger.debug("executing task: " + task.module);
		var target = require(resolve.sync(task.module, { basedir: handler.event.dir.project }));
		_.isFunction(target.execute) && target.execute(taskParams);

		if(taskParams.code) {
			// handler.logger.error(taskParams.code);
			params.code = taskParams.code;
		}

	});

}

var events = ["preload", "precompile", "postcompile", "appjs"];
_.forEach(events, function(eventName) {
	handler[eventName] = function(event, logger) {
		// handler.logger = logger;
		debug.trace = logger.trace.bind(logger);
		debug.warn = logger.debug.bind(logger);
		debug.info = logger.info.bind(logger);
		debug.warn = logger.warn.bind(logger);
		debug.error = logger.error.bind(logger);
		handler.logger = debug;

		handler.logger.warn("********************* STARTING EVENT: " + eventName + " ***************************");
		handler.logger = logger;
		// debug.trace = logger.trace.bind(logger);
		// debug.warn = logger.debug.bind(logger);
		// debug.info = logger.info.bind(logger);
		// debug.warn = logger.warn.bind(logger);
		// debug.error = logger.error.bind(logger);
		// handler.logger = debug;

		// handler.logger.warn("THIS IS A TEST!!!");

		handler.event = event;
		executeScripts(eventName);
		handler.logger.warn("********************* FINISHED EVENT: " + eventName + " ***************************");
	}
});