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
  },

  test1: function () {
    console.log("setStorageSync() is call");
    wx.setStorageSync('defaultTokenAdd', '0xbCB2A11bb3420C521a0Baa8c8bb624C383E294A0');
    wx.setStorageSync('defaultWallet', {'address': '0xbcb2a11bb3420c521a0baa8c8bb624c383e294a0', 'walletId': 2 });
  },

  test: function (){
    if (app.globalData.userId == null) {  //暂时用userId替代hasLogin，只要有userId就不需登录了。
      console.log("local userId is null");
      this.userRegister();
    } else {
      console.log("local userId is " + app.globalData.userId);
    }
  }
    
  
})