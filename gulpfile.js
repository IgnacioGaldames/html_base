//Requeridos
const gulp = require('gulp');
const sass = require('gulp-sass'); //  the gulp-sass plugin
const browserSync = require('browser-sync').create(); //Instalar Browsersync
const sourcemaps = require('gulp-sourcemaps'); //Añadir sourcemaps a sass
const child = require('child_process');
const useref = require('gulp-useref');

//Nombres de carpetas
const source = '_source';
const staging = '_staging';
const dist = '_dist'

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
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(sourcemaps.write('./')) 
      .pipe(gulp.dest( staging + '/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// Jekyll Task
gulp.task('jekyll', function() {
  const jekyll = child.spawn('jekyll', ['build','--watch', '--incremental'])
  return gulp.src(source)
      .pipe(browserSync.reload({
          stream: true
      }))
});

//Concatenar JS
gulp.task('useref', function(){
  return gulp.src( '_staging/*.html')
    .pipe(useref())
    .pipe(gulp.dest('_dist'))
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

gulp.task('watch', ['browserSync', 'compilador-sass', 'jekyll'], function (){
  gulp.watch( source + '/_sass/**/*.+(scss|sass)', ['compilador-sass']);
  // Other watchers
  gulp.watch( source + '/**/*', ['jekyll', 'compilador-sass']);
  gulp.watch( staging + '/*.html', browserSync.reload); 
  gulp.watch( staging + '/js/**/*.js', browserSync.reload); 
})