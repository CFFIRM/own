var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var radarChart = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },
  onReady: function (e) {
    var that=this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    wx.request({
      url: 'http://47.101.44.77/wechat/basic/web/index.php?r=other/getanswer',
      data: { 'userid': app.globalData.userid},
      header: {'Content-type':'application/json'},
      success: function(res) {
        console.log(res);
        that.setData({
          content:res.data.content
        });
        radarChart = new wxCharts({
          canvasId: 'radarCanvas',
          type: 'radar',
          categories: ['老虎', '孔雀', '考拉', '猫头鹰','变色龙'],
          series: [{
            name: '分数',
            data: [res.data.imgdata.tiger, res.data.imgdata.peacock,res.data.imgdata.koala, res.data.imgdata.owl, res.data.imgdata.chameleon]
          }],
          width: windowWidth,
          height: 200,
          extra: {
            radar: {
              max: 50
            }
          }
        });
      },
    })
    
  }
});