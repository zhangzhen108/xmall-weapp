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
    searchStatus: true,
    category:'',
    sortFiled:'',
    sort: 1,
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
        checked: false,
        value: 'price',
        groups: ['002'],
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options!=null){
      var category = JSON.parse(options.category);
      var channel = JSON.parse(options.channel);
      this.setData({
        category: category,
        channel: channel
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.category.name,
    })
    this.queryProductList();
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
    this.onLoad();
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
  handleClick: function (e) {
    let data = e.currentTarget.dataset.value;
    var product = encodeURIComponent(JSON.stringify(data))
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
      channelCode: that.data.channel.code,
      categoryThirdId: that.data.category.thirdid,
      size: 20,
      current: that.data.page,
      keyword: this.data.value,
      sort:that.data.sort,
      sortFiled: that.data.sortFiled,
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
  onFilterChange: function(e){
    let price = e.detail.checkedValues[1];
    console.log(e);
    if (price != null && price!=''){
      this.setData({
        sortFiled: "price",
        sort: price
      })
    }else{
      this.setData({
        sortFiled: '',
        sort: ''
      })
    }
     this.setData({
       productList: [],
       page: 1
     })
    this.queryProductList();
  }
})