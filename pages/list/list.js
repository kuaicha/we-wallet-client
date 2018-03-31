
Page({
    data: {
      itemIcon: "ether_logo_small.png",
    },

    onAddTap: function(e){
      wx.navigateTo({
        url: '../wallet_input/input',
      })
    }


})

    /*
    onLoad: function(option){
      //console.log(option.ad)

      var scanURL = "http://139.199.213.120:8888/balance";
      var that = this;

      wx.request({

        //请求地址
        url: scanURL,

        data: {
         ad: option.ad
        },

        //请求方式
        method: 'GET',

        //成功之后回调
        success: function (res) {
          console.log("resp data:" + res.data)


          that.setData({
            balance: res.data[0].balance,
            testContent: JSON.stringify(res.data),
            balList:res.data
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
    */

