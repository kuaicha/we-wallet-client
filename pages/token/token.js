const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onWalletAddTap: function (e) {
    wx.navigateTo({
      url: '../ether_wallet/ether_wallet',
    })
  },

  onAddTap:function(e) {
    wx.navigateTo({
      url: '../token_input/token_input',
    })
  },


  queryTWallet: function () {
    console.log("queryTWallet is called");
    this.setData({
      //tokenList: app.globalData.tokenList,
      //tokenAddList: app.globalData.tokenAddList,
      defaultTokenAdd: app.globalData.defaultWallet.address,    
      defaultTokenAddAbbr: app.globalData.defaultWallet.address.substr(0, 8) + ' ... ' + app.globalData.defaultWallet.address.substr(-8, 8)
    });
    
    console.log("defaultTokenAdd:" + this.data.defaultTokenAdd);
    console.log("app.globalData.defaultWallet.address:" + app.globalData.defaultWallet.address);

    var tokenWalletURL = app.globalData.kcURL + "/twqry";
    var that = this;
    console.log("defaultWalleid:" + app.globalData.defaultWallet.walletId);

    wx.request({
      //请求地址
      url: tokenWalletURL,

      data: {
        wid: app.globalData.defaultWallet.walletId
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
            duration: 2000,
          });
          return;
        }

        var resList = res.data;
        for (var i = 0; i < resList.length; i++) {
          resList[i].conAddAbbr = resList[i].contract_address.substr(0, 8) + " ... " + resList[i].contract_address.substr(-8, 8)
        }
        that.setData({
          tokenList: resList
        });
        console.log("tokenList is set to:" + JSON.stringify(that.data.tokenList))
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
        wx.showToast({
          title: '网络不给力，数据更新失败！',
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
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });
    this.queryTWallet();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });
    this.queryTWallet();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });
    this.queryTWallet();

  },

  /**
   * 生命周期函数--监听页面隐藏

  onHide: function () {
    app.globalData.tokenList = this.data.tokenList;
    console.log("###Page onHide is called### \n global tokenList is set to: " + JSON.stringify(app.globalData.tokenList));
    wx.setStorageSync('tokenList', app.globalData.tokenList);
    console.log("tokenList is stored: " + JSON.stringify(wx.getStorageSync('tokenList')));

    for (var i = 0; i < this.data.tokenAddList.length; i++) {
      this.data.tokenAddList[i].abbr = this.data.tokenAddList[i].address.substr(0, 10) + ' ... ' + this.data.tokenAddList[i].address.substr(-10, 10)
    };
    app.globalData.tokenAddList = this.data.tokenAddList;
    wx.setStorageSync('tokenAddList', app.globalData.tokenAddList);
    console.log("tokenAddList is stored: " + JSON.stringify(wx.getStorageSync('tokenAddList')));

  },

     */

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh is called")
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });
    this.queryTWallet();
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
