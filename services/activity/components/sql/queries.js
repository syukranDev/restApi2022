const axios  = require('axios')

var activityList = async (arg) => {
    // return new Promise(async function(resolve, reject) {
    //     // const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //     const data = 'Hi this is a test'
    //     return resolve({ "testData" : data})
    // })
    return promise = new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/posts/').then((result) => {
            resolve(result.data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = {
    activityList :  activityList
}