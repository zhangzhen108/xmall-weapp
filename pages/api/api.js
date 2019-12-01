/**
 * 渠道查询
 */
const channelQueryList = 'api/channel/queryList' 
/**
 * 分类查询
 */
const categoryQueryList = 'api/category/queryList' 
/**
 * 获取商品列表
 */
const queryProductList = 'api/productController/queryList' 
/**
 * 立即购买  链接转换
 */
const buyNow = 'api/productController/buyNow' 
//  queryProductList这个常量
module.exports = {
  queryProductList, 
  buyNow,
  channelQueryList,
  categoryQueryList
}