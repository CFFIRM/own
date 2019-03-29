// pages/choose/choose.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://47.101.44.77/wechat/basic/web/index.php?r=other/gettype',
      data: {},
      header: {'Content-type':'application/json'},
      success: function(res) {
        that.setData({
          type:res.data.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  choose:function(e){
    if(e.currentTarget.dataset.id==1){
      wx.navigateTo({
        url: '../problemIndex/problemIndex?id',
      })
    }else{
      wx.navigateTo({
        url: '../othertopic/othertopic',
      })
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