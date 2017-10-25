//index.js
//获取应用实例
const app = getApp()
const qiniuUploader = require("../../utils/upload");

Page({
  // data: {
  //   array: app.tempFilePath
  // },
  onLoad: function(){

    this.$wuxToast = app.wux(this).$wuxToast
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
  onShow: function () {
    // this.data = {
    //   array: app.tempFilePath
    // }
    this.setData({
      array: app.tempFilePath
    })
    console.log(app.tempFilePath.length)

    app.tempFilePath.map(x => wx.getFileInfo({
      'filePath': x,
      success(res) {
        console.log(res.size)
        console.log(res)
      }
    }))

  },
  upload: function (e) {

    var that = this
    var tempFilePath = app.tempFilePath[e.currentTarget.dataset.id]
    console.log(tempFilePath)
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
        console.log(JSON.stringify(res.error))
        that.showToastCancel()
      } else {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
        })
      }
    }, (error) => {
      console.log('error: ' + JSON.stringify(error));
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
