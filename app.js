//app.js
App({
  
  globalData: {
    userId: wx.getStorageSync('userId'), //获取userId
    balList: wx.getStorageSync('balList'),
    //hasLogin: false,  //目前只需要获得userId，后面就不再每次都登录
    kcURL: "http://139.199.213.120:8888/",
    coins: {
      1: { "coinNameAbbr": "BTC", "coinNameCn": "比特币" },
      2: { "coinNameAbbr": "ETH", "coinNameCn": "以太坊" },
      3: { "coinNameAbbr": "LTC", "coinNameCn": "莱特币" },
      4: { "coinNameAbbr": "XRP", "coinNameCn": "瑞波币" }
    }
    
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //balList: wx.getStorageSync('balList')
    console.log("###onLaunch is called ###");
    console.log("this.globalData.userId is:" + JSON.stringify(this.globalData.userId));
    console.log("this.globalData.balList is:" + JSON.stringify(this.globalData.balList));

  },

  onHide: function () {
    console.log("app.onHide() is Called")
    wx.setStorageSync('balList', this.globalData.balList);
    console.log("this.globalData.balList is: " + this.globalData.balList)

  }
  
})