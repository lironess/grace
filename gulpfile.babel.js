import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

const paths = {
  source: 'src/**/*.js',
  destination: 'dist'
}

gulp.task('clean', (done) => {
  del([paths.destination], done);
});

gulp.task('compile', () => {
  gulp.src(paths.source)
    .pipe(babel())
    .pipe(gulp.dest(paths.destination))
});

gulp.task('start', (done) => {
  nodemon({
    script: 'src/server.js',
    ext: 'js',
    exec: 'babel-node'
  });
});

gulp.task('build', [ 'clean', 'compile' ]);
gulp.task('default', [ 'start' ]);