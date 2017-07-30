var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('backend', { title: '天津市财税政务网-后台管理' })
})

module.exports = router
