// token_input.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //isAgree: true,
    isValidConAdd: false,
    conAddress: "",
    conAddAlarm: "",
    conAddTip: "",
    tokenName:'未命名',
    tokenAcronym:'未命名'
  },

  onConInput: function (e) {
    this.setData({
      conAddTip: "输入地址为：" + e.detail.value,
      conAddAlarm: "",
      addressAlarm: "",
      addressTip: ""
    })
  },

  onConBlur: function (e) {
    this.setData({
      conAddress: e.detail.value
    })
    this.conPreVerify();
  },

  onConPasteTap: function () {
    //console.log("onPasteTap is called")
    var that = this;
    wx.getClipboardData({
      success: function (res) {
        //console.log(res.data)
        that.setData({
          conAddress: res.data,
          //addressTip: "粘贴地址为：" + res.data,
          //addressAlarm: ""
        })
        that.conPreVerify();
      }
    })
  },


  onConScanTap: function () {
    //console.log("onScanTap is called")
    var that = this;
    wx.scanCode({
      success: (res) => {
        //console.log(res.result);
        that.setData({
          conAddress: res.result,
          //addressTip: "扫码地址为：" + res.result,
          //addressAlarm: ""
        })
        that.conPreVerify();
      }
    })
  },

  onNameInput: function (e) {
    this.setData({
      tokenName: e.detail.value,
    })
  },

  onAcroInput: function (e) {
    this.setData({
      tokenAcronym: e.detail.value,
    })
  },

  conPreVerify: function () {
    var conAddress = this.data.conAddress;
    const regETH = /^0x\w{40}$/; //以太坊地址规则
    if (regETH.test(conAddress)) {
      console.log("ETH test passed");
      this.setData({
        addressAlarm: "",
        addressTip: "",
        conAddTip: "您输入的合约地址为：" + conAddress,
        conAddAlarm: "",
        isValidConAdd: true
      });

    } else {
      this.setData({
        addressAlarm: "",
        addressTip: "",
        conAddTip: "",
        conAddAlarm: "您输入的不是以太坊合约地址!",
      })
    }
  },

  createNewToken: function () {
    if (!this.data.isValidConAdd) {
      wx.showToast({
        title: '输入地址不正确',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    console.log("createNewToken() is called and conAddress ="+ this.data.conAddress);
    var conAddress = this.data.conAddress;
    var tokenAcronym = this.data.tokenAcronym;
    var tokenName = this.data.tokenName;
    var userId = app.globalData.userId;
    var walletId = app.globalData.defaultWallet.walletId;
    var walletAddress = app.globalData.defaultWallet.address;

    //添加地址
    var newTokenAddURL = app.globalData.kcURL + '/token/new_token';
    var that = this;
    console.log("createNewToken: " + walletAddress + ", conAddress:" + conAddress + ",userId:" + userId);
    wx.showLoading()
    wx.request({
      //请求地址
      url: newTokenAddURL,

      data: {
        cad: conAddress,
        wad: walletAddress,
        wid: walletId,
        tacro: tokenAcronym,
        tnm: tokenName
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        console.log("resp data: " + res.data);
        console.log("resp address: " + res.data.address);
        //app.globalData.defaultTokenAdd = res.data.address;
        //wx.setStorageSync('defaultTokenAdd', app.globalData.defaultTokenAdd);
        
        wx.switchTab({
          url: '../token/token'
        });
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})