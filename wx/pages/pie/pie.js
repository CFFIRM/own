var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  data: {},
  touchHandler: function(e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function(e) {
    var that=this;
    console.log(app.globalData);
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    wx.request({
      url: 'http://47.101.44.77/wechat/basic/web/index.php?r=test/result',
      data: {
        'user_nickname': app.globalData.userInfo.nickName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        that.setData({
            colorinfo:res.data.colorinfo,
            colormax:res.data.colormax
        });
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series: [{
            name: '蓝色',
            data: res.data.data.blue,
          }, {
            name: '红色',
            data: res.data.data.red,
          }, {
            name: '黄色',
            data: res.data.data.yellow,
          }, {
            name: '绿色',
            data: res.data.data.green,
          }],
          width: windowWidth,
          height: 300,
          dataLabel: true,
        });
      },
    })

  }
});