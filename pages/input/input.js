// input.js

//获取应用实例
const app = getApp()

Page({

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

  onBtnScan: function (){
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

  onBlur: function (){
    
  },

  onInput: function (e){
    this.setData({
      addressTip: e.detail.value,
    })
  },


  formSubmit: function (e) {
   
    this.setData({
      isQueried:false
    });
    
    const regCheck = /^\w+$/;
    var address = e.detail.value.address;

    //console.log("e.detail.value:" + e.detail.value.address);
    console.log("address：" + address);

    if(regCheck.test(address)) {
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
    
    /** 
    //校验地址
    var regx = /^1\w{25,33}$/g; //比特币地址规则
    var result = regx.exec(address);
    if (result != null) {
      //console.log(result);
      //console.log("BTC Address: "+result[0]);
      this.balanceQuery("BTC",result[0])
    }
    else {
      var regx = /^0x\w{40}$/g; //以太坊地址规则
      var result = regx.exec(address);
      if (result != null) {
        //console.log(result);
        //console.log("BTC Address: " + result[0]);
        this.balanceQuery("ETH",result[0])
      }
      else{
        wx.showModal({
          content: '您输入的钱包地址有误，请查证后重新输入',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //console.log('用户点击地址错误提示')
            }
          }
        });
      }
    }
    **/


  addBalanceQuery: function (address) {
    //查询余额
    var kcURL = app.globalData.kcURL;
    var that = this;

    console.log("addBalanceQuery: " + address);

    wx.showLoading({
      title: '查询中',
      mask: true
    });
    
    wx.request({

      //请求地址
      url: kcURL,

      data: {
        ad: address,
      },

      //请求方式
      method: 'GET',

      //成功之后回调
      success: function (res) {
        console.log("resp data:" + JSON.stringify(res.data));
        console.log("resp header:" + JSON.stringify(res.header));
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
    wx.setStorageSync('userId', 5)
  },

  
  /* ###  DO NOT DELETE  ###
  userRegister: function () {
    console.log("userRegister() is call");
    var that = this;
    var rgstURL = app.globalData.kcURL + "register/";
    var userOpenId = null;
    wx.login({
      success: function (res) {
        let _code = res.code;
        if (_code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              // 小程序注册时生成的appid
              'appid': 'wx4afa57fe3b6afd14',
              // 小程序注册时生成的secret
              'secret': '9881dc0e8f800cafa36425589ae1ffc9',
              // wx.login()返回的登录凭证
              'js_code': _code,
              // 固定值
              'grant_type': 'authorization_code'
            },
            success: res => {
              console.log(res.data);
              userOpenId = res.data.openid;
              console.log("uoid is " + userOpenId);
              wx.request({
                url: rgstURL,
                data: {
                  uoid: userOpenId,
                },
                success: res => {
                  console.log(res.data.userId);
                  app.globalData.userId = res.data.userId
                  wx.setStorageSync('userId', app.globalData.userId)
                }
              })
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
   * 页面的初始数据
   */
  data: {
    testContent: null,
    textAlign: "text-align:left",
    isQueried:false,
    resultLogoSrc:null,
    //coinLogoSrc:"./xrp_logo_60.png"
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
    if (app.globalData.userId === "") {  //暂时用userId替代hasLogin，只要有userId就不需登录了。
      console.log("local userId is null");
      this.userRegister();
    } else {
      console.log("local userId is " + app.globalData.userId);
    }

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