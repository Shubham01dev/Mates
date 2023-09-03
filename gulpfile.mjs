import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import uglify from "gulp-uglifycss"; // for compressing css file
import uglifyjs from "gulp-uglify" // for compressing js file
import imgmin from "gulp-imagemin"
import rev from "gulp-rev"
import {deleteSync} from "del";

const sass = gulpSass(dartSass); /// passing the sass compiler to gulpSass

gulp.task("sass", function (done) {
  gulp.src("./public/css/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./assets/css'))
    .pipe(rev.manifest({
      cwd: "./assets",
      merge: true,
    }))
    .pipe(gulp.dest('./assets/css'))
    done();

});


gulp.task("js", function(done){
  gulp.src("./public/js/*.js")
         .pipe(uglifyjs())
         .pipe(rev())
         .pipe(gulp.dest("./assets/js"))
         .pipe(rev.manifest({
            cwd: "./assets",
            merge: true,
         }))
         .pipe(gulp.dest('./assets/js'))
         done()

    
})


gulp.task("img", function(done){
  gulp.src("./public/images/*.+(png|jpg|gif|svg|jpeg|webp)")// the syntax writen is callred regex
         .pipe(imgmin())
         .pipe(rev())
         .pipe(gulp.dest("./assets/image"))
         .pipe(rev.manifest({
            cwd: "./assets",
            merge: true,
         }))
         .pipe(gulp.dest('./assets/image'))
         done()

    
})

gulp.task("clean:assets", function(done){
     deleteSync("./assets")
     done()
})

gulp.task("build", gulp.series("clean:assets","sass","js", "img"), function(done){
  console.log("error while building assets")
  done()
})