
//获取应用实例
const app = getApp()

Page({
    data: {

        radioItems: [
            {name: '比特币(BTC)', value: 1, checked: true},
            {name: '以太坊(ETH)', value: 2},
            {name: '莱特币(LTC)', value: 3},
            {name: '瑞波币(XRP)', value: 4},
        ],

        isAgree: false,
        isValidAdd: false,
        addressTip: "",
        address:"",
        addressAlarm: "",
        //userOpenId:'olfLh5HCRaDHswZahdzH9R4BAUec'
    },

    radioChange: function (e) {
      //console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
        radioItems: radioItems
      });
    },

    onAddInput: function (e) {
      this.setData({
        addressTip: "输入地址为：" + e.detail.value,
        addressAlarm: ""


      })
    },

    onAddBlur: function(e) {
      this.setData({
        address: e.detail.value
      })
      this.preVerify();
    },
    
    onPasteTap: function () {
      //console.log("onPasteTap is called")
      var that = this;
      wx.getClipboardData({
        success: function (res) {
          //console.log(res.data)
          that.setData({
            address: res.data,
            addressTip: "粘贴地址为：" + res.data,
            addressAlarm: ""
          })
          that.preVerify();
        }
      })
    },


    onScanTap: function () {
      //console.log("onScanTap is called")
      var that = this;
      wx.scanCode({
        success: (res) => {
          //console.log(res.result);
          that.setData({
            address: res.result,
            addressTip: "扫码地址为：" + res.result,
            addressAlarm: ""
          })
          that.preVerify();
        }
      })

    },

    onConfirmTap: function(){
      //console.log("onConfirmTap() is called");
      var that = this;        
      this.verify();
    },

    preVerify: function(){
      var address = this.data.address;
      const regCheck = /^\w+$/;
      //console.log("PreVerify() is called & this.address = " + address);

      if (!regCheck.test(address)) {
        console.log("Verify() Failed");
        this.setData({
          addressTip: "",
          addressAlarm: "输入地址错误！请重新输入"
      
        })
      }
    },
    
    verify: function(){
        const regBTC = /^1\w{25,33}$/; //比特币地址规则
        const regETH = /^0x\w{40}$/; //以太坊地址规则
        const regLTC = /^L\w{25,33}$/; //莱特币地址规则
        const regXRP = /^r\w{25,33}$/; //瑞波币地址规则

        console.log("verify() is called" )
        var address = this.data.address;
        var coinType = 0;
        //var userOpenId = this.data.userOpenId
        var userId = app.globalData.userId;
        console.log("userId = " + userId);
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          if (radioItems[i].checked){
            coinType = radioItems[i].value;
            console.log("CoinType = "+ coinType)
          }
        }

        switch (coinType) {
     
          case 1:
            console.log("BTC Address：" + address);
            if (regBTC.test(address)) {
              console.log("BTC test passed");
              this.createNewAddress(address, coinType,userId)

            }
            else {
              wx.showModal({
                content: '输入的不是合法比特币地址，请重新输入',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    //console.log('用户点击地址错误提示')
                  }
                }
              });
            };
            break;

          case 2:
            console.log("ETH Address：" + address);
            if (regETH.test(address)) {
              console.log("ETH test passed");
              this.createNewAddress(address, coinType,userId)
            }
            else {
              wx.showModal({
                content: '输入的不是合法以太坊地址，请重新输入',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    //console.log('用户点击地址错误提示')
                  }
                }
              });
            };
            break;

          case 3:
            console.log("LTC Address：" + address);
            if (regLTC.test(address)) {
              console.log("LTC test passed");
              this.createNewAddress(address, coinType,userId)
            }
            else {
              wx.showModal({
                content: '输入的不是合法莱特币地址，请重新输入',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    //console.log('用户点击地址错误提示')
                  }
                }
              });
            };
            break;
          
          case 4:
            console.log("XRP Address：" + address);
            if (regXRP.test(address)) {
              console.log("XRP test passed");
              this.createNewAddress(address, coinType,userId)
            }
            else {
              wx.showModal({
                content: '输入的不是合法瑞波币地址，请重新输入',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    //console.log('用户点击地址错误提示')
                  }
                }
              });
            };
            break;

          default:
            console.log("Default Address：" + address);
            console.log("switch coinType is " + coinType);
        }
    },

    
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },


    createNewAddress: function (address, coinType, userId) {

      //添加地址
      var newCoinAddURL = app.globalData.kcURL + 'new_address/';
      var that = this;
      console.log("createNewAddress:" + address + ", coinType:" + coinType + ",userId:" + userId);
      wx.showLoading()
      wx.request({
        //请求地址
        url: newCoinAddURL,

        data: {
          ad: address,
          cid: coinType,
          uid: userId
        },

        //请求方式
        method: 'GET',

        //成功之后回调
        success: function (res) {
          console.log("resp data: " + res.data[0]);
          console.log("resp coinID: " + res.data[0].coinid);
          console.log("resp coinBalance: " + res.data[0].balance);
          console.log("resp address: " + res.data[0].address)
          wx.switchTab({
            url: '../list/list'
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

});