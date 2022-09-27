const axios  = require('axios');
const test = require('../../model/activity');

var activityList = (arg) => {
    return promise = new Promise(async (resolve, reject) => {
        try{
            const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
            const { data: comments } = await axios.get('https://jsonplaceholder.typicode.com/comments')
            //posts - post_id
            //comments - postID

            let postWithCommentCount = []
        
            if (posts && comments) { // if exist
                if (posts.length>0){ // if exist
                    for (const post of posts) {
                        let newRecord = {
                        post_id: post.id || null,
                        post_title: post.title || null,
                        post_body: post.body || null,
                        total_number_of_comments: 0
                        }

                        if (comments.length>0){ // if exist
                            for (const comment of comments) {
                                if (comment.postId === newRecord.post_id) {
                                    newRecord.total_number_of_comments += 1
                                }
                            }
                        }
                        postWithCommentCount = [...postWithCommentCount, newRecord]
                    }
                }
            }
            var sorted = postWithCommentCount.sort(function(a, b) {return b.total_number_of_comments - a.total_number_of_comments});
            // if asc : a-b // if desc : b-a
            resolve(sorted) 
        } catch (err) {
            reject({
                statusCode: 500,
                message: 'System Error'
            })
        }
       
    });
}

var activityFilter = (arg) => {
    return promise = new Promise(async (resolve, reject) => {
        try {
            const { data: records } = await axios.get('https://jsonplaceholder.typicode.com/comments')
            var result = records.filter(d => d.name.includes(arg.body.filter_value) || d.email.includes(arg.body.filter_value) || d.body.includes(arg.body.filter_value))

            resolve(result)
        } catch(err){
            reject({
                statusCode: 500,
                message: 'System Error'
            })
        }
    })
}

//2nd method for list top posts/comments, need to debug 
// var activityList = (arg) => {
//     return promise = new Promise((resolve, reject) => {
//         axios.get('https://jsonplaceholder.typicode.com/posts/')    
//         .then((result) => {
//                 let res = result.data;
//                 let records = res.map((elem) => { 
//                         return {
//                             post_id: elem.id,
//                             post_title: elem.title || null,
//                             post_body: elem.body || null
//                             //total_number_of_comments: 
//                         }; 
//                 })
//             return records

//         // }).then(async (records) =>{
//         //     let testNumber = await getCommentNumber(records[0].post_id)
//         //     console.log('Your test number ===> ' + testNumber)
//         //     if (records && records.length > 0) {
//         //         records.forEach(async (record) => {
//         //             record.total_number_of_comments = testNumber
//         //         })
//         //     }
//         //     resolve(records)

//         }).then(async (records) =>{
//             if (records && records.length > 0) {
//                 records.forEach(async (record) => {
//                     record.total_number_of_comments = await getCommentNumber(record.post_id) || null
//                 })
//             }
//             resolve(records)
            
//         }).catch((err) => { reject(err); })
//     });
// }


// async function getCommentNumber(id) {
//     let records = await axios.get('https://jsonplaceholder.typicode.com/posts/'+ id +'/comments')
//     return records.data.length
// }

module.exports = {
    activityList :  activityList,
    activityFilter : activityFilter
}