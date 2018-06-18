const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('build:server:clean', () => run('yarn run clean', { silent: true }).exec());

gulp.task('build:server:compile', ['build:server:clean'], () => run('yarn run compile', { silent: true }).exec());

gulp.task('build:server',['build:server:clean', 'build:server:compile']);

gulp.task('build:client:webpack', () => run('npx webpack', { silent: true }).exec());

gulp.task('build:client',['build:client:webpack']);

gulp.task('run:server', ['build:server', 'build:client'], () => {
  console.clear();
  console.log('Running Server...');
  return run('yarn run server').exec();
});

gulp.task('default', ['build:client', 'build:server', 'run:server'], () => console.log('Done'));

gulp.task('watch', () => {
  gulp.watch("src/server/**/*", ['run:server'])
  gulp.watch("src/client/**/*", ['run:server'])
})
