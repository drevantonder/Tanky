const gulp = require('gulp');
const run = require('gulp-run');
const webpack = require('webpack-stream');

gulp.task('build-clean', function() {
  console.log('Cleaning build folder...');
  return run('yarn run clean').exec();
});

gulp.task('typescript-compile', function() {
  console.log('Compiling Typescript...');
  return run('yarn run compile').exec();
});

gulp.task('typescript', ['build-clean','typescript-compile'])

gulp.task('copy-html', ['build-clean'], function() {
  console.log('Copying html files...');
  return gulp.src('src/client/*.html')
    .pipe(gulp.dest('build/client/dist/'))
});

gulp.task('build-webpack', ['typescript', 'copy-html'], function() {
  console.log("Webpacking...")
  return gulp.src('build/client/pre-webpack/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/client/dist/'));
});

gulp.task('build',['build-webpack']);

gulp.task('default', ['build'], function() {
  console.log('Done');
});
