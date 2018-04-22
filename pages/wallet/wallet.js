var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();

Page({
  data: {
    tabs: ["数字货币", "Token代币"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //balList: app.globalData.balList
  },

  onAddCoinWalletTap: function (e) {
    wx.navigateTo({
      url: '../wallet_input/input',
    })
  },

  queryCoinWallet: function () {
    console.log("queryCoinWallet() is called")

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

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    var activeIndex = this.data.activeIndex;
    console.log("tabClick() is called and this.data.activeIndex is:" + activeIndex);
    wx.showLoading({
      title: '数据刷新中',
      mask: true
    });
    if (activeIndex == 0) {
      this.queryCoinWallet();
    } else if (activeIndex == 1) {
      this.queryTWallet();
    }


  },

  onPasteTap: function () {
    var that = this;
    wx.getClipboardData({
      success: function (res) {
        //console.log(res.data)
        that.setData({
          address: res.data,
          addressTip: res.data
        })

      }
    })
  },

  onBtnScan: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res.result);
        that.setData({
          addressTip: res.result
        })
      }
    })

  },

  onBlur: function () {

  },

  onInput: function (e) {
    this.setData({
      addressTip: e.detail.value,
    })
  },

/** Navtab 1 Token 代币相关函数 */

  onWalletAddTap: function (e) {
    wx.navigateTo({
      url: '../ether_wallet/ether_wallet',
    })
  },

  onAddTap: function (e) {
    wx.navigateTo({
      url: '../token_input/token_input',
    })
  },


  queryTWallet: function () {

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
    var activeIndex = this.data.activeIndex;
    console.log("onReady() is called and this.data.activeIndex is:" + activeIndex);
    this.queryCoinWallet();

  },

  onLoad: function (option) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    this.queryCoinWallet();

  },

  onShow: function () {
    //this.queryCoinWallet();
    var activeIndex =  this.data.activeIndex;
    console.log("onShow() is called and this.data.activeIndex is:" + activeIndex);
    wx.showLoading({
      title: '数据刷新中',
      mask: true
    });
    if (activeIndex == 0){
      this.queryCoinWallet();
    } else if (activeIndex == 1){
      this.queryTWallet();
    }
    
    /**
    wx.showLoading({
      title: '数据刷新中',
      //mask: true
    });
    
    switch (activeIndex) {
      case 0:
        console.log("case 0");
        this.queryCoinWallet();
        break;
      case 1:
        console.log("case 1");
        this.queryTWallet();
        break;
    };

     */
  },

  onPullDownRefresh: function () {
    var activeIndex = this.data.activeIndex;
    console.log("onPullDownRefresh is called")
    wx.showLoading({
      title: '数据刷新中...',
      mask: true
    });
    if (activeIndex == 0) {
      this.queryCoinWallet();
    } else if (activeIndex == 1) {
      this.queryTWallet();
    }
  },

});