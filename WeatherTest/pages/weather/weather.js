// pages/weather/weather.js
const key = '1cbe674a071a6b3225d845c9b98bff7b'
var latitude = null, longitude = null,adcode = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude : 0,
    longitude : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("hello world")
    var that = this

    wx.getLocation({
      success : function(res){
        console.log(res)
        console.log("localtion get")
        latitude = res.latitude
        longitude = res.longitude

        console.log("纬度 " + latitude  + "  经度 " + longitude)

        that.setData({latitude : res.latitude,
                      longitude : res.longitude})

        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?location='+longitude + ',' + latitude +'&key='+key+'&radius=0&extensions=all',
          success : function(res)
          {
            //console.log(res.data)
            //console.log(res.data.regeocode.formatted_address)
            that.setData({address : res.data.regeocode.formatted_address})
            adcode = res.data.regeocode.addressComponent.adcode
            
            wx.request({
              url: 'https://restapi.amap.com/v3/weather/weatherInfo?extensions=base&city=' + adcode + '&key=' + key,
              success : function(res) {
                console.log(res)
                that.setData({temperature : res.data.lives[0].temperature,
                              weather : res.data.lives[0].weather,
                              humidity : res.data.lives[0].humidity})
              }
            })

            wx.request({
              url: 'https://restapi.amap.com/v3/weather/weatherInfo?extensions=all&city=' + adcode + '&key=' + key,
              success : function(res) {
                //console.log(res)
                //that.setData({forecasts : res.data.})
                that.setData({forecasts : res.data.forecasts[0].casts})
              }
            })

          }
        })

      }
    })

  },

  binKeyFocus : function(event){
    var that = this
    wx.chooseLocation({
      success : function(res) {
        console.log(res.latitude)
        

        
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?location='+res.longitude + ',' + res.latitude +'&key='+key+'&radius=0&extensions=all',
          success : function(res)
          {
            //console.log(res.data)
            //console.log(res.data.regeocode.formatted_address)
            that.setData({address : res.data.regeocode.formatted_address})
            adcode = res.data.regeocode.addressComponent.adcode
            
            wx.request({
              url: 'https://restapi.amap.com/v3/weather/weatherInfo?extensions=base&city=' + adcode + '&key=' + key,
              success : function(res) {
                console.log(res)
                that.setData({temperature : res.data.lives[0].temperature,
                              weather : res.data.lives[0].weather,
                              humidity : res.data.lives[0].humidity})
              }
            })

            wx.request({
              url: 'https://restapi.amap.com/v3/weather/weatherInfo?extensions=all&city=' + adcode + '&key=' + key,
              success : function(res) {
                //console.log(res)
                //that.setData({forecasts : res.data.})
                that.setData({forecasts : res.data.forecasts[0].casts})
              }
            })

          }
        })


      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})