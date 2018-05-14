const ENV = 'test' // 除host外 一些配置项也随环境变化

const config = {
    env: ENV, // 环境 (在 banner url 跳转用到)
    host: {
        // test: 'http://10.100.112.197:9091',         // 测试环境 197
        test: 'http://10.100.112.198',              // 测试环境 198
        prev: 'http://preprodmall.bestwehotel.com', // 预生产
        prod: 'https://malls.bestwehotel.com'       // 生产
    },
    path: '/plateno_mall',
    api: '',

    // 商品渠道
    // 1-微信 2-铂涛app 3-锦江app 4-小程序
    channel: 313,
    // 预订渠道 数据组的
    // 111-微信 105-铂涛旅行app 168-锦江旅行app 313-小程序
    orderChannel: 313,
    // 中间层渠道
    // wx-微信 app-铂涛app jj-锦江app wxapp-小程序
    proxyChannel: 313,
    // 主题 'normal':平常 'spring':春节主题
    theme: 'normal',
    placeholder: '/images/placeholder.png',
    // 分类中 积分兑换(一级)类目id
    pointStoreCategoryId: ENV == 'prod' ? 77 : 59,
    virtualType: [1, 2, 3, 8], // 允许购买的商品类型 1-实体商品 2-优惠券 3-福袋 8-房券
    onceVirtualType: [4, 5, 7, 8] // 每单限购1个的商品类型 4-时尚秀门票 5-预售券 7-互至券 8-房券
}

// 这里切换api test/prod
config.api = config.host[ENV] + config.path

// 在wepy下支持使用全局变量访问config
// 调用方法: this.$root.$parent.globalData.channel
// this.$root.$parent.globalData -> config

export default config
