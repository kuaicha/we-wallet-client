// transaction.js
const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {

  
  },

  queryAddrTx: function () {
    console.log("queryAddrTx() is called")

    var queryAddrTxURL = app.globalData.kwURL + "/get_txlist";
    var that = this;

    wx.request({

      //请求地址
      url: queryAddrTxURL,

      data: {
        ad: '0xbcb2a11bb3420c521a0baa8c8bb624c383e294a0'
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        console.log("Resp Data String:" + JSON.stringify(res.data));
        if (res.statusCode != 200) {
          wx.showToast({
            title: '服务器维护中，数据未更新...',
            icon: 'none',
            duration: 3000,
          });
          that.setData({
            //txList: wx.getStorageSync('txList'),
          });
          //app.globalData.txlList = that.data.balList;
          return;
        }
        var resList = res.data;
        for (var i = 0; i < resList.length; i++) {
          res.data[i].addAbbr = res.data[i].other_address.substr(0, 8) + " ... " + res.data[i].other_address.substr(-8, 8)
        };

        that.setData({
          txList: res.data,
        });
        //app.globalData.balList = res.data;
        //balList = res.data;
        //console.log("Res Data Sting:" + JSON.stringify(res.data));
        //console.log("app.globalData.balList is set to:" + JSON.stringify(app.globalData.balList));
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
        wx.showToast({
          title: '网络不给力，数据更新失败！',
          icon: 'none',
          duration: 3000,
        });


        that.setData({
          balList: wx.getStorageSync('balList'),
        });
        app.globalData.balList = that.data.balList;
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
    wx.showLoading({
      title: '数据刷新中',
      mask: true
    });
    this.queryAddrTx();
  
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