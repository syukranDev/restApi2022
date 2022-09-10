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
}





