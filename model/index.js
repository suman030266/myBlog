let mongoose = require('mongoose');
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(require('../config').dbUrl);

//user model
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});
let User = mongoose.model('User',UserSchema);
exports.User = User;

//article model
let ArticleSchema = new mongoose.Schema({
    title: String,
    content: {
    	type: String
    },
    createAt:{
    	type: Date,
    	default: Date.now
    },
    user: {
    	type: ObjectId,
    	ref: 'User'
    }
});
let Article = mongoose.model('Article', ArticleSchema);
exports.Article = Article;
