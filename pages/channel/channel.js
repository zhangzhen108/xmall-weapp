//index.js
import { queryProductList } from '../api/api.js'
import api from '../api/request.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    channel:'',
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
    }],
    menuList: [{
      id: 1,
      relateId: 0,
      title: "IPhone XS",
      type: 0,
      picUrl: "https://resource.smartisan.com/resource/5224f868cca31a8b913411ff9d69dcaf.png"
    },
    {
      id: 2,
      relateId: 0,
      title: "购买空净",
      type: 0,
      picUrl: "https://resource.smartisan.com/resource/e98cfb0a63e8b8c80e5b87ca66bda64c.png"
    },
    {
      id: 3,
      relateId: 0,
      title: "新品配件",
      type: 0,
      picUrl: "https://i.loli.net/2019/06/23/5d0f7e938c57070713.png"
    },
    {
      id: 4,
      relateId: 0,
      title: "服装",
      type: 0,
      picUrl: "https://resource.smartisan.com/resource/75892aebb63f998fa9b37e9a18984a98.png"
    },
    {
      id: 5,
      relateId: 0,
      title: "更多",
      type: 0,
      picUrl: "https://i.loli.net/2019/06/23/5d0f7e938cbee56873.png"
    }
    ]
  },
  onLoad: function (options) {
    var that=this;
    if(options!=null){
      var channel = JSON.parse(options.channel);
      wx.setNavigationBarTitle({
        title: channel.title,
      })
      that.setData({
        channel: channel
      })
    }
    this.queryProductList();
   },
  toSearch: function () {
    var channel = JSON.stringify(channel)
    wx.navigateTo({
      url: '/pages/search/search?channel=' + channel
    });
  },
  handleClick: function (e) {
    let data = e.currentTarget.dataset.value;
    var product = JSON.stringify(data)
      // 商品
      wx.navigateTo({
        url: '/pages/product/product?product=' + product
      });
  },
  clickHeader: function (e) {
    let data = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/promotion/promotion?id=' + data.relateId
    });
  },
  queryProductList: function(e) {
    //调用接口
    api.get(queryProductList,{
      code:this.data.channel.code,
      size:20,
      current: this.data.page,
      keyword: '衣服'
    }).then(res => {
      //成功时回调函数
      var that = this;
      console.log(res);
      if (res.data.length < that.data.pageSize){
        that.setData({
          productList: that.data.productList.concat(res.data),
          hasMoreData: false
        })
      }else{
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
})