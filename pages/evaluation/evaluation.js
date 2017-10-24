//index.js
//获取应用实例
const app = getApp()
const qiniuUploader = require("../../utils/upload");
if (!app.tempFilePath) {
  app.tempFilePath = []
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  setData: function (e) {
    // alert(e)
  },
  onLoad: function () {

  },
  getUserInfo: function (e) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      compressed: 0,
      success: function (res) {
        var tempFilePath = res.tempFilePath
        app.tempFilePath.push(res.tempFilePath)
        wx.showLoading({
          title: '正在上传...',
        })
        qiniuUploader.upload(tempFilePath, (res) => {
          // that.setData({
          //   'imageURL': res.imageURL,
          // });
          wx.hideLoading()
          if(res.error){
            wx.showToast({
              title: '上传失败',
              icon: 'fail',
              duration: 1000
            })
          }else{
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })
          }
        }, (error) => {
          console.log('error: ' + error);
          wx.hideLoading()
          wx.showToast({
            title: '上传失败',
            icon: 'fail',
            duration: 1000
          })
        }, {
            key: new Date().toString()+'.mp4',
            region: 'ECN',
            uploadURL: 'https://upload.qiniup.com',
            domain: 'file.kim1.kim',
            uptoken: 'D0kBjb8UpWlNtfKDUwkPkG1m1oIHE6mpnYIa3Yvw:qf9B9O8lXpmD9l48DN-7NLWSPV8=:eyJzY29wZSI6ImZpbGUiLCJkZWFkbGluZSI6MTUwODgzOTQ2NH0=',
          })
      }
    })
  }
})
