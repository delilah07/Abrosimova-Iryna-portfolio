const { src, dest, watch, parallel, series} = require('gulp');

let projectFolder = require('path').basename(__dirname);;
let sourceFolder = 'app';

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const groupMedia = require('gulp-group-css-media-queries');

function browsersync() {
    browserSync.init({
        server:{
            baseDir: sourceFolder
        },
        port: 3000,
        notify: false 
    });
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        sourceFolder + '/js/!(script.min.js)'
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest( sourceFolder + '/js'))
    .pipe(browserSync.stream())
}

function styles() {
    return src([
        'node_modules/normalize.css/normalize.css',
        sourceFolder + '/scss/style.scss'
    ])
        .pipe(scss({outputStyle:'expanded'}))
        .pipe(concat('style.css'))
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 versions'],
                cascade: false,
                supports: false,
                grid: true
            })
        )
        .pipe(dest( sourceFolder + '/css'))
        .pipe(scss({outputStyle:'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(dest( sourceFolder + '/css'))
        .pipe(browserSync.stream())
}
function images() {
    return src( sourceFolder + '/images/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest(projectFolder +'/images'))
}

function cleanDist() {
    return del(projectFolder +'/*')
}

function build() {
    return src([
        sourceFolder + '/css/**/*.css',
        sourceFolder + '/fonts/**/*',
        sourceFolder + '/js/**/script.min.js',
        sourceFolder + '/*.html'
    ], {base:  sourceFolder})
    .pipe(dest(projectFolder))
}

function watching(){
    watch([ sourceFolder + '/scss/**/*.scss'], styles);
    watch([ sourceFolder + '/js/**/*.js',  '!' + sourceFolder + '/js/script.min.js'], scripts)
    watch([ sourceFolder + '/*.html']).on('change', browserSync.reload);
}

let buildProject = series(cleanDist, parallel(styles, scripts, images), build);
let watchProject = parallel(buildProject, browsersync, watching);

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = build;

exports.default = watchProject;

