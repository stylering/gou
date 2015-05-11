'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    compressor = require('gulp-compressor'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    path = require('path')
    ;


// 控制台显示错误
function errorHandler(e) {
    gutil.beep();
    gutil.log(e);
}

// stylus ==> css 编译 ==> 压缩
var stylusPath = './assets/stylus',
    cssPath = './assets/css'
    ;
gulp.task('stylus', function() {
    return gulp.src(stylusPath + '/style.source.styl')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(stylus())
        .pipe(gulp.dest(cssPath))
        .pipe(rename('style.css'))
        .pipe(compressor({type: 'css'}))
        .pipe(gulp.dest(cssPath));

});

var src = './assets/js',
    dest = './assets/build',
    webpackOptions = {
        debug: true,
        // devtool: '#source-map',
        watchDelay: 200
    },
    webpackConfig = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME
    ;

gulp.task('webpack', [], function() {
    return gulp.src(path.join(path.join(src, '**', CONFIG_FILENAME)), { base: path.resolve(src) })
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOptions))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(path.join(src, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(src) })
                .pipe(webpack.closest(CONFIG_FILENAME))
                .pipe(webpack.configure(webpackConfig))
                .pipe(webpack.overrides(webpackOptions))
                .pipe(webpack.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });

    gulp.watch(stylusPath + '/*.source.styl').on('change', function(event) {
        var pathName = event.path;
        var fileName = pathName.substr(pathName.lastIndexOf('\\') +1);
        var name = fileName.match(/(.*)\.source\.styl/)[1];
        console.log(name);
        return gulp.src(pathName)
                .pipe(plumber({errorHandler: errorHandler}))
                .pipe(stylus())
                .pipe(gulp.dest(cssPath))
                .pipe(rename(name + '.css'))
                .pipe(compressor({type: 'css'}))
                .pipe(gulp.dest(cssPath));
    })
});
