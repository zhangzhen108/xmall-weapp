//index.js
import { queryProductList } from '../api/api.js'
import api from '../api/request.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    productList:{},
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
    ],
    sections: [{

      id: 5,
      title: "最新商品",
      type: 5, // 大图商品无边框板块
      relateId: 3,
      sortOrder: 5,
      list: [{
        id: 1,
        relateId: 0,
        title: "Smartisan T恤 薛定谔",
        description: "风格简洁、舒适服帖",
        price: 149.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/22f9e824c1cf7e8fad3d432ee494b932.png"
      },
      {
        id: 2,
        relateId: 0,
        title: "记事本",
        description: "优质米色纸、不洇不透",
        price: 49.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/4a38a3678f151ec9c022f5f676c2b7da.jpg"
      }, {
        id: 3,
        relateId: 0,
        title: "坚果砖式蓝牙小音箱",
        description: "一款设计出色、音质出众的随身音箱",
        price: 149.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/c44f0ab4da5591fc3d0f82b7ac0f4f65.jpg"
      },
      {
        id: 4,
        relateId: 0,
        title: "坚果彩虹数据线",
        description: "七彩配色随机发货，为生活增添一份小小惊喜",
        price: 19.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/82aab62886740f165a3631ce6cffe895.jpg"
      },
      {
        id: 5,
        relateId: 0,
        title: "明信片",
        description: "优质卡纸、包装精致、色彩饱满",
        price: 9.90,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/5ff83a138b1186b0cdf2c76fee2b6e44.jpg"
      },
      {
        id: 6,
        relateId: 0,
        title: "任天堂发售红白机",
        description: "100% 美国 SUPIMA 棉、舒适拉绒质地",
        price: 149.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/804edf579887b3e1fae4e20a379be5b5.png"
      }
      ]
    }]
  },
  onLoad: function () {
    this.queryProduct();
   },
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  handleClick: function (e) {
    let data = e.currentTarget.dataset.value;
    if (data.type == 0) {
      // 商品
      wx.navigateTo({
        url: '/pages/product/product?id=' + data.relateId
      });
    } else if (data.type == 1) {
      // 促销
      wx.navigateTo({
        url: '/pages/promotion/promotion?id=' + data.relateId
      });
    } else if (data.type == 2) {
      // 分类
      wx.navigateTo({
        url: '/pages/product/product?id=' + data.relateId
      });
    }
  },
  clickHeader: function (e) {
    let data = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/promotion/promotion?id=' + data.relateId
    });
  },
  queryProduct: function(e) {
    //调用接口
    api.get(queryProductList,{
      code:'product-tb',
      size:20,
      current:1,
      keyword: '衣服'
    }).then(res => {
      //成功时回调函数
      this.setData({
        productList: res.data
      })
    }).catch(err => {
      //失败时回调函数
      console.log(err)
    })
  }
})