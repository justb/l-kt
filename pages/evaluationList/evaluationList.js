//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: [
    'himg02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    'htimg06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    'himg06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    skillLevel: [
      "零基础", "基础一", "基础一", "基础一"
    ]
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

})
