var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('build-clean', function() {
  console.log('Cleaning build folder...');
  return clean = run('yarn run clean').exec();
});

gulp.task('typescript-compile', function() {
  console.log('Compiling Typescript...');
  let compile = run('yarn run compile').exec();
});

gulp.task('typescript', ['build-clean', 'typescript-compile'])

gulp.task('default', ['typescript'], function() {
  console.log('Copying html files...');
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'))
});
