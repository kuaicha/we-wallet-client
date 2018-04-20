var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();

Page({
  data: {
    tabs: ["即查即走", "安全钱包", "Token钱包"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //data of the 1st navtab(page input)
    textAlign: "text-align:left",
    isQueried: false,
    resultLogoSrc: null,
    //data of the 2nd navtab(page list)
    //itemIcon: "ether_logo_small.png",
    balList: app.globalData.balList


  },

  onAddCoinWalletTap: function (e) {
    wx.navigateTo({
      url: '../wallet_input/input',
    })
  },

  queryCoinWallet: function () {

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

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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


  formSubmit: function (e) {

    this.setData({
      isQueried: false
    });

    const regCheck = /^\w+$/;
    var address = e.detail.value.address;

    //console.log("e.detail.value:" + e.detail.value.address);
    console.log("address：" + address);

    if (regCheck.test(address)) {
      console.log("test passed");
      this.addBalanceQuery(address);
    }
    else {
      wx.showModal({
        content: '钱包地址错误，请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击地址错误提示')
          }
        }
      });
    }
  },

  addBalanceQuery: function (address) {
    //查询余额
    var addQueryURL = app.globalData.kcURL + "/addqry";
    var that = this;

    console.log("addBalanceQuery: " + address);

    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({

      //请求地址
      url: addQueryURL,

      data: {
        ad: address,
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {

        if (res.statusCode != 200) {
          wx.showToast({
            title: '服务器维护中，查询失败...',
            icon: 'none',
            duration: 2000,
          });
          return;
        }

        that.setData({
          coinName: res.data[0].name,
          coinBalance: res.data[0].balance,
          //testContent: JSON.stringify(res.data),
          coinLogoSrc: ("../../images/" + res.data[0].name + "_logo_60.png"),
          isQueried: true
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
              console.log("userId is:" + res.data.userId);
              app.globalData.userId = res.data.userId
              wx.setStorageSync('userId', app.globalData.userId)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.userId === "") {  //暂时用userId替代hasLogin，只要有userId就不需登录了。
      console.log("local userId is null");
      this.userRegister();
    } else {
      console.log("local userId is " + app.globalData.userId);
    }

  },

});