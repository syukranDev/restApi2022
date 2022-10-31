var _ = require("lodash");
const logger = require('../components/logger').logger;
const sql = require('../components/sql/queries');

//renaming class auth for future auth implementation
module.exports = class test {
  activityList(req){ 
    return new Promise((resolve, reject) => {
      return sql.activityList(req)
        .then(results => {
          logger.info({
            path: 'activityList',
            data: results
          });  
          return resolve(results);
        })
        .catch(reason => {
          logger.error({
            path: 'activityList catch',
            info: 'activityList failed',
            reason: reason
          })
          return reject(reason);
        });
    });
  }

  activityFilter(req){ 
    return new Promise((resolve, reject) => {
      return sql.activityFilter(req)
        .then(results => {
          logger.info({
            path: 'activityFilter',
            data: results
          });  
          return resolve(results);
        })
        .catch(reason => {
          logger.error({
            path: 'activityFilter catch',
            info: 'activityFilter failed',
            reason: reason
          })
          return reject(reason);
        });
    });
  }

  statisticFilter(req){ 
    return new Promise((resolve, reject) => {
      return sql.statisticFilter(req)
        .then(results => {
          logger.info({
            path: 'statisticFilter',
            data: results
          });  
          return resolve(results);
        })
        .catch(reason => {
          logger.error({
            path: 'statisticFilter catch',
            info: 'statisticFilter failed',
            reason: reason
          })
          return reject(reason);
        });
    });
  }

  
}





