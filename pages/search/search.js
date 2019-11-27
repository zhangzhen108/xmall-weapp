// pages/search/search.js
import Toast from '../../lib/vant-weapp/toast/toast';
import { queryProductList } from '../api/api.js'
import api from '../api/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel:'',
    page: 1,
    pageSize: 20, //根据后台每页的数据设定
    hasMoreData: '', //是否有更多数据文字
    productList: [],
    value: "",
    searchStatus: false,
    filters: [
      {
        type: 'text',
        label: '综合',
        value: 'default',
        checked: true,
        groups: ['001'],
      },
      {
        type: 'sort',
        label: '价格',
        value: 'price',
        groups: ['002'],
      }
    ],
    history: [
      "iPhone XS",
      "手机壳"
    ],
    hot: [
      {
        isTop: true,
        sortOrder: 1,
        title: "夏凉82折起",
        type: 1, // 关联类型 0商品 1促销 2分类 3搜索词
        relateId: 1 // 关联id
      },
      {
        isTop: true,
        sortOrder: 2,
        title: "9.9元超值专区"
      },
      {
        isTop: false,
        sortOrder: 3,
        title: "护发生发必备"
      },
      {
        isTop: false,
        sortOrder: 4,
        title: "水杯"
      },
      {
        isTop: false,
        sortOrder: 5,
        title: "咖啡"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索',
    })
    if(options!=null){
      var channel = JSON.parse(options.channel);
      this.setData({
        channel: channel
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // 加载历史搜索词
    this.getHistory();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSearch: function (e) {
    if (!e.detail) {
      Toast('请输入搜索关键词');
      return;
    }
    Toast.loading({
      message: '加载中...',
      duration: 0
    });
    let that = this;
    this.queryProductList();
    setTimeout(function () {
      Toast.clear();
      that.setData({
        value: e.detail,
        searchStatus: true
      })
    }, 500)
    // 记录历史词
    this.setHistory(e.detail)
  },
  setHistory(v) {
    let history = wx.getStorageSync('historyKeyword');
    if (!history) {
      history = []
    }
    if (history.indexOf(v) >= 0) {
      // 去重
      return;
    }
    history.push(v);
    wx.setStorageSync('historyKeyword', history);
  },
  getHistory() {
    let history = wx.getStorageSync('historyKeyword');
    if (!history) {
      return;
    }
    this.setData({
      history: history
    })
  },
  onCancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onClear: function () {
    this.setData({
      value: "",
      searchStatus: false
    })
  },
  clearHistory: function () {
    this.setData({
      history: []
    })
    wx.setStorageSync('historyKeyword', []);
  },
  clickTag: function (e) {
    let data = e.currentTarget.dataset.value;
    this.setData({
      value: data,
      searchStatus: true
    })
    this.queryProductList();
  },
  onFilterChange: function (e) {
    let price = e.detail.checkedValues[1];
    if (price == 1) {
      let data = this.data.result;
      data.sort(function (a, b) {
        return a.price - b.price
      });
      this.setData({
        result: data
      })
    } else if (price == -1) {
      let data = this.data.result;
      data.sort(function (a, b) {
        return b.price - a.price
      });
      this.setData({
        result: data
      })
    } else {
      let data = this.data.result;
      data.sort(function (a, b) {
        return a.id - b.id
      });
      this.setData({
        result: data
      })
    }
  },
  handleClick: function (e) {
    let product = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/product/product?product=' + product
    });
  },
  scrollListen: function (e) {
    this.queryProductList();
    console.log("滑到底部啦 该加载下一页数据啦")
  },
  queryProductList: function (e) {
    var that=this;
    //调用接口
    api.get(queryProductList, {
      code: that.data.channel.code,
      size: 20,
      current: that.data.page,
      keyword: this.data.value
    }).then(res => {
      //成功时回调函数
      var that = this;
      console.log(res);
      var productList = res.data;
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
})