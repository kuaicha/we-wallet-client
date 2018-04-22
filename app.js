//app.js
App({
  
  globalData: {
    userId: wx.getStorageSync('userId'), //读取本地userId
    //tokenAddList: wx.getStorageSync('tokenAddList'), //读取本地token地址列表
    //tokenAddList: [{ 'address': '0xbcb2a11bb3420c521a0baa8c8bb624c383e294a0', 'addressAbbr': '0xbcb2a1 ... 83e294a0', 'walletId': 2, 'checked': 'true' }, { 'address': '0x0293fa72C359e04651485A74B0D96953312dEd53', 'addressAbbr': '0x0293fa ... 312dEd53', 'walletId': 11 }], //读取本地token地址列表
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
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //balList: wx.getStorageSync('balList');
    //tokenList: wx.getStorageSync('tokenList');
    console.log("###onLaunch is called ###");
    console.log("this.globalData.userId is:" + this.globalData.userId);
    console.log("this.globalData.defaultWallet is:" + JSON.stringify(this.globalData.defaultWallet));
    console.log("this.globalData.balList is loded:" + JSON.stringify(this.globalData.balList));
    console.log("this.globalData.tokenList is loded:" + JSON.stringify(this.globalData.tokenList));
    //console.log("this.globalData.tokenAddList is loded:" + JSON.stringify(this.globalData.tokenAddList));
  //  console.log("this.globalData.defaultTokenAdd is loded:" + JSON.stringify(this.globalData.defaultTokenAdd));

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