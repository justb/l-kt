const app = getApp();
const qiniuUploader = require("../../utils/upload");
if (!app.tempFilePath) {
  app.tempFilePath = []
}
Page({
  data: {
  },
  showToastCancel() {
    const _this = this;
    _this.$wuxToast.show({
      type: 'cancel',
      timer: 2000,
      color: '#fff',
      text: '存储失败，尝试清理视频',
      success: () => console.log('存储失败')
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
        // app.tempFilePath.push(res.tempFilePath)
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)
            app.tempFilePath.push(savedFilePath)
          },
          fail: function(){
            that.showToastCancel()
          }
        })
      }
    })
  },
  toVideo: function () {
    console.log(123)
    wx.switchTab({
      url: '../video/video'
    })
  }
})