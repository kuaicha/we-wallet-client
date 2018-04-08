//app.js
App({
  
  globalData: {
    userInfo: null,
    userId: wx.getStorageSync('userId'), //获取userId
    //hasLogin: false,  //目前只需要获得userId，后面就不再每次都登录
    kcURL: "http://139.199.213.120:8888/"
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },

  

  
})