// for mp
const compiler = require('mpvue-template-compiler')

const babel = require('babel-core')
const path = require('path')
const fs = require('fs')
const compDependencies = require('../../../compDependencies')

const { parseConfig, parseComponentsDeps } = require('./parse')
const { parseComponentsDeps: parseComponentsDepsTs } = require('./parse-ts')
const { genScript, genStyle, genPageWxml } = require('./templates')

const {
  cacheFileInfo,
  getFileInfo,
  getCompNameBySrc,
  resolveTarget,
  covertCCVar,
  cacheSlots,
  getSlots,
  htmlBeautify,
  getBabelrc,
  getPageSrc
} = require('./util')

let emitFileTimer = null

function createSlotsWxml (emitFile, slots, importCode) {
  cacheSlots(slots, importCode)
  const content = getSlots()
  // 100 delay 比较符合当前策略
  const delay = 100
  if (content.trim()) {
    if (emitFileTimer) {
      clearTimeout(emitFileTimer)
    }
    emitFileTimer = setTimeout(function () {
      emitFile('components/slots.wxml', htmlBeautify(content))
    }, delay)
  }
}

// 调用 compiler 生成 wxml
function genComponentWxml (compiled, options, emitFile, emitError, emitWarning) {
  options.components['slots'] = { src: 'slots', name: 'slots' }
  const { code: wxmlCodeStr, compiled: cp, slots, importCode } = compiler.compileToWxml(compiled, options)
  const { mpErrors, mpTips } = cp

  // 缓存 slots，延迟编译
  createSlotsWxml(emitFile, slots, importCode)

  if (mpErrors && mpErrors.length) {
    emitError(
      `\n  Error compiling template:\n` +
      mpErrors.map(e => `  - ${e}`).join('\n') + '\n'
    )
  }
  if (mpTips && mpTips.length) {
    emitWarning(
      mpTips.map(e => `  - ${e}`).join('\n') + '\n'
    )
  }
  return htmlBeautify(wxmlCodeStr)
}

function createWxml (emitWarning, emitError, emitFile, resourcePath, rootComponent, compiled, html) {
  const { pageType, moduleId, components, src } = getFileInfo(resourcePath) || {}

  // 这儿一个黑魔法，和 webpack 约定的规范写法有点偏差！
  if (!pageType || (components && !components.isCompleted)) {
    return setTimeout(createWxml, 20, ...arguments)
  }

  let wxmlContent = ''
  let wxmlSrc = ''

  if (rootComponent) {
  
    const componentName = getCompNameBySrc(rootComponent)
    /**
     * @markdown
     * 此处 生成  /pages/xxx/yyy.wxml 内容 ，，， 引用对应的
     * */
    wxmlContent = genPageWxml(componentName, src)
    wxmlSrc = src
  } else {
    // 插件的 未完成, 这儿传 options 进去
    // {
    //   components: {
    //     'com-a': { src: '../../components/comA$hash', name: 'comA$hash' }
    //   },
    //   pageType: 'component',
    //   name: 'comA$hash',
    //   moduleId: 'moduleId'
    // }
    const name = getCompNameBySrc(resourcePath)
    const options = { components, pageType, name, moduleId }
    wxmlContent = genComponentWxml(compiled, options, emitFile, emitError, emitWarning)
    wxmlSrc = `components/${name}`
  }

  emitFile(`${wxmlSrc}.wxml`, wxmlContent)
}

// 编译出 wxml
function compileWxml (compiled, html) {
  return createWxml(this.emitWarning, this.emitError, this.emitFile, this.resourcePath, null, compiled, html)
}

// 针对 .vue 单文件的脚本逻辑的处理
// 处理出当前单文件组件的子组件依赖
function compileMPScript (script, mpOptioins, moduleId) {
  const babelrc = getBabelrc(mpOptioins.globalBabelrc)
  let result, metadata
  let scriptContent = script.content
  const babelOptions = { extends: babelrc, plugins: [parseComponentsDeps] }
  if (script.src) { // 处理src
    const scriptpath = path.join(path.dirname(this.resourcePath), script.src)
    scriptContent = fs.readFileSync(scriptpath).toString()
  }
  if (script.lang === 'ts') { // 处理ts
    metadata = parseComponentsDepsTs(scriptContent)
  } else {
    result = babel.transform(scriptContent, babelOptions)
    metadata = result.metadata
  }
  /**
   * @markdown
   * 此处暂时 视为 本chunk(component) 的 [name].vue?[hashCode]
   * 如： index.vue?68b2647c
   * @remarkAndStudy
   * 思考 ，此处 script.map.sources[] 为什么为数组，，数组长度是否会 > 1
   * */
   
  // metadata: importsMap, components
  const { importsMap, components: originComponents } = metadata

  // 处理子组件的信息
  const components = {}
  if (originComponents) {
    const allP = Object.keys(originComponents).map(k => {
      return new Promise((resolve, reject) => {
        this.resolve(this.context, originComponents[k], (err, realSrc) => {
          if (err) return reject(err)
          const com = covertCCVar(k)
          const comName = getCompNameBySrc(realSrc)
          components[com] = { src: comName, name: comName }
          /**
           * 组件的子组件结构 为
           * { one: { src: 'one$1e0a76f6', name: 'one$1e0a76f6' } }
           * 用此信息 构建 一个 组件依赖.json
           * */
          resolve()
        })
      })
    })
    Promise.all(allP)
      .then(res => {
        /**
         * @markdown 这里 自己写一个 全局变量 存储 对应 关系表
         * */
        const fileHashName = compDependencies.getHash(this.resourcePath)
        compDependencies.setDep(fileHashName, JSON.parse(JSON.stringify(components)))
        components.isCompleted = true
      })
      .catch(err => {
        console.error(err)
        components.isCompleted = true
      })
  } else {
    const fileHashName = compDependencies.getHash(this.resourcePath)
    compDependencies.setDep(fileHashName, null)
    components.isCompleted = true
  }

  const fileInfo = resolveTarget(this.resourcePath, this.options.entry)
  /**
   * @markdown
   * 组件间的依赖 缓存
   * */
  cacheFileInfo(this.resourcePath, fileInfo, { importsMap, components, moduleId })
  return script
}

// checkMPEntry 针对 entry main.js 的入口处理
// 编译出 app, page 的入口js/wxml/json

const startPageReg = /^\^/

function compileMP (content, mpOptioins) {
  const { resourcePath, emitError, emitFile, emitWarning, resolve, context, options } = this

  const babelrc = getBabelrc(mpOptioins.globalBabelrc)
  const { metadata } = babel.transform(content, { extends: babelrc, plugins: [parseConfig] })

  // metadata: config
  const { config, rootComponent } = metadata

  const fileInfo = resolveTarget(resourcePath, options.entry)
  cacheFileInfo(resourcePath, fileInfo)
  const { src, name, isApp, isPage } = fileInfo

  if (isApp || isPage) {
    // 生成入口 json
    if (config) {
      const configObj = config.value

      // 只有 app 才处理 pages
      if (isApp) {
        const pages = Object.keys(options.entry).concat(configObj.pages).filter(v => v && v !== 'app').map(getPageSrc)

        // ^ 开头的放在第一个
        const startPageIndex = pages.findIndex(v => startPageReg.test(v))
        if (startPageIndex !== -1) {
          const startPage = pages[startPageIndex].slice(1)
          pages.splice(startPageIndex, 1)
          pages.unshift(startPage)
        }
        configObj.pages = [...new Set(pages)]
      }
      emitFile(`${src}.json`, JSON.stringify(configObj, null, '  '))
    }

    // 生成入口 js
    emitFile(`${src}.js`, genScript(name, isPage, src))

    // 生成入口 wxss
    emitFile(`${src}.wxss`, genStyle(name, isPage, src))

    // 这儿应该异步在所有的模块都清晰后再生成
    // 生成入口 wxml
    if (isPage && rootComponent) {
      resolve(context, rootComponent, (err, rootComponentSrc) => {
        if (err) return
        // 这儿需要搞定 根组件的 路径
        createWxml(emitWarning, emitError, emitFile, resourcePath, rootComponentSrc)
      })
    }
  }

  return content
}

module.exports = { compileWxml, compileMPScript, compileMP }
