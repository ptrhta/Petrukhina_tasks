let project_folder = 'dist';

let path = {
    build: {
        css: project_folder + '/css/'
    },
    srcPath: {
        css: './style.scss'
    },
    watch: {
        css: '/blocks/*.scss'
    },
    clean: './' + project_folder + '/'
}

const { src, dest } = require('gulp');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const media_queries = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const fs = require('fs');

function css() {
    return src(path.srcPath.css)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'], grid: true, cascade: true
        }))
        .pipe(media_queries())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
}


function watchFiles() {
    gulp.watch([path.watch.css], css);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, css)
let watch = gulp.parallel(build, watchFiles)


exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;

function getDirectories(ext) {
    let source = path.src.blocks;
    let res = fs.readdirSync(source)
      .filter(item => fs.lstatSync(source + item).isDirectory())
      .filter(item => fileExist(source + item + '/' + item + '.' + ext));
    return res;
  }

function fileExist(filepath){
    let flag = true;
    try{
      fs.accessSync(filepath, fs.F_OK);
    }catch(e){
      flag = false;
    }
    return flag;
  }