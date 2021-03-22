const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const fileInclude = require('gulp-file-include')



const htmles = () => {
    // src('./src/index.html')
    return src(['./src/index.html'])
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

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('./src/scss/**/*.scss', styles);
    watch('./src/index.html', htmles);
}

exports.htmles = htmles;
exports.styles = styles;
exports.watcher = watcher;

exports.default = series(htmles, styles, watcher);