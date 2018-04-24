//app.js
App({
  
  globalData: {
    userId: wx.getStorageSync('userId'), //读取本地userId
    defaultWallet: wx.getStorageSync('defaultWallet'), //读取本地默认钱包
    //balList: wx.getStorageSync('balList'),
    //tokenList: wx.getStorageSync('tokenList'),
    kcURL: "https://qklkc.club/kc",
    coins: {
      1: { "coinNameAbbr": "BTC", "coinNameCn": "比特币" },
      2: { "coinNameAbbr": "ETH", "coinNameCn": "以太坊" },
      3: { "coinNameAbbr": "LTC", "coinNameCn": "莱特币" },
      4: { "coinNameAbbr": "XRP", "coinNameCn": "瑞波币" }
    }
  },

  onLaunch: function () {
    // 展示本地存储数据
    console.log("this.globalData.userId is:" + JSON.stringify(this.globalData.userId));
    console.log("this.globalData.defaultWallet is:" + JSON.stringify(this.globalData.defaultWallet));
    console.log("this.globalData.balList is loded:" + JSON.stringify(this.globalData.balList));
    console.log("this.globalData.tokenList is loded:" + JSON.stringify(this.globalData.tokenList));
  },

  onHide: function () {
    console.log("app.onHide() is Called");
    console.log("this.globalData.userId is:" + JSON.stringify(this.globalData.userId));
    console.log("this.globalData.defaultWallet is:" + JSON.stringify(this.globalData.defaultWallet));
    console.log("this.globalData.balList is loded:" + JSON.stringify(this.globalData.balList));
    console.log("this.globalData.tokenList is loded:" + JSON.stringify(this.globalData.tokenList));
    wx.setStorageSync('balList', this.globalData.balList);
    wx.setStorageSync('tokenList', this.globalData.tokenList);
    console.log("tokenList is stored: " + wx.getStorageSync('tokenList'));
    
  }
  
})