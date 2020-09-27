import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss", // 변환전 경로
    dest: "src/static/styles", // 변환후 경로
    watch: "assets/scss/**/*.scss", // 변경 감시 대상 경로
  },
};

const clean = () => del("src/static");

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      // webkit browser 호환성 설정
      autoprefixer({
        //browsers: ["last 2 versions"], // pakage.json browserlist로 추가
        cascade: false,
      })
    )
    .pipe(minifyCSS()) // 코드 압축
    .pipe(gulp.dest(paths.styles.dest));

// 대상이 변경되면 styled build fn 실행
const watchFiles = () => gulp.watch(paths.styles.watch, styles);

// 파일삭제, 빌드, 변경시 빌드
const dev = gulp.series([clean, styles, watchFiles]);

export default dev;
