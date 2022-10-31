const _ = require('lodash');
const utils = require("../components/utils");
const logger = require('../components/logger').logger;
const Activity = require('./activity');

var activity = new Activity();

const activityListCtrl = (arg) => {
  return new Promise(async (resolve, reject) => {
	activity.activityList(arg).then(async function(data){
		return resolve(utils.prepareResponse(200, "success", data));
  	}).catch(function(catch_error){
		return reject(catch_error);
  	});
  });
}

const activitFilterCtrl = (arg) => {
  return new Promise(async (resolve, reject) => {
	activity.activityFilter(arg).then(async function(data){
		return resolve(utils.prepareResponse(200, "success", data));
  	}).catch(function(catch_error){
		return reject(catch_error);
  	});
  });
}

const statisticCtrl = (arg) => {
  return new Promise(async (resolve, reject) => {
	activity.statisticFilter(arg).then(async function(data){
		return resolve(utils.prepareResponse(200, "success", data));
  	}).catch(function(catch_error){
		return reject(catch_error);
  	});
  });
}


module.exports.list = function list(req, res) {
	let start_benchmark = process.hrtime();
	logger.info({
		route: 'activityListCtrl',
		body: req.body,
		info: 'START - activityListCtrl'
	});
	return activityListCtrl(req)
	.then(function(results) {
		printEndLogs(start_benchmark, 'activityListCtrl', results, 'END - activityListCtrl with success');
		return res.send(results);
	})
	.catch(reason => {
		printEndLogs(start_benchmark, 'activityListCtrl', reason, 'END - activityListCtrl with error');
		return res.status(reason.statusCode).send(reason);
	})
};

module.exports.filter = function filter(req, res) {
	let start_benchmark = process.hrtime();
	logger.info({
		route: 'activityFilterCtrl',
		body: req.body,
		info: 'START - activityFilterCtrl'
	});
	return activitFilterCtrl(req)
	.then(function(results) {
		printEndLogs(start_benchmark, 'activityFilterCtrl', results, 'END - activityFilterCtrl with success');
		return res.send(results);
	})
	.catch(reason => {
		printEndLogs(start_benchmark, 'activityFilterCtrl', reason, 'END - activityFilterCtrl with error');
		return res.status(reason.statusCode).send(reason);
	})
};

module.exports.statistic = function statistic(req, res) {
	let start_benchmark = process.hrtime();
	logger.info({
		route: 'statisticCtrl',
		body: req.body,
		info: 'START - statisticCtrl'
	});
	return statisticCtrl(req)
	.then(function(results) {
		printEndLogs(start_benchmark, 'statisticCtrl', results, 'END - statisticCtrl with success');
		return res.send(results);
	})
	.catch(reason => {
		printEndLogs(start_benchmark, 'statisticCtrl', reason, 'END - statisticCtrl with error');
		return res.status(reason.statusCode).send(reason);
	})
};

var printEndLogs = function(start_benchmark, route, results, info) {
	const diff = process.hrtime(start_benchmark);
		logger.info({
		route: route,
		results: results,
		info: info,
		benchmark: ((((+diff[0]) * 1e9) + (+diff[1])) / 1000000)
	});
};

