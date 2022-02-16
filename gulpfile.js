// function tarea(done) {
//     console.log("Desde la primera tarea");
//     done();
// }

// function tarea2(done) {
//     console.log("Desde la segunda tarea");
//     done();
// }

// exports.tarea2 = tarea2;

// CSS
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");



//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


function css(done) {
    //Identificar el archivo .SCSS a compilar 
    src("src/scss/**/*.scss")
        //Compilarlo
        .pipe(plumber())
        .pipe(sass())
        //Almacenarlo
        .pipe(dest("build/css"))
        .pipe()
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

function dev(done) {
    watch("src/scss/**/*.scss", css); // Archivo que se va estar escucando por cambios 
    done();
}


exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);