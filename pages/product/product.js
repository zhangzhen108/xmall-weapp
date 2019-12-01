// pages/product/product.js
import Toast from '../../lib/vant-weapp/toast/toast';
import { buyNow } from '../api/api.js'
import api from '../api/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    product: {}
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
      var product = JSON.parse(decodeURIComponent(options.product));
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
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var product = encodeURIComponent(JSON.stringify(this.data.product))
    return {
      title: this.data.product.name,
      imageUrl: this.data.product.imgUrl,
      path: '/pages/product/product?product=' + product
    }
  },
  openIndexPage: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  buyNow: function() {
    this.convertUrl();
  },
  convertUrl: function(){
    api.get(buyNow, {
      logo: this.data.product.imgUrl,
      url: this.data.product.url,
      name: this.data.product.name,
      id: this.data.product.thirdId,
      channelCode: this.data.product.channelDTO.code,
    }).then(res => {
      //成功时回调函数
      var that = this;
      console.log(res);
      var jump=res.data;
      if (jump.jumType===1){
        this.copy(jump);
      }else{
        this.jump(jump);
      }
    }).catch(err => {
      //失败时回调函数
      console.log(err)
    })
  },
  // 跳转小程序
  jump: function(jump){
    wx.navigateToMiniProgram({
      appId: jump.appid,
      path: jump.path,
      success(res) {
        // 打开成功
      }
    })
  },
  // 立即购买复制弹出
  copy: function(jump){
    wx.setClipboardData({
      data: jump.data,
      success: function (res) {
        wx.hideToast();
        wx.showModal({
          title: '复制成功',
          content: '已自动复制淘口令,请打开手机淘宝购买',
          showCancel: false
        });
      }
    })
  },
  copyProductName: function(){
    wx.setClipboardData({
      data: this.data.product.name,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    })
  },
  openOpinionPage: function(){
    wx.navigateTo({
      url: '/pages/opinion/opinion?productId=' + this.data.product.thirdId
    });
  }
})