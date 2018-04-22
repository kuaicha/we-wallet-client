//获取应用实例
const app = getApp()

Page({
    data: {

/** 隐藏币种选择
        radioItems: [
            {name: '比特币(BTC)', value: 1, checked: true},
            {name: '以太坊(ETH)', value: 2},
            {name: '莱特币(LTC)', value: 3},
            {name: '瑞波币(XRP)', value: 4},
        ],
 */
        isAgree: true,
        isValidAdd: false,
        addressTip: "",
        address:"",
        addressAlarm: "",
        coinId:0
        //userOpenId:'olfLh5HCRaDHswZahdzH9R4BAUec'
    },

/**
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
*/

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
            //addressTip: "粘贴地址为：" + res.data,
            //addressAlarm: ""
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
            //addressTip: "扫码地址为：" + res.result,
            //addressAlarm: ""
          })
          that.preVerify();
        }
      })

    },


    preVerify: function(){
      var address = this.data.address;
      const regCheck = /^\w+$/;
      //console.log("PreVerify() is called & this.address = " + address);
      var coinId = null;
      if (!regCheck.test(address)) {
        console.log("basic verification() Failed");
        this.setData({
          addressTip: "",
          addressAlarm: "输入地址错误！请重新输入"
        })
      }else {
        const regBTC = /^1\w{25,33}$/; //比特币地址规则
        const regETH = /^0x\w{40}$/; //以太坊地址规则
        const regLTC = /^L\w{25,33}$/; //莱特币地址规则
        const regXRP = /^r\w{25,33}$/; //瑞波币地址规则

        if (regBTC.test(address)){
          console.log("BTC test passed");
          this.setData({
            coinId:1,
            addressAlarm: "",
            addressTip: "您添加的是比特币地址：" + address,
            isValidAdd:true
          })

        } else if (regETH.test(address)) {
          console.log("ETH test passed");
          this.setData({
            coinId: 2,
            addressAlarm: "",
            addressTip: "您添加的是以太坊地址：" + address,
            isValidAdd: true
          })
        } else if (regLTC.test(address)) {
          console.log("LTC test passed");
          this.setData({
            coinId: 3,
            addressAlarm: "",
            addressTip: "您添加的是莱特币地址：" + address,
            isValidAdd: true
          })
        } else if (regXRP.test(address)) {
          console.log("XRP test passed");
          
          this.setData({
            coinId: 4,
            addressAlarm: "",
            addressTip: "您添加的是瑞波币地址：" + address,
            isValidAdd: true
          })
        } else{
          this.setData({
            addressAlarm: "无法识别您添加的货币类型，目前系统支持比特币，以太坊，莱特币，瑞波币!",
            addressTip: ""
          })
        } 
      }
    },
    
    
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },


    createNewAddress: function () {

      if (!this.data.isValidAdd){
        wx.showToast({
          title: '输入地址不正确',
          icon: 'none',
          duration: 1000,
        });
        return;
      }
      console.log("createNewAddress() is called")
      var address = this.data.address;
      var coinId = this.data.coinId;
      var userId = app.globalData.userId;
      //添加地址
      var newCoinAddURL = app.globalData.kcURL + '/new_address';
      var that = this;
      console.log("createNewAddress:" + address + ", coinId:" + coinId + ",userId:" + userId);
      wx.showLoading()
      wx.request({
        //请求地址
        url: newCoinAddURL,

        data: {
          ad: address,
          cid: coinId,
          uid: userId
        },

        //请求方式
        method: 'GET',

        //成功之后回调
        success: function (res) {
          console.log("resp data: " + res.data[0]);
          console.log("resp coinID: " + res.data[0].coinid);
          console.log("resp coinBalance: " + res.data[0].balance);
          console.log("resp address: " + res.data[0].address);
          
          wx.switchTab({
            url: '../wallet/wallet'
          });
          app.globalData.refreshNavtabId = 1;
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