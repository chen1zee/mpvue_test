import config from 'src/config'
import Ajax from './ajax'

export const eucApi = new Ajax({
    baseUrl: config.api,
    reqSuccessKey: 'code',
    reqSuccessValue: [200],
    msgKey: 'msg'
})
// 获取订单列表
export const getOrderList = (params) => eucApi.post('/common/proxy/booking-orderList', { ...params })
export const setBookingAddBooking = (params) => eucApi.post('/booking/addBooking', { ...params })
export const getBookingOrderList = (params) => eucApi.post('/common/proxy/booking-orderList', { ...params })
export const getBookingOrderDetail = (params) => eucApi.post('/common/proxy/booking-getOrderDetail', { ...params })
export const setBookingCancelOrder = (params) => eucApi.post('/booking/cancelOrder', { ...params })
export const setBookingRemoveOrder = (params) => eucApi.post('/booking/removeOrder', { ...params })
export const setDeliverEnterReceipt = (params) => eucApi.post('/deliver/enterReceipt', { ...params })
export const getPayDetail = (params) => eucApi.post('/pay/payDetail', { ...params })
export const getBookingRefundOrderDetail = (params) => eucApi.post('/booking/refundOrderDetail', { ...params })
export const setBookingRefundOrder = (params) => eucApi.post('/booking/refundOrder', { ...params })
// export const getPayPpayStatus = (params) => eucApi.post('/pay/payStatus', { ...params })
export const getPayPaySuccessDetail = (params) => eucApi.post('/pay/paySuccessDetail', { ...params })
export const setSuggestionAdd = (params) => eucApi.post('/suggestion/add', { ...params })
export const getBookingQueryOrderLogistics = (params) => eucApi.post('/booking/queryOrderLogistics', { ...params })

export const setCartAddCart = (params) => eucApi.post('/cart/addCart', { ...params })
export const setCartEditCart = (params) => eucApi.post('/cart/editCart', { ...params })
export const setCartUpdateByCheck = (params) => eucApi.post('/cart/updateByCheck', { ...params })
export const setCartSelectAll = (params) => eucApi.post('/cart/selectAll', { ...params })
export const getCartGetCartCount = (params) => eucApi.post('/cart/getCartCount', { ...params }, false)
export const getCartGetCartList = (params) => eucApi.post('/cart/getCartList', { ...params })

export const getGoodsIndex = (params) => eucApi.post('/goods/index', { ...params })
export const getGoodsList = (params) => eucApi.post('/goods/list', { ...params })
export const getGoodsDetail = (params) => eucApi.post('/goods/detail', { ...params })
export const getGoodsSku = (params) => eucApi.post('/common/proxy/goods-sku', { ...params }, false)
export const getGoodsSkuOrder = (params) => eucApi.post('/common/proxy/booking-bookingDetail', { ...params })
export const getDeliverDefaultReceiverAddr = (params) => eucApi.post('/deliver/defaultReceiverAddr', { ...params })

export const getQueryAddress = (params) => eucApi.post('/deliver/queryAddress', { ...params })
export const setDelAddress = (params) => eucApi.post('/deliver/delAddress', { ...params })
export const setUpdateAddress = (params) => eucApi.post('/deliver/updateAddress', { ...params })
export const setAddAddress = (params) => eucApi.post('/deliver/addAddress', { ...params })
export const setDefaultAddress = (params) => eucApi.post('/deliver/setDefaultAddress', { ...params })

export const getCouponGetCouponInfo = (params) => eucApi.post('/coupon/getCouponInfo', { ...params })
export const getProxyGoodsRecommendTodayProduct = (params) => eucApi.post('/common/proxy/goods-recommendTodayProduct', { ...params }, false)
export const getProxyGoodsRecommendNewProduct = (params) => eucApi.post('/common/proxy/goods-recommendNewProduct', { ...params }, false)
export const getProxyGoodsQueryAct = (params) => eucApi.post('/common/proxy/goods-queryAct', { ...params })
export const getProxyGoodsQueryCategory = (params) => eucApi.post('/common/proxy/goods-queryCategory', { ...params })
export const getProxyGoodsQueryCategorySilence = (params) => eucApi.post('/common/proxy/goods-queryCategory', { ...params }, false)
export const getProxyGoodsActivityBanner = (params) => eucApi.post('/common/proxy/goods-activityBanner', { ...params }, false)
export const getProxyGoodsQueryProduct = (params) => eucApi.post('/common/proxy/goods-queryProduct', { ...params })
export const getGoodsQueryProductByCategory = (params) => eucApi.post('/common/proxy/goods-queryProductByCategory', { ...params })
export const getProxyGoodsDetail = (params) => eucApi.post('/common/proxy/goods-detail', { ...params }, false)
export const getProxyGoodsQueryCategoryInfo = (params) => eucApi.post('/common/proxy/goods-queryCategoryInfo', { ...params })
export const getProxyGoodsRecommendActiveProduct = (params) => eucApi.post('/common/proxy/goods-recommendActiveProduct', { ...params }, false)

// 获取用户可用优惠券
export const getMallCouponList = (params) => eucApi.post('/coupon/mallCouponList', { ...params })
export const getAvailableCouponList = (params) => eucApi.post('/common/proxy/booking-getAvailableCouponList', { ...params })
export const queryCouponProduct = (params) => eucApi.post('/goods/queryCouponProduct', { ...params })
export const getQueryOrderNum = (params) => eucApi.post('/common/proxy/booking-queryOrderNum', { ...params })
export const createComment = (params) => eucApi.post('/common/proxy/booking-createComment', { ...params })
export const queryOrderComment = (params) => eucApi.post('/common/proxy/booking-orderComment', { ...params })
export const getRecommendProduct = (params) => eucApi.post('/common/proxy/goods-recommendProduct', { ...params })
export const getQueryProductSku = (params) => eucApi.post('/common/proxy/goods-queryProductSku', { ...params })
export const getActiveProduct = (params) => eucApi.post('/common/proxy/goods-activeProduct', { ...params })
export const getGoodsBindProduct = (params) => eucApi.post('/common/proxy/goods-bindProduct', { ...params })

// 搜索
// 获取搜索提示语 暂弃
export const getTipList = (params) => eucApi.post('/common/proxy/goods-searchTitle', { ...params })
// 获取模糊匹配商品列表
export const getProxyGoodsQueryMatchProduct = (params) => eucApi.post('/common/proxy/goods-queryMatchProduct', { ...params })
// 商品评价
export const getReviewList = (params) => eucApi.post('/comment/searchByGoodsId', { ...params }, false)
// 商品评价统计信息 好评率
export const getStatisticSearchList = (params) => eucApi.post('/common/proxy/comment-statisticSearchList', { ...params }, false)
// 积分兑换
export const getRedeemList = (params) => eucApi.post('/common/proxy/goods-activeProduct', { ...params })
// 获取用户积分
export const getPoint = (params) => eucApi.post('/user/getPoint', { ...params })
// 获取商品评论总数
export const getCommentCount = (params) => eucApi.post('/common/proxy/comment-getCount', { ...params })


// 校验是否新客
export const getMemberValidMember = (params) => eucApi.post('/common/proxy/member-validMember', { ...params })
// 领取新客优惠券接口
export const getMemberCoupon = (params) => eucApi.post('/common/proxy/member-getCoupon', { ...params })

// 校验是否已领取优惠券
export const hasActivityCoupon = (params) => eucApi.post('/coupon/isReceived', { ...params })
// 首页-领取优惠券/礼包接口
export const getActivityCoupon = (params) => eucApi.post('/coupon/receiveCoupon', { ...params })
// 首页-获取优惠券配置 activityId configIds
export const getActivityCouponConfig = (params) => eucApi.post('/coupon/getActivityIdAndConfigIds', { ...params })
// banner-领取优惠券/礼包接口
export const getBannerCoupon = (params) => eucApi.post('/coupon/consumeCoupon', { ...params })

// 获取用户token
export const getToken = (params) => eucApi.post('/wechat/smallProgram/login', { ...params })

// 注册|登录
export const sendCode = (params) => eucApi.post('/wechat/smallProgram/sendValidateCode', { ...params }) // 发送手机验证码
export const validateCode = (params) => eucApi.post('/wechat/smallProgram/checkValidateCode', { ...params }) // 校验手机验证码
export const registerMember = (params) => eucApi.post('/wechat/smallProgram/registeMember', { ...params }) // 注册会员

// 小程序 支付
export const goToPay = (params) => eucApi.post('/cash/applet/pay', { ...params }) // 去支付

// 使用微信手机号
export const silentRegiste = (params) => eucApi.post('/wechat/smallProgram/silentRegiste', { ...params })

// 耀卡精选列表
export const getGoodsPlusProductList = (params) => eucApi.post('/common/proxy/goods-plusProductList', { ...params }, false)
// 首页-耀卡精选
export const getGoodsPlusProduct = (params) => eucApi.post('/common/proxy/goods-plusProduct', { ...params }, false)
// 获取公共
export const getNotice = (params) => eucApi.post('/notice/get', { ...params }, false)
// 拆福袋
export const openActivityLuckyBag = (params) => eucApi.post('/common/proxy/activity-luckyBag', { ...params })
// 优惠券商品信息
export const getCouponProductInfo = (params) => eucApi.post('/coupon/getCouponProductInfo', { ...params })
// 优惠券商品信息(静默:无错误弹窗)
export const getCouponProductInfoSilence = (params) => eucApi.post('/coupon/getCouponProductInfo', { ...params }, false)
// 优惠券信息(静默:无错误弹窗)
export const queryCouponProductSilence = (params) => eucApi.post('/goods/queryCouponProduct', { ...params }, false)

// 获取活动页的分享信息
export const getActivityShareInfo = (params) => eucApi.post('/share/shareInfo', { ...params }, false)

/**
 * 积分商城接口
 * */
// 查询积分商城专区列表
export const queryActivityAreaList = (params) => eucApi.post('/common/proxy/goods-queryActivityAreaList', { ...params }, false)
// 查询积分商城商品列表
export const queryJFGoodsProduct = (params) => eucApi.post('/common/proxy/goods-queryJFGoodsProduct', { ...params })
// 积分订单请求发送验证码
export const sendVerificationCode = (params) => eucApi.post('/common/proxy/member-sendVerificationCode', { ...params }, false)
// 获取会员标签信息
export const getMemberIndentity = (params) => eucApi.post('/member/getMemberIndentity', { ...params }, false)

// 获取 无限制 优惠券接口
export const getOrdinaryCoupon = (params) => eucApi.post('/coupon/ordinaryGain', { ...params })

// 获取营销位广告信息
export const getAdInfo = (params) => eucApi.post('/notice/getAdInfo', { ...params }, false)

// 保存formId和prepayId
export const msgServiceSave = (params) => eucApi.post('/msgService/save', { ...params }, false)
