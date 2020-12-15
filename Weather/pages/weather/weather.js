// pages/weather/weather.js
const key = '1cbe674a071a6b3225d845c9b98bff7b'
var latitude = 0.0, longitude = 0.0;

Page({

  /**
   * Page initial data
   */
  data: {

  },

  binKeyFocus: function(e){
    var that = this
    // console.log("hello")
    console.log(e)

    wx.chooseLocation({
      latitude: latitude,
      longitude : longitude,
    }).then((res)=>{
      console.log(res.address)
      latitude = res.latitude
      longitude = res.longitude
      //部分接口如 downloadFile, request, uploadFile, connectSocket, createCamera（小游戏）本身就有返回值， 它们的 promisify 需要开发者自行封装。
      wx.request({
        url: 'https://restapi.amap.com/v3/geocode/regeo?key='+key+'&location='+longitude+','+latitude,
        success: function(res2){
          console.log(res2)
          var adcode = res2.data.regeocode.addressComponent.adcode
          that.setData({
            local : res2.data.regeocode.formatted_address
          })
          wx.request({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo?key='+key+'&extensions=all&city='+adcode,
            success: function (res3) {
              console.log(res3);
              that.setData({
                amapWeatherData : res3.data.forecasts[0].casts,
                updateTime : res3.data.forecasts[0].reporttime,
                //local : res3.data.forecasts[0].city,
                temperature : res3.data.forecasts[0].casts[0].daytemp,
                today : res3.data.forecasts[0].casts[0]
              });
            }
          })
        }
      })
    })

    // wx.chooseLocation({
    //   latitude: latitude,
    //   longitude : longitude,
    //   success: function(res){
    //     console.log(res.address)
    //     latitude = res.latitude
    //     longitude = res.longitude
    //     wx.request({
    //       url: 'https://restapi.amap.com/v3/geocode/regeo?key='+key+'&location='+longitude+','+latitude,
    //       success: function(res2){
    //         console.log(res2)
    //         var adcode = res2.data.regeocode.addressComponent.adcode
    //         that.setData({
    //           local : res2.data.regeocode.formatted_address
    //         })
    //         wx.request({
    //           url: 'https://restapi.amap.com/v3/weather/weatherInfo?key='+key+'&extensions=all&city='+adcode,
    //           success: function (res3) {
    //             console.log(res3);
    //             that.setData({
    //               amapWeatherData : res3.data.forecasts[0].casts,
    //               updateTime : res3.data.forecasts[0].reporttime,
    //               //local : res3.data.forecasts[0].city,
    //               temperature : res3.data.forecasts[0].casts[0].daytemp,
    //               today : res3.data.forecasts[0].casts[0]
    //             });
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
  

    wx.getLocation({
      //isHighAccuracy: true,
      success: function(res){
        latitude = res.latitude
        longitude = res.longitude
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?key='+key+'&location='+longitude+','+latitude,
          success: function(res2){
            console.log(res2)
            var adcode = res2.data.regeocode.addressComponent.adcode
            that.setData({
              local : res2.data.regeocode.formatted_address
            })
            wx.request({
              url: 'https://restapi.amap.com/v3/weather/weatherInfo?key='+key+'&extensions=all&city='+adcode,
              success: function (res3) {
                console.log(res3);
                that.setData({
                  amapWeatherData : res3.data.forecasts[0].casts,
                  updateTime : res3.data.forecasts[0].reporttime,
                  temperature : res3.data.forecasts[0].casts[0].daytemp,
                  today : res3.data.forecasts[0].casts[0]
                });
              }
            })
          }
        })
      }
    })




    console.log("hello world")



      return;

    wx.getLocation({
      success: function(res){
        console.log(res);
        latitude = res.latitude
        longitude = res.longitude
      
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?key='+key+'&location='+longitude+','+latitude,
          success: function(res){
            console.log(res)
          }
        })
      
      }
    })

  },
  // onLoad: function (options) {
  //   wx.getLocation({
  //     success: function(res){
  //       console.log(res);
  //     }
  //   })
  //   // wx.chooseLocation({
  //   //   latitude: '112.863096',
  //   //   longitude: '27.882942'
  //   // })
  // },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})