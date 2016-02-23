import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';

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

gulp.task('default', ['clean', 'compile']);

gulp.task('watch', () => {
  gulp.watch(paths.source, ['default'])
});