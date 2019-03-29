var app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    hasUserInfo: "false",
  },
  // gotoindex: function (e) {
  //   console.log(app);
  //   if(hasUserInfo){
  //     wx.navigateTo({
  //       url: '../problemIndex/problemIndex',
  //     })
  //   }
  // },
  getUserInfo: function(e) {
    console.log(e.detail)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.request({
        url: 'http://47.101.44.77/wechat/basic/web/index.php?r=test/adduser',
        data: {
          'user_nickname': e.detail.userInfo.nickName,
          'user_city': e.detail.userInfo.city,
          'user_province': e.detail.userInfo.province
        },
        method: 'post',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res);
          app.globalData.userid = res.data.userid
        },
      })
      wx.navigateTo({
        url: '../choose/choose',
      })
    } else {
      console.log("未能获取到当前用户信息，请重试");
    }
  }
});