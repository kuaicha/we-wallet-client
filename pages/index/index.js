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
              if (res.statusCode != 200){
                return;
              }else{
                //console.log("userId registered is:" + res.data.userId);
                app.globalData.userId = res.data.userId
                //console.log("app.globalData.userId registered is :" + app.globalData.userId);
                //console.log("test result is :" + (app.globalData.userId == undefined));
                app.globalData.defaultWallet = { 'address': res.data.etherWalletAddress, 'walletId': res.data.etherWalletId };
                wx.setStorageSync('userId', app.globalData.userId);
                //console.log("userId is stored:" + wx.getStorageSync('userId'));
                wx.setStorageSync('defaultWallet', app.globalData.defaultWallet);
              }
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
    
  },

  onShow: function() {

  },

  onReady: function(){
    if (app.globalData.userId == '' || app.globalData.userId == null) {  //暂时用userId替代hasLogin，只要有userId就不需登录了。
      console.log("local userId is '' and called userRegister");
      this.userRegister();
    } else {
      console.log("local userId is " + app.globalData.userId);
    };
    
    setTimeout( () => {
      wx.switchTab({
        url: '../wallet/wallet'
      }); 
    },3000);
    
  }

})