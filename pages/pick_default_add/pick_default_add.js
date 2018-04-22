// pick_default_add.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenAddList: app.globalData.tokenAddList,
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var items = this.data.tokenAddList;
    console.log('items is ', JSON.stringify(this.data.tokenAddList));
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].walletId == e.detail.value;
      if (items[i].walletId == e.detail.value) {
        app.globalData.defaultWallet = items[i];
      }
    }
    console.log("itmes is:"+ JSON.stringify(items));
    this.setData({
      tokenAddList: items
    });
    app.globalData.tokenAddList = items;
    console.log("app.globalData.tokenAddList is set to:" + JSON.stringify(app.globalData.tokenAddList));
    console.log("app.globalData.defaultWallet is set to:" + JSON.stringify(app.globalData.defaultWallet));
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("app.globalData.tokenAddList is:" + JSON.stringify(app.globalData.tokenAddList));
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
    this.setData({
      items: app.globalData.tokenAddList
    });
  
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