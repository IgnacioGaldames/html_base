//Requeridos
const gulp = require('gulp');
const sass = require('gulp-sass'); //  the gulp-sass plugin
const browserSync = require('browser-sync').create(); //Instalar Browsersync
const sourcemaps = require('gulp-sourcemaps'); //Añadir sourcemaps a sass
const child = require('child_process');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');

var clean = require('gulp-clean');

const runSequence = require('run-sequence');
//const del = require('del');

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
gulp.task('compilador-sass', function() {
    return gulp.src(staging + '/_sass/**.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(staging + '/css'))
        /*.pipe(browserSync.reload({
        stream: true
  }))*/
});

// Jekyll Task
gulp.task('jekyll', function() {
    const jekyll = child.spawn('jekyll', ['build', '--watch', '--incremental'])
    return gulp.src(source)
        /*
            .pipe(browserSync.reload({
                stream: true
            }))*/
});

//Concatenar JS
gulp.task('useref', function() {
    return gulp.src(staging + '/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(dist))
});

//Minificar Imágenes
gulp.task('images', function() {
    return gulp.src(staging + '/img/**/*.+(png|jpg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(imagemin({
            interlaced: true
        }))
        .pipe(gulp.dest(dist + '/img'))
});

//Copiar Fuentes
gulp.task('fonts', function() {
    return gulp.src(staging + '/fonts/**/*')
        .pipe(gulp.dest(dist + '/fonts'))
})

//Copiar CSS
gulp.task('css', function() {
    return gulp.src(staging + '/css/**/*')
        .pipe(gulp.dest(dist + '/css'))
})

//Iniciar Browsersync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: staging
        },
    })
})

//Concatenar tasks
gulp.task('watch', function() {
    gulp.watch(staging + '/_sass/**/*.+(scss|sass)', ['compilador-sass']);
    // Other watchers
    //gulp.watch(source + '/**/*', ['jekyll', browserSync.reload]);
    gulp.watch(staging + '/**/*.html', browserSync.reload);
    //gulp.watch( staging + '/js/**/*.js', browserSync.reload);
})

//Limpiar carpeta Dist
/*
gulp.task('clean:dist', function() {
    return del.sync(dist);
})
*/
gulp.task('clean', function() {
    return gulp.src(dist, { read: false })
        .pipe(clean());
});

gulp.task('build', function(callback) {
    runSequence('clean', ['compilador-sass', 'useref', 'images', 'fonts'],
        callback
    )
})

gulp.task('default', function(callback) {
    runSequence(['compilador-sass', 'browserSync', 'watch'],
        callback
    )
})
