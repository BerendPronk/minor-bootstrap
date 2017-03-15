var gulp        = require('gulp'),
    minify      = require('gulp-minifier'),
    concatCss   = require('gulp-concat-css');


/* ============================================================
    Main tasks
     ============================================================ */

gulp.task('default', ['minifyCss', 'minifyJs']);

/* ============================================================
    Configuration
     ============================================================ */

var config = {
    assetsPath: 'src/assets',
    debug: true
};

var handleError = function(err) {
    gutil.log(err);
    this.emit('end')
};

/* ============================================================
    Concatenate
     ============================================================ */

gulp.task('concatCss', function () {
    return gulp.src(config.assetsPath + '/css/src/*.css')
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest(config.assetsPath + '/css/src'));
});

/* ============================================================
    Minify
     ============================================================ */

gulp.task('minifyCss', function() {
    return gulp.src(config.assetsPath + '/css/src/bundle.css').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: false,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
    })).pipe(gulp.dest('src/dist/css'));
});

gulp.task('minifyJs', function() {
    return gulp.src(config.assetsPath + '/css/src/bundle.css').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: false,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
    })).pipe(gulp.dest('src/dist/css'));
});

