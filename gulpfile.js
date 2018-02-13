var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

    gulp.task('pack-js',function(){
        return gulp.src(['index.js'
            ])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('build/js/'))
	});

    gulp.task('pack-css',function(){
        return gulp.src(['src/assets/css/food.css'
            ])
        .pipe(concat('bundle.css'))
        .pipe(minify())
        .pipe(gulp.dest('build/css/'))
	});

    // gulp.task('pack-vendor-css',function(){
    //     return gulp.src(['src/assets/css/bootstrap.css',
    //         'src/assets/css/fonts.css'
    //         ])
    //     .pipe(concat('vendor.css'))
    //     .pipe(minify())
    //     .pipe(gulp.dest('build/css/'))
    // });
    // gulp.task('watch', function(){
    //   gulp.watch('**/*.js', ['js']); 
    //   gulp.watch('src/assets/**/*.css', ['css']); 
    //   // Other watchers
    // })

    gulp.task('bundle-assets',['pack-js','pack-css']);