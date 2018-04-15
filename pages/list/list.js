const app = getApp()

Page({
  data: {
    //itemIcon: "ether_logo_small.png",
    testContent: null,
    balList: app.globalData.balList
  },

  onAddTap: function(e){
    wx.navigateTo({
      url: '../wallet_input/input',
    })
  },

  queryWallet: function(){

    var coinWalletURL = app.globalData.kcURL + "/cwqry";
    var that = this;

    wx.request({

      //请求地址
      url: coinWalletURL,

      data: {
        uid: app.globalData.userId
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        console.log("Resp Data String:" + JSON.stringify(res.data));
        if (res.statusCode!=200){
          wx.showToast({
            title: '服务器维护中，数据未更新...',
            icon: 'none',
            duration: 2000,
          });
          return;
        }
        var resList = res.data;
        for (var i = 0; i < resList.length; i++) {
          res.data[i].addAbbr = res.data[i].address.substr(0, 8) + " ... " + res.data[i].address.substr(-8, 8)
          //res.data[i].addAbbr = "***" + res.data[i].address.substr(-8, 8)
          res.data[i].coinNameAbbr = app.globalData.coins[res.data[i].coinid].coinNameAbbr
          res.data[i].logoSrc = "../../images/" + res.data[i].coinNameAbbr + "_logo_60.png"
          console.log(res.data[i].logoSrc)
        }
        that.setData({
          balList: res.data,
        })
        //balList = res.data;
        //console.log("Res Data Sting:" + JSON.stringify(res.data));
        //console.log("app.globalData.balList:" + JSON.stringify(app.globalData.balList));
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


  //to do -- 展示余额列表
  onLoad: function () {
    //console.log("onLoad is called")
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });
  },

  onPullDownRefresh: function(){
    //console.log("onPullDownRefresh is called")
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });

    this.queryWallet();

  },

  onShow: function () {
    this.queryWallet();
    wx.showLoading({
      title: '数据刷新中',
    });

  },

  onHide: function(){
    app.globalData.balList = this.data.balList;
    console.log("###Page onHide is called### \n global balList is set to: " + JSON.stringify(app.globalData.balList));
    wx.setStorageSync('balList', app.globalData.balList);
    console.log("balList is stored: " + JSON.stringify(app.globalData.balList));
  },
})