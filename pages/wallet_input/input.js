Page({
    data: {

        radioItems: [
            {name: '比特币(BTC)', value: '1', checked: true},
            {name: '以太坊(ETH)', value: '2'},
            {name: '莱特币(LTC)', value: '3'},
            {name: '瑞波币(XRP)', value: '4'},
        ],

        isAgree: false,
        isVerified: false,
        addressTip: "",
        address:"",
        addressTipType:"weui-cells__tips"
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
        addressTip: "输入地址为：" + e.detail.value
      })
    },

    onAddBlur: function(e) {
      this.setData({
        address: e.detail.value
      })
      this.verify();
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
          })
          that.verify();
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
            addressTip: "扫码地址为：" + res.result
          })
          that.verify();
        }
      })

    },

    onConfirmTap: function(){
        var that = this;

    },

    preVerify: function(){
      
      const regCheck = /^\w+$/;
      var address = this.data.address;
      //console.log("PreVerify() is called & this.address = " + address);

      if (!regCheck.test(address)) {
        console.log("Verify() Failed");
        this.setData({
          addressTip: "输入地址错误！",
          addressTipType:"weui-cells__alarm"
        })
      }
    },
    
    verify: function(){
        //console.log("Verify() is called" )

        this.preVerify();

        var coinType = 1;
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          if (radioItems[i].checked){
            var coinType = radioItems[i].value;
            //console.log("CoinType = "+ coinType)
          }
        }

        switch(coinType){
          case 2:
            const regCheck = /^\w+$/;
            var address = e.detail.value.address;
            console.log("Address：" + address);

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
            break;
        }
    },

    
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    }
});