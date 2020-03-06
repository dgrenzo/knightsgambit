// gulpfile.js

const settings = require("./package.json").settings;
const gulp = require("gulp");
const del = require("del");
const ts = require("gulp-typescript");
const browserify = require("browserify");
const browserifyInc = require("browserify-incremental");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const changed = require("gulp-changed");
const browserSync = require("browser-sync");
const runSequence = require("run-sequence");
const tape = require("gulp-tape");
const through = require("through2");
const fs = require("fs");
const merge = require("merge2");

const debug = false;

if (debug) { console.log("=== DEBUG Environment ===") }
else { console.log("=== RELEASE Environment ==="); }

function browserReloadPromise() {
  return new Promise(function(resolve, reject) {
    browserSync.reload();
    resolve();
  });
}

// Clean destination directory
gulp.task("clean", () => {
    let files = ["./.cache.json", "./*.log"];
    if (debug) { files.push(settings.paths.debug + "*"); }
    else { files.push(settings.paths.release + "*"); }

    return del(files);
});

// Clean destination directory for all environnements
gulp.task("clean:all", () => {
    let files = ["./.cache.json", "./*.log"];
    files.push(settings.paths.debug + "*");
    files.push(settings.paths.release + "*");

    return del(files);
});

// Compile TypeScript files
gulp.task("compile", () => {
    let config = "";
    let dest = "";

    if (debug) {
        config = settings.tsconfig.debug;
        dest = settings.paths.debug;
    }
    else {
        config = settings.tsconfig.release;
        dest = settings.paths.release;
    }

    let tsProject = ts.createProject(config);
    const tsResult = tsProject.src()
        .pipe(gulpif(debug, sourcemaps.init()))
        .pipe(tsProject());

    return merge([
        tsResult.js
            .pipe(gulpif(debug, sourcemaps.write()))
            .pipe(gulp.dest(dest)),
        tsResult.dts
            .pipe(gulp.dest(dest))])
        //.on("error", gutil.log);
});

// Bundle JavaScript files into a single file
gulp.task("bundle", gulp.series("compile", () => {
    const bundleFilename = settings.bundle;
    const mainFilename = settings.main;
    let dest = "";

    if (debug) { dest = settings.paths.debug;  }
    else { dest = settings.paths.release; }

    return browserify({
            "entries": dest + mainFilename,
            "debug": false,
            "cache": "./.cache.json"
        })
        .bundle()
        .pipe(source(bundleFilename))
        .pipe(buffer())
        .pipe(gulpif(debug, sourcemaps.init({ loadMaps: true })))
        .pipe(uglify({
          compress: {
            drop_console : true,
          },
          output: {
            beautify: false,
          },
          parse : {
            //html5_comments:false
          }

        }))
        //.pipe(gulpif(debug, sourcemaps.write()))
        .pipe(gulp.dest(dest))
        //.on("error", gutil.log)
        .on("finish", () => {
            if (!debug) {
                del([dest + "*.js", "!" + dest + bundleFilename]);
            }
        });
}));

// Copy all static assets
gulp.task("copy", () => {
    let dest = "";

    if (debug) { dest = settings.paths.debug;  }
    else { dest = settings.paths.release; }

    gulp.src(settings.paths.src + "*.html")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));

    gulp.src(settings.paths.srcAudio + "**")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest + settings.paths.tgtAudio));
        
    gulp.src(settings.paths.srcImages + "**")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest + settings.paths.tgtImages));

    return gulp.src(settings.paths.srcCss + "**")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest + settings.paths.tgtCss));
});

// Rebuild on change
gulp.task("watch", () => {
  gulp.series("bundle", "copy", "serve")();
    //runSequence(["bundle", "copy"], "serve");
    gulp.watch(settings.paths.src + "**", gulp.series("bundle", "copy", browserReloadPromise));
});

// Launch the HTTP server
gulp.task("serve", () => {
    let dest = "";

    if (debug) { dest = settings.paths.debug;  }
    else { dest = settings.paths.release; }
    
    browserSync.init({
        "port": settings.port,
        "server": dest
    });
});

// Rebuild on change and refresh the browser
gulp.task("watchRefresh", () => {
    runSequence(["bundle", "copy"], ["serve", "test"]);
    gulp.watch(settings.paths.src + "**", () => {
        runSequence(["bundle", "copy"], "test", browserReloadPromise);
    });
});

// Default task
gulp.task("default", gulp.series("bundle", "copy"));
