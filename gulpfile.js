// Initialize modules
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()

// Use dart-sass for @use
// sass.compiler = require('dart-sass')

// Sass task
function sassTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }))
}

// JavaScript task
function jsTask() {
  return src('app/js/script.js', { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }))
}

// Browsersync
function browserSyncServer(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  })
  cb()
}

function browserSyncReload(cb) {
  browsersync.reload()
  cb()
}

// Watch task
function watchTask() {
  watch('*.html', browserSyncReload)
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(sassTask, jsTask, browserSyncReload)
  )
}

// Default gulp task
exports.default = series(sassTask, jsTask, browserSyncServer, watchTask)