var express = require('express')
var router = express.Router()

var Db = require('mysql-activerecord')
var db = new Db.Adapter({
    server: '127.0.0.1',
    username: 'root',
    password: '',
    database: 'tjcsnews',
    reconnectTimeout: 2000
})

// 通过新闻版块代码获取新闻。

function getNewsTitleByCategory(req, res) {
    var count = parseInt(req.params.count)
    var fc = db.select('nm_title, date_format(insert_time, \'%m-%d\') as insert_date').where({
        'nm_status': '1',
        'nm_category': req.params.cat
    }).order_by('nm_id desc')
    if (count != 0) {
        fc = fc.limit(parseInt(req.params.count))
    }
    fc.get('news_main', function(err, results) {
        res.json(results)
        console.log(err)
    })
}

// 获取统计数据。

function getStatsData(req, res) {
    db.select('d_data').where({
        'd_type': req.params.type,
        'd_year': req.params.year
    }).order_by('d_month').get('data', function(err, results) {
        res.json(results)
        console.log(err)
    })
}

// 通过新闻ID获取完整新闻，当ID等于0时为全部显示，否则为只显示一条记录。

function getNewsById(req, res) {
    if (!parseInt(req.params.id)) {
        db.select('nm_id, nm_title, nm_category, dnc_name, date_format(news_main.insert_time, \'%Y年%c月%e日\') as insert_date, news_main.insert_time as insert_time, nm_content').join('d_news_category', 'news_main.nm_category = d_news_category.dnc_id').where({
            'nm_status': '1'
        }).get('news_main', function(err, results) {
            res.json(results)
            console.log(err)
        })
    } else {
        db.select('nm_id, nm_title, nm_category, dnc_name, date_format(news_main.insert_time, \'%Y年%c月%e日\') as insert_date, news_main.insert_time as insert_time, nm_content').join('d_news_category', 'news_main.nm_category = d_news_category.dnc_id').where({ 'nm_id': req.params.id, 'nm_status': '1' }).get('news_main', function(err, results) {
            res.json(results)
            console.log(err)
        })
    }

}

// 获取新闻版块。

function getNewsCategory(req, res) {
    db.select('dnc_id, dnc_name').where({ 'status': '1' }).get('d_news_category', function(err, results) {
        res.json(results)
        console.log(err)
    })
}

// 向数据库中插入新闻记录，插入主表news_main。
function insertNews(req, res) {
    var message
    var d = new Date()
    db.insert('news_main', {
        nm_title: req.body.nm_title,
        nm_content: req.body.nm_content,
        nm_publisher: '01',
        nm_category: req.body.nm_category,
        nm_status: '1',
        insert_time: d.toLocaleString(),
        alter_time: d.toLocaleString()
    }, function(err) {
        if (!err) {
            message = '新闻添加成功！'
        } else {
            message = '新闻添加失败：' + err
        }
        res.json({
            msg: message
        })
    })
}

// 更新数据库中的新闻记录，更新主表news_main。
function updateNews(req, res) {
    var d = new Date()
    db.where({
        nm_id: req.params.id
    }).update('news_main', {
        nm_title: req.body.nm_title,
        nm_content: req.body.nm_content,
        nm_category: req.body.nm_category,
        alter_time: d.toLocaleString()
    }, function(err) {
        if (!err) {
            message = '新闻修改成功！'
        } else {
            message = '新闻修改失败：' + err
        }
        res.json({
            msg: message
        })
    })
}

// 删除数据库中的新闻记录，将主表news_main中的对应记录有效标志改为0。
function updateNewsToDisabled(req, res) {
    var d = new Date()
    db.where({
        nm_id: req.params.id
    }).update('news_main', {
        nm_status: '0',
        alter_time: d.toLocaleString()
    }, function(err) {
        if (!err) {
            message = '新闻删除成功！'
        } else {
            message = '新闻删除失败：' + err
        }
        res.json({
            msg: message
        })
    })
}

router.get('/news/cat/:cat/count/:count', getNewsTitleByCategory)

router.get('/news/id/:id', getNewsById)

router.get('/data/:type/:year', getStatsData)

router.get('/cat', getNewsCategory)

router.delete('/news/id/:id', updateNewsToDisabled)

router.put('/news/id/:id', updateNews)

router.post('/insertnews', insertNews)

module.exports = router