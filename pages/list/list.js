const app = getApp()

Page({
  data: {
    //itemIcon: "ether_logo_small.png",
    testContent: null,
    balList:null
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
          res.data[i].logoSrc = "coinLogo_"+res.data[i].coinid+".png"
          res.data[i].addAbbr =  res.data[i].address.substr(0, 4) + "..." + res.data[i].address.substr(-4, 4)
          res.data[i].coinName = app.globalData.coins[res.data[i].coinid].coinNameAbbr
        }

        that.setData({
          balList:res.data
        })
        //console.log("Res Data Sting:" + JSON.stringify(res.data));
        //console.log("balList:" + JSON.stringify(that.data.balList));
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
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
          res.data[i].logoSrc = "coinLogo_" + res.data[i].coinid + ".png"
          res.data[i].addAbbr = res.data[i].address.substr(0, 4) + "..." + res.data[i].address.substr(-4, 4)
          res.data[i].coinName = app.globalData.coins[res.data[i].coinid].coinNameAbbr
        }

        that.setData({
          //testContent: JSON.stringify(res.data),
          balList: res.data
        })
        
        //console.log("balList:" + JSON.stringify(that.data.balList));
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("request complete:" + err)
        wx.hideLoading()
      }
    });
  }
})