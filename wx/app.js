//app.js 
App({
  globalData: {
    userInfo: null,
    mainInfoData: null,
    userid:null,
    serverUrl: "http://127.0.0.1:8080",//localhost
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var that = this
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if(res.code)
    //     {
    //       console.log(res.code)
    //       wx.request({
    //         url: that.globalData.serverUrl +'/wxapi/isregister',
    //         data:{
    //           code:res.code
    //         },
    //          success: function (cb) {
    //            wx.setStorageSync('openid', cb.data.data.openId);
    //            wx.setStorageSync('token', cb.data.data.accessId);
    //            wx.setStorageSync('isRegistered', cb.data.result);
    //            console.log(cb.data)
    //          }
    //       })
    //     }
    //     else
    //     {
    //       console.log("登录失败",res.errMsg)
    //     }
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //加载函数
  showLoading: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  //释放加载函数
  hideLoading: function () {
    wx.hideLoading()
  },
  // 通用请求
  currentRequest: function (param, url, cb) {
    var that = this
    // var param = encodeURIComponent(param);
    // console.log(param)
    if (param.flag == false) {
      wx.request({
        url: that.globalData.serverUrl + url,
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },//设置请求的header
        method: "GET",
        success: function (res) {

          return typeof cb == "function" && cb(res.data)
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          that.hideLoading()
        }
      })
    }
    else {
      wx.request({
        url: that.globalData.serverUrl + url,
        data: param,
        header: { "Content-Type": "application/x-www-form-urlencoded" },//设置请求的header
        method: "get",
        success: function (res) {
          return typeof cb == "function" && cb(res.data)
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          that.hideLoading()
        }
      })
    }
  },
  //时间转时间戳
  DateToUnix: function (string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime() / 1000;
  },
  //时间戳转时间(2017-01-01)
  UnixToDate: function (unixTime, isFull, timeZone) {
    if (typeof (timeZone) == 'number') {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
    }
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    ymdhis += time.getUTCFullYear() + '-';
    if (parseInt((time.getUTCMonth() + 1)) < 10) {
      ymdhis += "0" + (time.getUTCMonth() + 1) + '-';
    } else {
      ymdhis += (time.getUTCMonth() + 1) + '-';
    }
    if (parseInt((time.getUTCDate())) < 10) {
      ymdhis += "0" + time.getUTCDate();
    } else {
      ymdhis += time.getUTCDate();
    }
    if (isFull === true) {
      if (parseInt((time.getUTCHours())) < 10) {
        ymdhis += " " + "0" + time.getUTCHours() + ":";
      } else {
        ymdhis += " " + time.getUTCHours() + ":";
      }
      if (parseInt((time.getUTCMinutes())) < 10) {
        ymdhis += "0" + time.getUTCMinutes();
      } else {
        ymdhis += time.getUTCMinutes();
      }

    }
    return ymdhis;
  },
  UnixToDateDot: function (unixTime, isFull, timeZone) {
    if (typeof (timeZone) == 'number') {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
    }
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    ymdhis += time.getUTCFullYear() + '.';
    if (parseInt((time.getUTCMonth() + 1)) < 10) {
      ymdhis += "0" + (time.getUTCMonth() + 1) + '.';
    } else {
      ymdhis += (time.getUTCMonth() + 1) + '.';
    }
    if (parseInt((time.getUTCDate())) < 10) {
      ymdhis += "0" + time.getUTCDate();
    } else {
      ymdhis += time.getUTCDate();
    }
    if (isFull === true) {
      if (parseInt((time.getUTCHours())) < 10) {
        ymdhis += " " + "0" + time.getUTCHours() + ":";
      } else {
        ymdhis += " " + time.getUTCHours() + ":";
      }
      if (parseInt((time.getUTCMinutes())) < 10) {
        ymdhis += "0" + time.getUTCMinutes();
      } else {
        ymdhis += time.getUTCMinutes();
      }

    }
    return ymdhis;
  },
  //时间戳转时间(2017.01.01)
  //时间戳转时间：0809 14:00
  UnixToDateWithOutYear: function (unixTime, timeZone) {
    if (typeof (timeZone) == 'number') {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
    }
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    // ymdhis += time.getUTCFullYear() + '-';
    if (parseInt((time.getUTCMonth() + 1)) < 10) {
      ymdhis += "0" + (time.getUTCMonth() + 1) + '-';
    } else {
      ymdhis += (time.getUTCMonth() + 1) + '-';
    }
    if (parseInt((time.getUTCDate())) < 10) {
      ymdhis += "0" + time.getUTCDate();
    } else {
      ymdhis += time.getUTCDate();
    }
    if (parseInt((time.getUTCHours())) < 10) {
      ymdhis += " " + "0" + time.getUTCHours() + ":";
    } else {
      ymdhis += " " + time.getUTCHours() + ":";
    }
    if (parseInt((time.getUTCMinutes())) < 10) {
      ymdhis += "0" + time.getUTCMinutes();
    } else {
      ymdhis += time.getUTCMinutes();
    }


    return ymdhis;
  },

  //时间戳转时间(2017年01月01日)
  UnixToDateChin: function (unixTime, isFull, timeZone) {
    if (typeof (timeZone) == 'number') {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
    }
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    ymdhis += time.getUTCFullYear() + '年';
    if (parseInt((time.getUTCMonth() + 1)) < 10) {
      ymdhis += "0" + (time.getUTCMonth() + 1) + '月';
    } else {
      ymdhis += (time.getUTCMonth() + 1) + '月';
    }
    if (parseInt((time.getUTCDate())) < 10) {
      ymdhis += "0" + time.getUTCDate() + '日';
    } else {
      ymdhis += time.getUTCDate() + '日';
    }
    if (isFull === true) {
      if (parseInt((time.getUTCHours())) < 10) {
        ymdhis += " " + "0" + time.getUTCHours() + ":";
      } else {
        ymdhis += " " + time.getUTCHours() + ":";
      }
      if (parseInt((time.getUTCMinutes())) < 10) {
        ymdhis += "0" + time.getUTCMinutes();
      } else {
        ymdhis += time.getUTCMinutes();
      }

    }
    return ymdhis;
  },
  noCancel: function (content) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  newList: function (page,newType,cb) {
    var that = this;
    var url = '/wxapi/news';
    var start='';
    if(page<1)
    {
      start=0;
    }else
    {
      start=page*10;
    }
    var param = new Object()
    param.start = start ;
    param.length = "10";
    param.type = newType;
    param.wxflag = "1";
    wx.request({
      url: that.globalData.serverUrl + url,
      data: param,
      header: { "Content-Type": "application/x-www-form-urlencoded" },//设置请求的header
      method: "get",
      success: function (res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        that.hideLoading()
      }
    })
  },

})