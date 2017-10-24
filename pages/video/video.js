//index.js
//获取应用实例
const app = getApp()

Page({
  // data: {
  //   array: app.tempFilePath
  // },
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

})
