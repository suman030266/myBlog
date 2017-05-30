let express = require('express');
let { User } = require('../model');
let multer = require('multer');
let uploads = multer({dest:'public/uploads'});
let {checkLogin,checkNotLogin} = require('../auth');
let router = express.Router();

//注册 get
router.get('/signup',checkNotLogin,function(req, res){
    res.render('user/signup', {
        title: '注册'
    });
});

//注册 post
router.post('/signup', checkNotLogin, uploads.single('avatar'), function(req, res){
    let userMes = req.body;
    userMes.avatar = `/uploads/${req.file.filename}`;
    // 先查看用户名是否已存在
    User.findOne({ username: userMes.username }, function (err, doc){
        if(err){
            req.flash('error', '数据库操作失败 登录失败');
            console.error(err);
            res.redirect('back');
        }else{
            if(doc){
                // 用户已存在
                req.flash('error', '用户已存在');
                console.log('用户已存在');
                res.redirect('back');
            }else{
                // 用户不存在
                User.create(userMes, function (err, docs){
                    if(err){
                        console.error(err);
                        req.flash('error', '用户注册失败');
                        res.redirect('back');
                    }else{
                        console.log('注册成功')
                        req.flash('success', '注册成功');
                        res.redirect('/user/signin');
                    }
                });
            }
        }
    });
});

//登录 get
router.get('/signin', checkNotLogin, function (req, res) {
    res.render('user/signin', {
        title:'登录'
    });
});

//登录 post
router.post('/signin', checkNotLogin, function(req, res){
    let userMes = req.body;
    if(userMes.username && userMes.password){
        User.findOne({ username: userMes.username }, function (err, doc){
            if(err){
                req.flash('error', '数据库操作失败 登录失败');
                console.error(err);
                res.redirect('back');
            }else{
                if(doc){
                    // 找到用户
                    if(userMes.password == doc.password){
                        // 判断密码 正确
                        console.log('登录成功');
                        req.flash('success', '登录成功');
                        req.session.user = doc;
                        res.redirect('/');
                    }else{
                        // 密码有误
                        console.log('密码有误');
                        req.flash('error', '密码有误');
                        res.redirect('back');
                    }
                }else{
                    // 用户不存在
                    req.flash('error', '用户不存在');
                    console.log('用户不存在');
                    res.redirect('back');
                }
            }
        });
    }else{
        console.error('没有用户名或密码');
        req.flash('error', '没有用户名或密码');
        res.redirect('back');
    }
});

//退出
router.get('/signout',checkLogin,function (req,res) {
    req.session.user = null;
    req.flash('success','用户退出成功');
    res.redirect('/user/signin');
});

module.exports = router;