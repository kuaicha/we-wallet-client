// test.js

var app = getApp()

Page({

  onShow: function () {
    var userId = app.globalData.userId;
    if (app.globalData.userId === "") {
      console.log("local userId is null");
      //this.login();
    }else{
      console.log("local userId is "+ userId);
    }
  },

  

  data: { },

  clearuserId:function () {
    wx.clearStorageSync();
    app.globalData.userId = null
  },

  test: function () {
    console.log("userRegister() is call");
    var that = this;
    var rgstURL = app.globalData.kcURL + "/register";
    wx.login({
      success: function (res) {
        let _code = res.code;
        if (_code) {
          wx.request({
            url: rgstURL,
            data: {
              'code': _code,
            },
            success: res => {
              console.log("userId is:" + res.data.userId);
              app.globalData.userId = res.data.userId
              wx.setStorageSync('userId', app.globalData.userId)
            }
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '微信登录失败',
          duration: 1500
        });
      }
    });
  },

})