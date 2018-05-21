const fs = require('fs')
const path = require('path')
const compDependencies = require('./compDependencies')

class WebpackBuildCompDependenciesPlugin {
    apply(compiler) {
        compiler.plugin('done', () => {
            const dep = compDependencies.getDep()
            const hash = compDependencies.getHash()
            fs.writeFile(path.resolve(__dirname, '../mpvue_dist/dep.json'), JSON.stringify(dep), err => {
                if (!err) return
                console.log(`*********[编译dep.json出错]*********`)
                console.log(err)
            })
        })
    }
}

module.exports = WebpackBuildCompDependenciesPlugin
