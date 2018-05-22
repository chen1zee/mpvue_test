const fs = require('fs')
const path = require('path')
const compDependencies = require('./compDependencies')

class WebpackBuildCompDependenciesPlugin {
    apply(compiler) {
        compiler.plugin('done', () => {
            const dep = compDependencies.getDep()
            const hash = compDependencies.getHash()
            this.writeFileToDist('dep.json', JSON.stringify(dep))
            this.writeFileToDist('hash.json', JSON.stringify(hash))
        })
    }
    // 输出文件到 mpvue_dist
    writeFileToDist(fileName, content) {
        fs.writeFile(path.resolve(__dirname, `../mpvue_dist/${fileName}`), content, err => {
            if (!err) return
            console.log(`*********[编译${fileName}出错]*********`)
            console.log(err)
        })
    }
}

module.exports = WebpackBuildCompDependenciesPlugin
