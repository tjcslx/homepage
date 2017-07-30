var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res, next) {
    res.render('news', {
        title: req.params.id,
        paragraph: 'paragraph'
    })
})

module.exports = router
