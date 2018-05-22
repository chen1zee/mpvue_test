
/**
 * 根据 base 创造 引用
 * page 类型组件 编译后 相对引用
 * (因为 现在 webpack entry 均为 pages/*, 所以 引用固定)
 * 若 调整 入口 不为 pages/* 注意 此处 要 变化
 * mpvue_test的 externals 只能引用 wepy 根目录下的 资源
 * */
const LEVEL = '../../../../'
function makeOptionsBase(base) {
    return {
        // `commonjs ../../../${base}/index`
        [base]: { commonjs: `${LEVEL}${base}/index` }
    }
}

/**
 * page 类型组件 编译后 相对引用
 * 根据 入口 && 入口 子文件 生成 对应 引用
 * */
function makeOptionsWithChildren(base, children) {
    const tem = { [base]: { commonjs: `${LEVEL}${base}/index` } }
    tem[`${base}/${children}`] = { commonjs: `${LEVEL}${base}/${children}` }
    return tem
}

module.exports = {
    ...makeOptionsBase('api')
}

