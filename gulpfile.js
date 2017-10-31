var landingName = "landing_";

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir:  landingName + ''
    },
  })
})
gulp.task('sass', function() {
  return gulp.src('sass/*.+(scss|sass)')// Gets all files ending with .scss in app/scss
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest( landingName + '/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('default', ['browserSync', 'sass'], function (){
  gulp.watch('sass/*.+(scss|sass)', ['sass']); 
  // Other watchers
  gulp.watch( landingName + '/*.html', browserSync.reload); 
  gulp.watch( landingName + '/js/**/*.js', browserSync.reload); 
});