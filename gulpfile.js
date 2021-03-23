const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync');

const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite')



const htmles = () => {
    return src('./src/index.html')
    // return src(['./src/index.html'])
     .pipe(fileInclude({
         prefix: '@',
         baseDir: '@file'
     }))
     .pipe(dest('./dist'))
     .pipe(browserSync.stream())
}

const styles = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('index.scss'))
        .pipe(autoprefixer('last 10 versions'))
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(sass({ outputStyle: 'compressed' }))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream()) 
}


const svgSprites = () => {
    return src('./src/img/sprite-svg/**.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('./dist/img'))
}

const images0 = () => {
    return src('./src/img/**/*.{png,jpg,jpeg,gif}')
        .pipe(dest('./dist/img'))
}

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    
    watch('./src/index.html', htmles);
    watch('./src/scss/**/*.scss', styles);
    watch('./src/img/**/*.{png,jpg,jpeg,gif}', images0);
    watch('./src/img/sprite-svg/**.svg', svgSprites);
}

exports.htmles = htmles;
exports.styles = styles;
// exports.images0 = images0;
// exports.svgSprites = svgSprites;
exports.watcher = watcher;

exports.default = series(htmles, styles, images0, svgSprites, watcher);