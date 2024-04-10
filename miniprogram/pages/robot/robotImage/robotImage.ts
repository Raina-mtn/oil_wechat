// pages/robotImage/robotImage.ts
import {apiGetPictures,apiDeletePictures} from '@http/api/robot'
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    currentCheck:[],
    isAuthSavePhoto: false,
  },
  can_click:true,
  choseOne(e) {
    let {index,dateindex} = e.currentTarget.dataset, {imgList} = this.data;
    imgList[dateindex].imgData[index].checked = !imgList[dateindex].imgData[index].checked;
    let currentCheck = imgList.map((item) => {
      const checkList = item.imgData.filter((i)=>i.checked===true)
      return checkList
    })
    this.setData({
      imgList,
      currentCheck:currentCheck.flat(2)
    })
  },
  //删除按钮
  deleteImage(){
    const {currentCheck} = this.data
    if(currentCheck.length){
    Dialog.confirm({
      title: '提示',
      message: '请确认是否删除已选中图片！',
    })
      .then(async () => {
        // 删除
        const params = {
          pictureIds:currentCheck.map(i=>i.id)
        }
        try {
          await apiDeletePictures(params)
          this.getImgs()
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
        } catch (error) {
          console.log(error)
        }
      })
      .catch(() => {
        // on cancel
      });
    }else{
      Dialog.alert({
        context: this,
        title: '提示',
        message: '请选择需要删除的图片!',
      })
    }
  },
  // 请求权限
  writePhotosAlbum(successFun, failFun){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function () {
              successFun && successFun()
            },
            fail: function (res) {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: "微信授权保存图片，是否重新授权？",
                showCancel: true,
                cancelText: "否",
                confirmText: "是",
                success: function (res) {
                  if (res.confirm) { //用户点击确定'
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting['scope.writePhotosAlbum']) {
                          //已授权
                          successFun && successFun()
                        } else {
                          failFun && failFun()
                        }
                      }
                    })
                  } else {
                    failFun && failFun()
                  }
                }
              });
            }
          })
        } else {
          successFun && successFun()
        }
      }
    })
  },
  //下载按钮
  downLoadImage(){
    const {currentCheck} = this.data
    if(currentCheck.length){
      if(currentCheck.length>9){
        Dialog.alert({
          context: this,
          title: '提示',
          message: '同时最多只能保存9张图片!',
        })
      }else{
        Dialog.confirm({
          title: '提示',
          message: '请确认是否下载已选中图片！',
        })
        .then(() => {
          if (this.can_click) {
            this.can_click=false;
            var that = this;
            this.writePhotosAlbum(
              function success() {
                const {imgList,currentCheck} = that.data
                that.downForque(currentCheck).then(res => {
                  wx.hideLoading()
                  wx.showToast({
                    title: '下载完成',
                    icon: 'none'
                  })
                  imgList.forEach(item => {
                    item.imgData.forEach(img => {
                      img.checked = false
                    })
                  })
                  that.setData({
                    imgList,
                    currentCheck:[]
                  })
                  that.can_click=true;
                }).catch(err => {
                  imgList.forEach(item => {
                    item.imgData.forEach(img => {
                      img.checked = false;
                    })
                  })
                  that.setData({
                    imgList,
                    currentCheck:[]
                  })
                  wx.hideLoading();
                  that.can_click=true;
                })
              },
              function fail() {
                wx.showToast({
                  title: '您拒绝了保存到相册',
                  icon: 'none'
                })
              }
            )
          }
        })
        .catch(() => {
          // on cancel
        });
      }
    }else{
      Dialog.alert({
        context: this,
        title: '提示',
        message: '请选择需要下载的图片!',
      })
    }
  },
  async getImgs(){
    const imgList = await apiGetPictures()
    this.setData({imgList})
  },
  // 队列
  downForque(urls) {
    let promise = Promise.resolve()
    urls.forEach((item, index) => {
      promise = promise.then(() => {
        return this.download(item.url, index)
      })
    })
    return promise;
  },
  download(url, index) {
    const {currentCheck} = this.data
    let length = currentCheck.length
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: function (res) {
          var temp = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: temp,
            success: function (res) {
              wx.showLoading({
                title: '下载中(' + (index + 1) + '/' + length + ')'
              })
              resolve(res)
            },
            fail: function (err) {
              reject(res)
            }
          })
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getImgs()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})