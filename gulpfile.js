// function tarea(done) {
//     console.log("Desde la primera tarea");
//     done();
// }

// function tarea2(done) {
//     console.log("Desde la segunda tarea");
//     done();
// }

// exports.tarea2 = tarea2;
const { src, dest, watch, parallel } = require("gulp");
// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//JS
const terser = require('gulp-terser-js');

function css(done) {
    //Identificar el archivo .SCSS a compilar 
    src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        //Compilarlo
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        //Almacenarlo
        .pipe(dest("build/css"))
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"))
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))
    done();
}

function javascript(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/js"))
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css); // Archivo que se va estar escucando por cambios 
    watch("src/js/**/*.js", javascript);
    done();
}


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);