//Requeridos
var gulp = require('gulp');
var sass = require('gulp-sass'); //  the gulp-sass plugin
var browserSync = require('browser-sync').create(); //Instalar Browsersync

//Nombres de carpetas
var source = '_source';
var staging = '_staging';
var distribuition = '_dist'

//Task de ejemplo
gulp.task('hello', function() {
    console.log('Hello World');
  });

/*
gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
    // ...
  })
*/

// Iniciar el compilador SASS
gulp.task('compilador-sass', function(){
    return gulp.src( source + '/_sass/test.sass')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest( staging + '/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

//Iniciar Browsersync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: staging 
    },
  })
})

//Concatenar tasks

gulp.task('watch', ['browserSync', 'compilador-sass'], function (){
  gulp.watch( source + '/_sass/**/*.+(scss|sass)', ['compilador-sass']);
  // Other watchers
})