const _ = require('lodash');
const utils = require("../components/utils");
const logger = require('../components/logger').logger;
const Activity = require('./activity');

var activity = new Activity();

const activityListCtrl = (arg) => {
  return new Promise(async (resolve, reject) => {
	activity.activityList(arg).then(async function(data){
		return resolve(utils.prepareResponse('MH000', 200, "success", data));
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

var printEndLogs = function(start_benchmark, route, results, info) {
	const diff = process.hrtime(start_benchmark);
		logger.info({
		route: route,
		results: results,
		info: info,
		benchmark: ((((+diff[0]) * 1e9) + (+diff[1])) / 1000000)
	});
};

