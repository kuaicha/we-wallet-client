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
    var balList = wx.getStorageSync('balList');
    console.log("balList in Storage is: "+JSON.stringify(balList));
  }
})