//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },

  userRegister: function () {
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
              app.globalData.defaultWallet = { 'address': res.data.etherWalletAddress, 'walletId': res.data.etherWalletId };
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


  onLoad: function () {
    if (app.globalData.userId == null) {  //暂时用userId替代hasLogin，只要有userId就不需登录了。
      console.log("local userId is null and called userRegister");
      this.userRegister();
    } else {
      console.log("local userId is " + app.globalData.userId);
    };
    //console.log("Index Loaded")
  },
  onShow: function() {

  },
  onReady: function(){
    if (app.globalData.userId == null) {  //暂时用userId替代hasLogin，只要有userId就不需登录了。
      console.log("local userId is null and called userRegister");
      this.userRegister();
    } else {
      console.log("local userId is " + app.globalData.userId);
    };
    
    setTimeout( () => {
      wx.switchTab({
        url: '../wallet/wallet'
      }); 
    },2000);
    
    setTimeout
  }

})