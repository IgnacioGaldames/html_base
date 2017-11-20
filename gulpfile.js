var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

gulp.task('hello', function() {
    console.log('Hello World');
  });

gulp.task('compilador-sass', function(){
    //return gulp.src('_source/_sass/**/*.+(scss|sass)')
    //return gulp.src('_source/_sass/cardumen.sass)')
    return gulp.src('_source/_sass/test.sass)')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('_staging/css'))
});

//gulp.watch('files-to-watch', ['tasks', 'to', 'run']);

gulp.watch('_source/_sass/**/*.+(scss|sass)', ['compilador-sass']);