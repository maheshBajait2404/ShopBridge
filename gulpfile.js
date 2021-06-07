var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 1492
  });
});


gulp.task('default', [], function() {
  console.log("Concating and moving all the css files in styles folder");
  gulp.src("app/styles/**.css")
      .pipe(concat('style.css'))
      .pipe(gulp.dest('build/styles'));

      gulp.src("app/styles/css/**.css")
      .pipe(concat('style.css'))
      .pipe(gulp.dest('build/styles'));

       gulp.src("app/js/**/*.js")
      .pipe(concat('script.js'))
      .pipe(gulp.dest('build/js'));

      gulp.src("app/js/*.js")
      .pipe(concat('script.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('concat', function () {
  console.log("Concating and moving all the css files in styles folder");
  gulp.src("app/styles/**.css")
      .pipe(concat('style.css'))
      .pipe(gulp.dest('build/styles'));

       gulp.src("app/styles/css/**.css")
      .pipe(concat('style.css'))
      .pipe(gulp.dest('build/styles'));

       gulp.src("app/js/**/*.js")
      .pipe(concat('script.js'))
      .pipe(gulp.dest('build/js'));

      gulp.src("app/js/*.js")
      .pipe(concat('script.js'))
      .pipe(gulp.dest('build/js'));
	
});

gulp.task('watch', function () {
  
    gulp.watch('app/**/*', function () {
    	gulp.run("concat");
	});
     gulp.watch('app/*', function () {
      gulp.run("concat");
  });
});
 
gulp.task('serve', ['webserver']);


