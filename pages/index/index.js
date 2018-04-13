//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'If you don’t believe me or don’t get it, I don’t have time to try to convince you, sorry.\n\n       - Satoshi Nakamoto',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: 'UnClick'
    
  },
  
  //事件处理函数
  onButtonTap: function() {
    wx.navigateTo({
      url: '../input/input'
    })
    console.log("查一查")
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 4.1.1	 发起请求 
  onTestButtonClick: function () {
    this.setData({
      userName: 'Ooops'
    })
  },


  onLoad: function () {

/** 不在启动画面登录
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    
*/
    setTimeout(function () {
      wx.switchTab({
        url: '../input/input'
      }); 
    }, 800) //延迟时间,单位是毫秒

    //console.log("Index Loaded")
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },




  formSubmit: function (e) {
    var address = e.detail.value.input;
    var scanURL = 'https://etherscan.io/address/' + address;
    var that = this;

    //request请求
    wx.request({


      //请求地址
      url:scanURL,
      //"https://wx.leadingdo.com",
      //'https://etherscan.io/address/0xbCB2A11bb3420C521a0Baa8c8bb624C383E294A0',
  
      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        console.log("request data:" + res.data)
        var regx = /<td>ETH Balance:[\s\S]*?(\d*)<b>.<\/b>(\d*) Ether\n/g;
        //var account_regx = /<title>\r\n\sEthereum Account (\w*) Info/g;
        //var regx = /微信([\u4e00-\u9fa5]*)入门/g;
        var s = res.data;
        //var s = "<td>ETH Balance:\r\n</td>\r\n<td>\r\n0<b>.</b>002557821891283691 Ether\r\n</td>"
        //var s = "<td>ETH Balance:\r\n</td>\r\n"
        console.log("s:" + s);
        //var result = account_regx.exec(s);
        var result = regx.exec(s);
        console.log("Regular Expression:\n");
        console.log("Input:" + result.input); //<head><title>123</title>
        console.log(result.index); //5
        console.log("result[0]:" + result[0]); //<head><title>123</title>
        console.log("result[1]:" + result[1]); //123
        console.log("result[2]:" + result[2]); //

        that.setData({
          pageContent: "余额：" + result[1] + "." + result[2] + " ETH"
        })

        //console.log("request data type:" + (typeof res.data))
        //console.log("request data Json:" + JSON.parse(res.data))
        //console.log("request success:" + res.header)
        //console.log("request success:" + res.data['serverTime'])



        that.setData({
          userName: 'Called Back'
        })
      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("request complete:" + err)
      }
    })

  }


})