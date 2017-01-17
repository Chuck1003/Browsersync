var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var broserSync = require('browser-sync');
var reload = broserSync.reload;
var os = require('os');

//获取内网ip
function getLocalIp(){
    try {
        var map = [];
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            if(ifaces[dev][1].address.indexOf('10.101') != -1) {
                return ifaces[dev][1].address;
            }
        }
        return map;
    } catch (err) {
        return "localhost";
    }
}

gulp.task('less',function(){
	return gulp.src('static/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('static/css'))
		.pipe(reload({ stream:true }));
});

gulp.task('html',function(){
	return gulp.src('../*.html')
		.pipe(reload("*.html"))
})

gulp.task('js',function(){
	return gulp.src('static/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'))
		.pipe(reload({ stream:true }));
});

gulp.task('serve', function(){
	broserSync({
		// server 和 proxy不能同时使用
		// server:{
		// 	baseDir:'Gulp'
		// },
		//port:5002,//代理后打开的端口,如有冲突，自动+1
		logLevel:"debug",
		logPrefix:"insgeek",
		proxy:"http://"+ getLocalIp() +":5002/",
		ghostMode:{
			click:true,
			forms:true,
			scroll:true
		},
		browser:"chrome"
	});

	gulp.watch('static/less/*.less',['less']);
	gulp.watch('*.html',['html']);
	gulp.watch('static/js/*.js',['js']);
})

gulp.task('default',['serve']);