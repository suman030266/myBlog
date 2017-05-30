let express = require('express');
let { checkLogin, checkNotLogin } = require('../auth');
let router = express.Router();
let { Article } = require('../model');

//发表文章 get
router.get('/add', checkLogin, function(req, res){
    res.render('article/add', {
        title: '发表文章',
        article: {}
    });
});

//发表文章 post
router.post('/add', checkLogin, function(req, res){
    let article = req.body;
    article.user = req.session.user._id;
    Article.create(article, function(err, result){
        if(err){
            req.flash('error', err);
            res.redirect('back');
        }else{
            req.flash('success', '文章发表成功');
            res.redirect('/');
        }
    })
});

//文章详情
router.get('/detail/:_id', function(req, res){
    let _id = req.params._id;
    Article.findById(_id, function(err, article){
        if(err){
            req.flash('error', err);
            res.redirect('back');
        }else{
            res.render('article/detail', {
                title:'文章详情',
                article
            });
        }
    })
});

//删除文章
router.get('/delete/:_id', function(req, res){
    let _id = req.params._id;
    Article.remove({_id}, function(err, result){
        if(err){
            req.flash('error', err);
            res.redirect('back');
        }else{
            req.flash('success', '删除文章成功');
            res.redirect('/');
        }
    });
});

//更新文章 get
router.get('/update/:_id', function(req, res){
    let _id = req.params._id;
    Article.findById(_id,function(err, article){
        res.render('article/add', {
            title: '更新文章',
            article
        });
    })
});

//更新文章 post
router.post('/update/:_id', function(req, res){
   let _id = req.params._id;
   Article.update({_id}, req.body, function(err, result){
      if(err){
          req.flash('error', err);
          res.redirect('back');
      }else{
          req.flash('success', '文章更新成功');
          res.redirect('/article/detail/'+_id);
      }
   });
});

module.exports = router;