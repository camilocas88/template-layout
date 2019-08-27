var rutaCSS = 'deploy/css/'; // ruta del CSS final
var rutaJS = 'deploy/js/'; // ruta del archivo JS final
var rutaIMG = 'deploy/img/'; //carpeta donde compila las imágenes
var nameJS = 'mainscript.js'; //nombre final de los archivos concatenados

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");


gulp.task('images', () =>
	gulp.src('sources/images/*/*')
		.pipe(imagemin())
		.pipe(gulp.dest(rutaIMG))
);

gulp.task('styles', function(){
	gulp.src(['sources/sass/main.scss'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(rutaCSS))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss({keepSpecialComments: 1, processImport: false}))
		.pipe(gulp.dest(rutaCSS))
});

gulp.task('scripts', function(){
	return gulp.src([
		'sources/js/utilidades.js',
		'sources/js/script.js',
		'sources/js/front.js'
	])
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(concat(nameJS))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest(rutaJS));
});



gulp.task('watch', function() {
	//gulp.watch('jade/*.jade',['templates']);
	//gulp.watch('jade/includes/*.jade',['templates']);
	// ↓↓↓ Sass watch
	gulp.watch('sources/sass/**/*.scss', ['styles']);
	gulp.watch('sources/js/*.js', ['scripts']);
	// gulp.watch('sources/images/*/*', ['images']);
	//gulp.watch('js/*.js', ['compress']);
	// ↑↑↑ Sass watch
});

//gulp.task('default', function(){
//  gulp.watch("sources/sass/**/*.scss", ['styles']);
//  gulp.watch("sources/js/**/*.js", ['scripts']);
//});

// tareas default
gulp.task('default', ['styles' , 'scripts' , 'watch']);
