const gulp = require('gulp')
const watch = require('gulp-watch')
const glob = require('glob')
const through = require('through2')

const mpvueNeedFiles = [
    '../mpvue_dist/components/*.wxml',
    '../mpvue_dist/pages/**/*.*',
    '../mpvue_dist/static/**/*.*'
]
const mpvuePages = ['../mpvue_dist/pages/**/*.wxml']

const wepyNeedFilesWithoutAppJson = [
    '../mall-wxapp/dist/**/!(app.json)',
]
const wepyAppJson = [
    '../mall-wxapp/dist/app.json'
]
const distDir = '../mall_wxapp_final/dist/'

gulp.task('initMpvue', () => (
    makeMpvueFile(gulp.src(mpvueNeedFiles, { base: '../mpvue_dist' }))
))

gulp.task('initWepy', () => (
    makeWepyFile(gulp.src(wepyNeedFilesWithoutAppJson, { base: '../mall-wxapp/dist' }))
))

// 初始化 app.json
gulp.task('initJson', () => {
    changeAppJson()
})

gulp.task('watchAppJson', () => {
    watch(wepyAppJson, { base: '../mall-wxapp/dist', events: ['add', 'change'] }, () => {
        
        changeAppJson()
    })
})

gulp.task('init', ['initMpvue', 'initWepy', 'initJson'])

gulp.task('watch', ['init', 'watchAppJson'], () => {
    makeMpvueFile(watch(mpvueNeedFiles, {
        base: '../mpvue_dist',
        events: ['add', 'change']
    }))
    makeWepyFile(watch(wepyNeedFilesWithoutAppJson, {
        base: '../mall-wxapp/dist',
        events: ['add', 'change']
    }))
})


function changeAppJson() {
    glob(mpvuePages[0], (err, files) => {
        gulp.src(wepyAppJson, { base: '../mall-wxapp/dist' })
            .pipe(through.obj(function (file, enc, cb) { // wepy 的 json
                const str = file.contents.toString()
                const json = JSON.parse(str)
                files.forEach(i => {
                    const page = i.match(/(pages\/\w*\/\w*)\.wxml$/)[1]
                    if (!page) return
                    if (json.pages.indexOf(page) == -1) json.pages.push(page)
                })
                file.contents = Buffer.from(JSON.stringify(json))
                
                this.push(file)
                cb()
            }))
            .pipe(gulp.dest(distDir))
    })
}

function makeMpvueFile(source) {
    source
        .pipe(gulp.dest(distDir))
}
function makeWepyFile(source) {
    source
        .pipe(gulp.dest(distDir))
}
