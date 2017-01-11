var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var browserSync = require('browser-sync').create();

gulp.task('default', ['sass','babel'], () => {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', ['babel']);
});

gulp.task('prod', ['css', 'minify'], () => {
	console.log('Production stuff');
})


gulp.task('sass', () => {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('babel', () => {
	return gulp.src('./src/js/main.js')
		.pipe(babel())
		.on('error', function(e) {
      		console.log('>>> ERROR', e);
      		this.emit('end');
    	})
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream());
});


gulp.task('css', () => {
	var processors = [
		autoprefixer(
			{
				browsers: ['last 2 version']
			}),
		cssnano(),
	];
	return gulp.src('./dist/css/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('minify', () => {
	return gulp.src('./dist/js/main.js')
		.pipe(minify())
		.pipe(gulp.dest('./dist/js/'));
});


