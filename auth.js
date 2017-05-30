//检查用户是否登录 登录跳首页 没登录继续往下走
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        res.redirect('/');
    }else{
        next();
    }
}

//检查用户是否登录 登录继续 没登录跳转到登录页
exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/user/signin');
    }
}