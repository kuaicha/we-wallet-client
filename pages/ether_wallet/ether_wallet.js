// token_input.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //isAgree: true,
    isValidAdd: false,
    addressTip: "",
    address: "",
    addressAlarm: "",
  },

  onAddInput: function (e) {
    this.setData({
      addressTip: "输入地址为：" + e.detail.value,
      addressAlarm: "",
      conAddAlarm: ""
    })
  },

  onAddBlur: function (e) {
    this.setData({
      address: e.detail.value
    })
    this.preVerify();
  },

  onPasteTap: function () {
    console.log("onPasteTap is called")
    var that = this;
    wx.getClipboardData({
      success: function (res) {
        console.log(res.data)
        that.setData({
          address: res.data,
          //addressTip: "粘贴地址为：" + res.data,
          //addressAlarm: ""
        })
        that.preVerify();
      }
    })
  },


  onScanTap: function () {
    //console.log("onScanTap is called")
    var that = this;
    wx.scanCode({
      success: (res) => {
        //console.log(res.result);
        that.setData({
          address: res.result,
          //addressTip: "扫码地址为：" + res.result,
          //addressAlarm: ""
        })
        that.preVerify();
      }
    })
  },


  preVerify: function () {
    var address = this.data.address;
    const regETH = /^0x\w{40}$/; //以太坊地址规则
    if (regETH.test(address)) {
      console.log("ETH test passed");
      this.setData({
        addressAlarm: "",
        addressTip: "您输入的钱包地址为：" + address,
        conAddTip: "",
        conAddAlarm: "",
        isValidAdd: true
      });

    } else {
      this.setData({
        addressAlarm: "您输入的不是以太坊钱包地址!",
        addressTip: "",
        conAddTip: "",
        conAddAlarm: ""
      })
    }
  },

  createNewTWallet: function () {

    if (!this.data.isValidAdd) {
      wx.showToast({
        title: '输入地址不正确',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    console.log("createNewTWallet() is called")
    var address = this.data.address;
    var userId = app.globalData.userId;


    //添加地址
    var newTokenAddURL = app.globalData.kcURL + '/token/new_wallet';
    var that = this;
    console.log("createNewTWallet: " + address + ",userId:" + userId);
    wx.showLoading()
    wx.request({
      //请求地址
      url: newTokenAddURL,

      data: {
        ad: address,
        uid: userId,
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        //console.log("resp walletId: " + res.data.walletId);
        if (res.data.result==0){
          app.globalData.defaultWallet = {'address':that.data.address,'walletId':res.data.walletId};
          //console.log("app.globalData.defaultWallet is set to: " + JSON.stringify(app.globalData.defaultWallet));
        }else{
          wx.showToast({
            title: '服务器维修中，请稍后再试',
            icon: 'none',
            duration: 2000,
          });
        }
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