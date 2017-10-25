const app = getApp();
const qiniuUploader = require("../../utils/upload");
if (!app.tempFilePath) {
  app.tempFilePath = []
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  showToastCancel() {
    const _this = this;
    _this.$wuxToast.show({
      type: 'cancel',
      timer: 2000,
      color: '#fff',
      text: '上传失败',
      success: () => console.log('上传失败')
    })
  },
  onLoad: function () {
    this.$wuxToast = app.wux(this).$wuxToast
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
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true
        })
        qiniuUploader.upload(tempFilePath, (res) => {
          wx.hideLoading()
          if (res.error) {
            // wx.showToast({
            //   title: '上传失败',
            //   icon: 'loading',
            // })
            that.showToastCancel()
          } else {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
            })
          }
        }, (error) => {
          console.log('error: ' + error);
          wx.hideLoading()
          // wx.showToast({
          //   title: '上传失败',
          //   icon: 'loading',
          // })
          that.showToastCancel()
        }, {
            key: new Date().toString() + '.mp4',
            region: 'ECN',
            uploadURL: 'https://upload.qiniup.com',
            domain: 'file.kim1.kim',
            uptoken: 'D0kBjb8UpWlNtfKDUwkPkG1m1oIHE6mpnYIa3Yvw:qf9B9O8lXpmD9l48DN-7NLWSPV8=:eyJzY29wZSI6ImZpbGUiLCJkZWFkbGluZSI6MTUwODgzOTQ2NH0=',
          })
      }
    })
  }
})