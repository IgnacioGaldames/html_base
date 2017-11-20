var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

gulp.task('hello', function() {
    console.log('Hello World');
  });

gulp.task('sass', function(){
    return gulp.src('_source/_sass/test.sass')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('_staging/css'))
});

gulp.watch('_source/_sass/**/*.+(scss|sass)', ['sass']);