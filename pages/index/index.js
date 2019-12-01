//index.js
import { queryProductList, channelQueryList } from '../api/api.js'
import api from '../api/request.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    page: 1,
    pageSize: 20, //根据后台每页的数据设定
    hasMoreData: '', //是否有更多数据文字
    productList:[],
    bannerList:[{
      id: 1,
      relateId: 0, // 关联商品或其他ID
      title: "",
      type: 0, // 关联类型 0商品 1促销板块 2分类
      picUrl: "https://resource.smartisan.com/resource/fda5c3e61a71c0f883bbd6c76516cd85.png"
    }, {
      id: 2,
      relateId: 0,
      title: "",
      type: 0,
      picUrl: "https://resource.smartisan.com/resource/w/white25wap.png"
    }, {
      id: 3,
      relateId: 0,
      title: "",
      type: 0,
      picUrl: "https://resource.smartisan.com/resource/9402b4117bf1c1754dca08b52c98cca0.png"
    }, {
      id: 4,
      relateId: 0,
      title: "",
      type: 0,
      picUrl: "https://resource.smartisan.com/resource/B/BS2000WAP.png"
    }]
  },
  onLoad: function () {
    this.queryProductList();
    this.channelQueryList();
   },
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  handleClick: function (e) {
    let data = e.currentTarget.dataset.value;
    var channel = JSON.stringify(data)
      // 商品
      wx.navigateTo({
        url: '/pages/channel/channel?channel=' + channel
      });
  },
  handleClickProduct: function (e) {
    let data = e.currentTarget.dataset.value;
    var product = encodeURIComponent(JSON.stringify(data))
    // 商品
    wx.navigateTo({
      url: '/pages/product/product?product=' + product
    });
  },
  queryProductList: function (e) {
    //调用接口
    api.get(queryProductList, {
      channelCode: "product-pdd",
      size: 20,
      current: this.data.page,
      keyword: '衣服'
    }).then(res => {
      //成功时回调函数
      var that = this;
      console.log(res);
      if (res.data.length < that.data.pageSize) {
        that.setData({
          productList: that.data.productList.concat(res.data),
          hasMoreData: false
        })
      } else {
        that.setData({
          productList: that.data.productList.concat(res.data),
          hasMoreData: true,
          page: that.data.page + 1
        })
      }
    }).catch(err => {
      //失败时回调函数
      console.log(err)
    })
  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    console.log(this.data.hasMoreData);
    if (this.data.hasMoreData) {
      this.queryProductList()
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },
  channelQueryList: function(){
    //调用接口
    api.get(channelQueryList, {
      limitNum: 5
    }).then(res => {
      //成功时回调函数
      var that = this;
      console.log(res);
      that.setData({
        menuList: res.data
      })
    }).catch(err => {
      //失败时回调函数
      console.log(err)
    })
  }
})