var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var jade = require("gulp-jade");
var less = require("gulp-less");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("scripts", function () {
  return gulp.src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(gulp.dest("public/js"));
});

gulp.task("scripts-min", ["scripts"], function () {
  return gulp.src("public/js/app.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/js"));
});

gulp.task("styles", function () {
  return gulp.src("src/less/style.less")
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest("public/css"))
});

gulp.task("styles-min", ["styles"], function () {
  return gulp.src("public/css/style.css")
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/css"));
});

gulp.task("pages", function () {
  return gulp.src(["src/jade/**/*.jade"])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest("public"));
});

gulp.task("default", ["pages", "scripts-min", "styles-min"]);
