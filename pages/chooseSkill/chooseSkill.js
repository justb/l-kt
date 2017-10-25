//index.js
//获取应用实例
const app = getApp()

Page({
  // data: {
  //   array: app.tempFilePath
  // },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      index: options.index
    })


  },
  toTake: function () {
    wx.navigateTo({
      url: '../evaluation/evaluation'
    })
  }
})
