// pages/product/product.js
let WxParse = require("../../lib/wxParse/wxParse.js");
import Toast from '../../lib/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    product: {
      id: 0,
      picUrl: "https://img11.360buyimg.com/n1/s450x450_jfs/t1/62813/33/2131/584186/5d079803E03084b0d/2b4970456b7bf49f.png", // 默认商品图片
      promotion: 1, // 促销活动 0无 1限时购 2领劵
      gallery: [{
          picUrl: "https://img11.360buyimg.com/n1/s450x450_jfs/t1/62813/33/2131/584186/5d079803E03084b0d/2b4970456b7bf49f.png",
          sortOrder: 1
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/4176/23/3653/281477/5b9a15d4E97e09d00/887e76e6c525324c.jpg",
          sortOrder: 2
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/5967/33/3617/54427/5b9a15d4Ebe8c2aed/99c9c06b72d356f7.jpg",
          sortOrder: 3
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/2522/37/3744/128519/5b9a15d4Eb916347a/bef9d7fae9c5d2ae.jpg",
          sortOrder: 4
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/1508/30/3667/24431/5b9a15d4E61cd63d4/592747ec9cd8ad81.jpg",
          sortOrder: 5
        }
      ], // 轮播图
      title: "Apple iPhone XS Max (A2104)",
      description: "A12仿生芯片流畅体验，支持双卡！",
      defaultPrice: 1.00, // 默认显示价格
      price: 1.00,
      originPrice: 9588.00
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    if (options != null) {
      var product = JSON.parse(options.product);
      that.setData({
        product: product
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  openIndexPage: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  openCoupon: function() {
    this.setData({
      couponShow: true
    })
  },
  closeCoupon: function() {
    this.setData({
      couponShow: false
    })
  },
  openAddress: function() {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        if (!res.address) {
          return;
        }
        that.setData({
          'deliveryAddress.address': res.address
        })
      },
    })
  },
  openService: function() {
    this.setData({
      serviceShow: true
    })
  },
  closeService: function() {
    this.setData({
      serviceShow: false
    })
  },
  openCartPage: function() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  toComment: function() {
    wx.navigateTo({
      url: '/pages/comment/comment?productId' + this.data.product.id,
    })
  },
  toProduct: function(e) {
    let id = e.currentTarget.dataset.value.id;
    wx.navigateTo({
      url: '/pages/product/product?id=' + id
    })
  },
  previewThumb: function(e) {
    wx.previewImage({
      current: this.data.product.picUrl,
      urls: [this.data.product.picUrl]
    })
  },
  showSku: function(e) {
    this.setData({
      'sku.show': true
    })
  },
  closeSku: function(e) {
    this.setData({
      'sku.show': false
    })
  },
  buyNow: function() {
    if (!this.isAllSelected()) {
      // 提示
      this.toChooseTip();
    } else {
      // 下单 判断数量
      let skuComb = this.getSkuComb();
      if (this.data.sku.count > skuComb.stockNum) {
        Toast("库存不足，请减少购买数量");
        return;
      }
      // 跳转checkout页面
      wx.setStorageSync("checkoutProduct", this.data.product);
      wx.setStorageSync("checkoutProductSku", this.data.sku);
      wx.navigateTo({
        url: '/pages/checkout/checkout?from=product',
      })
    }
  },
  toVip: function() {
    wx.navigateTo({
      url: '/pages/ucenter/vip/vip',
    })
  },
})