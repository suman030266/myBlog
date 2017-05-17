## 安装全局express命令
	npm install -g express-generator

## 初始化一个express项目
	express -e myBlog
	cd myBlog && npm install 进入项目安装所有依赖
	SET DEBUG=myBlog:* && npm start
	set debug可以不设置 直接 npm start
	在浏览器里访问 http://localhost:3000

## 生成.gitignore文件  提交代码时忽略的文件
	touch .gitignore
		node_modules
		.idea
		lib



