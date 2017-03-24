var gulp        = require('gulp'),
    minify      = require('gulp-minifier'),
    concatJs    = require('gulp-concat');
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
    return gulp.src(config.assetsPath + '/css/general/*.css')
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest(config.assetsPath + '/css'));
});

gulp.task('concatJs', function() {
  return gulp.src(['./src/assets/js/vendor/jquery.min.js', './src/dist/js/bootstrap.js', './src/assets/js/docs.min.js', './src/assets/js/src/fontface-observer.js', './src/assets/js/ie10-viewport-bug-workaround.js', './src/assets/js/loadcss.js'])
    .pipe(concatJs('bundle.js'))
    .pipe(gulp.dest(config.assetsPath + '/js/src'));
});

/* ============================================================
    Minify
     ============================================================ */

gulp.task('minifyCss', function() {
    return gulp.src(config.assetsPath + '/css/bundle.css').pipe(minify({
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
    return gulp.src(config.assetsPath + '/js/src/bundle.js').pipe(minify({
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: false,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('src/dist/js'));
});

