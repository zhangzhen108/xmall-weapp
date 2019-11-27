//app.js
App({
  onLaunch: function () {
  
  },
  globalData: {
    userInfo: {
      nickName: "Hi，游客",
      username: "点击去登录",
      avatarUrl: "/assets/avatar.png"
    },
    token: "",
    host: 'http://192.168.1.108:8082/',
  }
})