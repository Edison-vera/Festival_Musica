// function tarea(done) {
//     console.log("Desde la primera tarea");
//     done();
// }

// function tarea2(done) {
//     console.log("Desde la segunda tarea");
//     done();
// }

// exports.tarea2 = tarea2;
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {
    //Identificar el archivo .SCSS a compilar 
    src("src/scss/**/*.scss")
        //Compilarlo
        .pipe(plumber())
        .pipe(sass())
        //Almacenarlo
        .pipe(dest("build/css"))
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css); // Archivo que se va estar escucando por cambios 
    done();
}


exports.css = css;
exports.dev = dev;