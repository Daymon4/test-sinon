const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

const watchOptions = {
    events: 'all',
    ignoreInitial: false,
};

const destOptions = {
    overwrite: true,
}

const destinationPath = 'build';

const htmlTask = cb => {
    src('src/*.html')
    .pipe(dest(destinationPath, destOptions))
    .pipe(browserSync.stream());

    cb();
};

const cssTask = cb => {
    src('src/*.css')
    .pipe(dest(destinationPath, destOptions))
    .pipe(browserSync.stream());

    cb();
};

const jsTask = cb => {
    browserify('./src/index.js').bundle()
    .pipe(source('bundle.js'))
    .pipe(dest(destinationPath, destOptions))
    .pipe(browserSync.stream());

    cb();
};

const watchTask = () => {
    browserSync.init({
        server: {
            baseDir: 'build',
            index: 'index.html'
        }
    });

    watch('src/*.html', watchOptions, htmlTask).on('change', browserSync.reload)
    watch('src/*.css', watchOptions, cssTask).on('change', browserSync.reload)
    watch('src/**/*.js', watchOptions, jsTask).on('change', browserSync.reload)
}

const serialHtml = () => {
    return src('src/*.html')
    .pipe(dest(destinationPath, destOptions))
    .pipe(browserSync.stream());
};

const serialCss = () => {
    return src('src/*.css')
    .pipe(dest(destinationPath, destOptions))
    .pipe(browserSync.stream());
};

const serialJs = () => {
    return src('src/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(dest(destinationPath, destOptions))
    .pipe(browserSync.stream());
};

exports.start = watchTask;
exports.build = series(serialHtml, serialCss, serialJs)
exports.default = exports.build;