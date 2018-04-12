// 显示加载loading
function showLoading(title) {
  wx.showLoading({
    title: title || '加载中...'
  })
}
// 隐藏加载loading
function hideLoading() {
  wx.hideLoading()
}
export let HTTPS = {
  //服务请求地址
  // baseUrl: 'http://192.168.4.70:2222',
  // imageUrl: 'http://192.168.4.70:2222',
  // baseUrl: 'https://api.phc-dow.com',
  //线上 
  baseUrl: 'https://api.phc-dow.com',
  imageUrl: 'https://xlc.phc-dow.com',
  // 测试
  // baseUrl: 'https://devapi.phc-dow.com',
  // imageUrl: 'https://devapi.phc-dow.com',
  // get请求
  get: function (url, callBack) {
    let that = this
    showLoading()
    wx.request({
      url: that.baseUrl + url,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/dow-xlc'
      },
      success: function (res) {
        if (res.data.result === 0) {
          callBack(res.data)
        } else {
          showLoading('网络请求失败')
        }
      },
      fail: function (error) {
        showLoading('网络请求失败')
      },
      complete: function () {
        hideLoading()
      }
    })
  },
  // post请求
  post: function (url, params, callBack) {
    let that = this
    // 当数据加载完毕或者需要独立模块自定义的loading时，不加载全局loading
    showLoading()
    wx.request({
      url: that.baseUrl + url,
      data: params || {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.result === 0) {
          callBack(res.data)
        } else {
          showLoading('网络请求失败')
        }
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        setTimeout(() => {
          hideLoading()
        }, 500)
      }
    })
  }
}