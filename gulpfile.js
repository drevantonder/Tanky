const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('build:server:clean', function() {
  console.log('Cleaning build folder...');
  return run('yarn run clean', { silent: true }).exec();
});

gulp.task('build:server:compile', ['build:server:clean'], function() {
  console.log('Compiling Typescript...');
  return run('yarn run compile', { silent: true }).exec();
});

gulp.task('build:server',['build:server:clean', 'build:server:compile']);

gulp.task('build:client:webpack', function() {
  console.log("Webpacking...")
  return run('npx webpack', { silent: true }).exec();
});

gulp.task('build:client',['build:client:webpack']);

gulp.task('run:server', ['build:server', 'build:client'], function(){
  console.clear();
  console.log('Running Server...');
  return run('yarn run server').exec();
});

gulp.task('default', ['build:client', 'build:server', 'run:server'], function() {
  console.log('Done');
});
