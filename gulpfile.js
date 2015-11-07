var gulp = require('gulp');
var watch = require('gulp-watch');
var ts = require('gulp-ts');
var notify = require('gulp-notify');
var del = require('del');

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('build', ['clean'], function() {
  gulp.src("*.ts")
    .pipe(ts())
    .pipe(gulp.dest(''))
    .pipe(notify("Typescript compilation complete"));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch("*.ts", ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'build']);