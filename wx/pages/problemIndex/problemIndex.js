// pages/problemIndex/problemIndex.js
var app = getApp()
var sum = 0 //积分
var num = 0 //第几个
var rvg = 0
var dialogs
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allInfo: [], //所有信息
    info: {}, //显示信息
    selectId: '',
    num: 1,
    length: '',
    next: 30,
    asdf: 'item1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://47.101.44.77/wechat/basic/web/index.php?r=test/index',
      data: {},
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          info: res.data.data
        })
      },
    })
  },
  select: function(e) {
    var that = this
    var id = e.currentTarget.dataset.answer
    console.log(id);
    var lowId = that.data.selectId
    if (lowId != id) {
      that.setData({
        selectId: id
      })
    }
    wx.setStorage({
      key: 'userchoose',
      data: id
    })
  },
  next: function(e) {
    var that = this;
    wx.getStorage({
      key: 'userchoose',
      success: function(res) {
        var id = e.currentTarget.dataset.id;
        var userid = app.globalData.userid;
        wx.request({
          url: 'http://47.101.44.77/wechat/basic/web/index.php?r=test/index',
          data: {
            'id': id,
            'userchoose': res.data,
            'userid': userid
          },
          header: {
            'Content-type': 'application/json'
          },
          success: function(res) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            }),
            that.setData({
              info: res.data.data,
              selectId: '',
            })
          },
        })
      }
    })
  },
  sub: function(e) {
    var that = this;
    wx.getStorage({
      key: 'userchoose',
      success: function(res) {
        var id = e.currentTarget.dataset.id;
        var userid = app.globalData.userid;
        wx.request({
          url: 'http://47.101.44.77/wechat/basic/web/index.php?r=test/index',
          data: {
            'id': id,
            'userchoose': res.data,
            'userid': userid
          },
          header: {
            'Content-type': 'application/json'
          },
          success: function(res) {
            console.log(res);
          },
        })
      }
    })
    wx.navigateTo({
      url: '../pie/pie',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})