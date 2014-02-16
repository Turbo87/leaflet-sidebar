var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var pkg = require('./package.json');
var basename = pkg.name + '-' + pkg.version;
var banner = '/*! {{ pkg.name }} v{{ pkg.version }} */';


// Lint JS + CSS
gulp.task('lint', function() {
  gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());

  gulp.src('./src/*.css')
    .pipe(csslint({
      'adjoining-classes': false,
      'box-sizing': false,
      'fallback-colors': false
    }))
    .pipe(csslint.reporter());
});

// Concat JS + CSS
gulp.task('concat', function() {
    gulp.src('./src/*.js')
        .pipe(concat(basename +'.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/*.css')
        .pipe(concat(basename +'.css'))
        .pipe(gulp.dest('./dist'));
});

// Minify JS + CSS
gulp.task('minify', ['concat'], function() {
    gulp.src('./src/' + basename + '.js')
        .pipe(rename(basename + '.min.js'))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/' + basename + '.css')
        .pipe(rename(basename + '.min.css'))
        .pipe(minifyCSS())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist'));
});

// Package for distribution
gulp.task('zip', ['minify'], function() {
    gulp.src([
      'README.md',
      'LICENSE',
      'dist/' + basename + '.js',
      'dist/' + basename + '.min.js',
      'dist/' + basename + '.css',
      'dist/' + basename + '.min.css',
    ])
    .pipe(rename(function (dir, base, ext) {
        return (dir == 'dist' ? '../' : '') + base + ext;
    }))
    .pipe(zip(basename + '.zip'))
    .pipe(gulp.dest('dist'));
});

// Cleanup
gulp.task('clean', function() {
  gulp.src('./dist', {read: false})
    .pipe(clean());
});

// Watch JS + CSS Files
gulp.task('watch', function(){
  gulp.run('lint');
  gulp.watch(['./src/*.js', './src/*.css'], function(event){
    gulp.run('lint');
  });
});

// Default
gulp.task('default', function(){
  gulp.run('lint', 'minify');
});
