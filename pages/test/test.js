// test.js

var app = getApp()

Page({

  onShow: function () {


    var uid = app.globalData.uid;
    if (app.globalData.uid === "") {
      console.log("local uid is null");
      this.login();
    }else{
      console.log("local uid is "+ uid);
    }
  },

  

  data: { },

  clearUid:function () {
    wx.clearStorageSync();
    app.globalData.uid = ''
  },

  login: function () {
    console.log("Login() is call")
    var that = this
    wx.login({
      success: function (res) {
        let _code = res.code;
        if (_code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              // 小程序注册时生成的appid
              'appid': 'wx4afa57fe3b6afd14',
              // 小程序注册时生成的secret
              'secret': '9881dc0e8f800cafa36425589ae1ffc9',
              // wx.login()返回的登录凭证
              'js_code': _code,
              // 固定值
              'grant_type': 'authorization_code'
            },
            success: res => {
              console.log(res.data);
              console.log("Server uid is " + '1');
              wx.setStorageSync('uid','1')
              app.globalData.uid = '1'

            }
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '微信登录失败',
          duration: 1500
        });
      }
    });
  }
})