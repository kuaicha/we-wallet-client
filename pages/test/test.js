// test.js

var app = getApp()

Page({

  onShow: function () {
    var userId = app.globalData.userId;
    if (app.globalData.userId === "") {
      console.log("local userId is null");
      this.login();
    }else{
      console.log("local userId is "+ userId);
    }
  },

  

  data: { },

  clearuserId:function () {
    wx.clearStorageSync();
    app.globalData.userId = null
  },

  test:function(){
    var address = '1EBHA1ckUWzNKN7BMfDwGTx6GKEbADUozX';
    var coinType = 1;
    var userId = 5;

    //添加地址
    var newCoinAddURL = app.globalData.kcURL + 'test/';
    var that = this;
    console.log("createNewAddress:" + address + ", coinType:" + coinType + ",userId:" + userId);

    wx.request({
      //请求地址
      url: newCoinAddURL,

      data: {
        ad: address,
        cid: coinType,
        uid: userId
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        console.log("resp data: " + res.data[0]);
        console.log("resp coinID: " + res.data[0].coinid);
        console.log("resp coinBalance: " + res.data[0].balance);
        console.log("resp address: " + res.data[0].address)
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err);
        wx.showToast({
          title: '网络不给力，请稍后再试',
          icon: 'none',
          duration: 2000,
        });

      },

      //结束回调
      complete: function (err) {
        console.log("request complete:" + err)
        wx.hideLoading()
      }

    });
  }
})