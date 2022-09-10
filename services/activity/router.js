const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router()
const config = require('config')

var controller = require('./model/controller')

app.use(function (request, response, next) {
    // below wont work without gateway setup
    // response.header("Access-Control-Allow-Origin", config.ACCESS_CONTROL_ALLOW_ORIGIN);
    // response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    // response.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    // response.header('Access-Control-Allow-Credentials', true);
    // response.header('Access-Control-Max-Age', '86400');
    next();
});

app.disable("x-powered-by");
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

// if 404 show this instead
app.use (function (err, req, res, next){
    if (err) res.status(400).json({ message: 'Invalid JSON'});
    else next();
});

app.use('/app/portal/activity/', router);

router.route('/list')
.get((...args) => controller.list(...args))

router.route('/test')
.get(function(req,res){
    res.send('Hello this is test page')
})

module.exports = app