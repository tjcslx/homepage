var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '天津市财税政务网' })
})

module.exports = router
