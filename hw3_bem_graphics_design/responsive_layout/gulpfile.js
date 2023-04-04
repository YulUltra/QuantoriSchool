const { src, dest, watch, parallel, series } = require("gulp")

const scss = require("gulp-sass")(require("sass"))
const concat = require("gulp-concat")
const uglify = require("gulp-uglify-es").default
const browserSync = require("browser-sync")
const autoprefixer = require("gulp-autoprefixer")
const clean = require("gulp-clean")
const imagemin = require("gulp-imagemin")

function scripts() {
  return src(["src/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream())
}

function styles() {
  return src("src/scss/style.scss")
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 version"], grid: true })
    )
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream())
}

function watching() {
  watch(["src/scss/style.scss"], styles)
  watch(["src/js/main.js"], scripts)
  watch(["src/*.html"]).on("change", browserSync.reload)
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  })
}

function building() {
  return src(
    [
      "src/css/style.min.css",
      "src/js/main.min.js",
      "src/**/*.html",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"))
}

function cleanDist() {
  return src("dist").pipe(clean())
}

function images() {
  return src("src/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"))
}

exports.styles = styles
exports.scripts = scripts
exports.watching = watching
exports.browsersync = browsersync
exports.images = images

exports.build = series(cleanDist, images, building)
exports.default = parallel(styles, scripts, browsersync, watching)
