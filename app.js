//app.js
App({
  
  globalData: {
    userId: wx.getStorageSync('userId'), //读取本地userId
    defaultWallet: wx.getStorageSync('defaultWallet'), //读取本地默认钱包
    balList: wx.getStorageSync('balList'),
    tokenList: wx.getStorageSync('tokenList'),

    //defaultWallet: {'address': '0xbcb2a11bb3420c521a0baa8c8bb624c383e294a0', 'walletId': 2 },
    //hasLogin: false,  //目前只需要获得userId，后面就不再每次都登录
    kcURL: "https://qklkc.club/kc",
    coins: {
      1: { "coinNameAbbr": "BTC", "coinNameCn": "比特币" },
      2: { "coinNameAbbr": "ETH", "coinNameCn": "以太坊" },
      3: { "coinNameAbbr": "LTC", "coinNameCn": "莱特币" },
      4: { "coinNameAbbr": "XRP", "coinNameCn": "瑞波币" }
    }
  },

  onLaunch: function () {
    // 展示本地存储能力
    console.log("this.globalData.userId is:" + this.globalData.userId);
    console.log("this.globalData.defaultWallet is:" + JSON.stringify(this.globalData.defaultWallet));
    console.log("this.globalData.balList is loded:" + JSON.stringify(this.globalData.balList));
    console.log("this.globalData.tokenList is loded:" + JSON.stringify(this.globalData.tokenList));
  },

  onHide: function () {
    console.log("app.onHide() is Called")
    wx.setStorageSync('userId', this.globalData.userId);
    wx.setStorageSync('defaultWallet', this.globalData.defaultWallet);
    wx.setStorageSync('balList', this.globalData.balList);
    wx.setStorageSync('tokenList', this.globalData.tokenList);
    console.log("tokenList is stored: " + wx.getStorageSync('tokenList'))

  }
  
})