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

  //to do -- 展示余额列表
  onLoad: function () {
    //console.log("onLoad is called")
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });

    var coinWalletURL = app.globalData.kcURL + "cwqry/";
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
        //console.log("Resp Data String:" + JSON.stringify(res.data));
        var resList = res.data;

        for (var i=0; i < resList.length; i++){
          res.data[i].logoSrc = "../../images/"+res.data[i].coinid+"_logo_20.png"
          res.data[i].addAbbr = res.data[i].address.substr(0, 1) + "***" + res.data[i].address.substr(-4, 4)
          //res.data[i].addAbbr = "***" + res.data[i].address.substr(-4, 4)
          res.data[i].coinName = app.globalData.coins[res.data[i].coinid].coinNameAbbr
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
          title: '网络不给力，更新失败！',
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

  onPullDownRefresh: function(){
    //console.log("onPullDownRefresh is called")
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });

    var coinWalletURL = app.globalData.kcURL + "cwqry/";
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
        //console.log("Resp Data String:" + JSON.stringify(res.data));
        var resList = res.data;

        for (var i = 0; i < resList.length; i++) {
          res.data[i].logoSrc = "../../images/"+res.data[i].coinid+"_logo_20.png"
          res.data[i].addAbbr = res.data[i].address.substr(0, 1) + "***" + res.data[i].address.substr(-4, 4)
          //res.data[i].addAbbr = "***" + res.data[i].address.substr(-4, 4)
          res.data[i].coinName = app.globalData.coins[res.data[i].coinid].coinNameAbbr
        }
        that.setData({
          balList:res.data,
        })
        
        //console.log("balList:" + JSON.stringify(app.globalData.balList));
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
        wx.showToast({
          title: '网络不给力，更新失败！',
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

  onShow: function () {
    wx.showLoading({
      title: '数据刷新中',
    });
    var coinWalletURL = app.globalData.kcURL + "cwqry/";
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
        //console.log("Resp Data String:" + JSON.stringify(res.data));
        var resList = res.data;

        for (var i = 0; i < resList.length; i++) {
          res.data[i].logoSrc = "../../images/"+res.data[i].coinid+"_logo_20.png"
          res.data[i].addAbbr = res.data[i].address.substr(0, 1) + "***" + res.data[i].address.substr(-4, 4)
          //res.data[i].addAbbr = "***" + res.data[i].address.substr(-4, 4)
          res.data[i].coinName = app.globalData.coins[res.data[i].coinid].coinNameAbbr
        }
        that.setData({
          balList: res.data,
        })

        //console.log("balList:" + JSON.stringify(app.globalData.balList));
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
        wx.showToast({
          title: '网络不给力，更新失败！',
          icon: 'none',
          duration: 2000,
        });
      },

      //结束回调
      complete: function (err) {
        console.log("onShow request complete:" + err)
        wx.hideLoading()
      }
    });
  },

  onHide: function(){
    app.globalData.balList = this.data.balList;
    console.log("###onHide is called### \n global balList is set to: " + JSON.stringify(app.globalData.balList));
    wx.setStorageSync('balList', app.globalData.balList);
    console.log("balList is stored: " + JSON.stringify(app.globalData.balList));
  },
})