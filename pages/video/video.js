//index.js
//获取应用实例
const app = getApp()
const qiniuUploader = require("../../utils/upload");

Page({
  data: {
    array: []
  },
  onLoad: function () {

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
    var that = this
    wx.getSavedFileList({
      success: function (res) {
        console.log(res.fileList)
        that.setData({
          array: res.fileList
        })
      }
    })
    // app.tempFilePath.map(x => wx.getFileInfo({
    //   'filePath': x,
    //   success(res) {
    //     console.log(res.size)
    //     console.log(res)
    //   }
    // }))
  },
  delete: function (e) {
    var that = this
    var tempFilePath = this.data.array[e.currentTarget.dataset.id].filePath
    wx.removeSavedFile({
      filePath: tempFilePath,
      complete: function (res) {
        console.log(res)
        that.data.array.splice(e.currentTarget.dataset.id, 1)
        that.setData({
          array: that.data.array
        })
        wx.showToast({
          title: '删除成功',
          icon: 'success',
        })
      }
    })
  },
  upload: function (e) {
    var that = this
    console.log(this)
    var tempFilePath = this.data.array[e.currentTarget.dataset.id].filePath
    console.log(tempFilePath)
    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      mask: true
    })
    qiniuUploader.upload(tempFilePath, (res) => {
      wx.hideLoading()
      if (res.error) {
        console.log(JSON.stringify(res.error))
        that.showToastCancel()
      } else {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
        })
        wx.removeSavedFile({
          filePath: tempFilePath,
          complete: function (res) {
            console.log(res)
          }
        })
      }
    }, (error) => {
      console.log('error: ' + JSON.stringify(error));
      wx.hideLoading()
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
