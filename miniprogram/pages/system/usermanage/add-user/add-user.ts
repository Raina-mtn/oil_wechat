// pages/system/usermanage/add-user/add-user.ts
import {formRules} from '@utils/validate'
import {apiGetRoles, apiGetOrganizations, apiAddUser} from '@http/api/usersmanage'

const rules = {
    userName:[
        {
          required: true,
          message: '请输入用户账号'
        },
        // {
        //   pattern: /^1[3-9]\d{9}$/,
        //   message: '不能为空'
        // }
      ],
      accountName:[
        {
          required: false,
          message: '请输入用户账号'
        }
    ],
    organizationId:[
        {
          required: false,
        //   message: '请选择所属单位'
        }
    ],
    roleId:[
        {
          required: false,
        //   message: '请选择职务'
        }
    ],
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: ['https://img.yzcdn.cn/vant/cat.jpeg'],
    baseUrl: '',
    form: {          // 用于其他功能提交的参数
        userName:'',
        accountName:'',
        organizationName:'请选择',
        roleName:'请选择',
        organizationId:1,
        roleId:1,
    },
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    showUnit:false,
    showPost:false,
  },
  onChange(event:any) {
    const { picker, value, index } = event.detail;
    console.log(value);
  },
  cancel(){
    wx.navigateBack({url:'/pages/system/usermanage/user'})
  },
  confirmUserName(e){
    this.setData({
        ['form.userName'] : e.detail.value,
    })
  },
  confirmAccountName(e){
    this.setData({
        ['form.accountName'] : e.detail.value,
    })
  },
 async onClickUnit(){
    this.setData({
        showUnit:!this.data.showUnit
      })
    //   获取所属单位信息
        const organizationsInfo = await apiGetOrganizations()
        this.setData({columns: organizationsInfo})
  },
  onConfirmUnit(event:any){
    this.setData({
        ['form.organizationId'] : event.detail.value.organizationId,
        ['form.organizationName'] : event.detail.value.organizationName,
      showUnit:!this.data.showUnit
    })
 },
  async onClickPost(){
    this.setData({
        showPost:!this.data.showPost
      })
    //   获取职务信息
      const postInfo = await apiGetRoles()
      this.setData({columns: postInfo})
  },
  onConfirmPost(event:any){
    this.setData({
      ['form.roleId']:event.detail.value.roleId,
      ['form.roleName']:event.detail.value.roleName,
      showPost:!this.data.showPost
    })
},
//   确认添加用户
  confirmAdd(){
    formRules(rules,this.data.form, async (status:boolean)=>{
        if(status){
          const {userName, accountName, organizationId, roleId} = this.data.form
        //   console.log(userName,accountName, organizationId, roleId)
          await apiAddUser({username:userName,accountName, organizationId, roleId})
          wx.navigateBack({
              url:'/pages/system/usermanage/user',
              success() {
                let page = getCurrentPages().pop(); //跳转页面成功之后
                if (!page) return;
                page.onLoad(); //如果页面存在，则重新刷新页面
              }
            })
      }
    })
  },
  // 预览图片
  previewBigImage() {
    const imgs = this.data.imageList
    // const url = '/assest/images/user_avatar.png'

    wx.previewImage({
      current: imgs[0],
      urls: imgs
    })
  },
  // 选择上传图片的方式
  chooseImageTap() {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#149F97",
      success(res:any) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            // 从相册中选择
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            // 使用相机
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 选择图片
  chooseWxImage(type:any) {
    let that = this;
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sizeType:['original'],
      sourceType:[type],
      success(res:any){
        console.log(res.tempFiles[0].tempFilePath);
        // that.upload(res.tempFiles[0])
        that.setData({
          imageList:res.tempFiles[0].tempFilePath
        })
      }
    })
  },
  
  // upload(path:any) {
  //   let that = this;
  //   let { ossUrl } = this.data.form;
  //   console.log(ossUrl)
  //   wx.showToast({
  //     icon: "loading",
  //     title: "正在上传"
  //   }),
  //     //将本地资源上传到服务器
  //     // wx.uploadFile({
  //     //   url: baseUrl,    // 开发者服务器地址
  //     //   filePath: path,   // 要上传文件资源的路径 (本地路径)
  //     //   name: 'editormd-image-file',   // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
  //     //   header: {
  //     //     // HTTP 请求 Header，Header 中不能设置 Referer
  //     //     "Content-Transfer-Encoding": "binary",
  //     //     "Content-Type": "application/octet-stream",
  //     //     "Content-Disposition": "form-data"
  //     //   },
  //     //   formData: {
  //     //     //和服务器约定的token, 一般也可以放在header中
  //     //     'token': wx.getStorageSync('userData').token,
  //     //   },
  //     //   success: function (res) {
  //     //     console.log(res)
  //     //     // 判断下
  //     //     if (res && res.data) {
  //     //       const data = JSON.parse(res.data);
  //     //       if (res.statusCode != 200) {
  //     //         wx.showToast({
  //     //           title: data.responseBody.data.message,
  //     //           icon: 'none'
  //     //         })
  //     //         return;
  //     //       } else {
  //     //         if (!!data.responseBody.data) {
  //     //           ossUrl.push(data.responseBody.data.url);
  //     //           that.setData({
  //     //             imageList: ossUrl,
  //     //             'form.ossUrl': ossUrl
  //     //           })
  //     //         }
  //     //       }
  //     //     }
  //     //   },
  //     //   fail: function (e) {
  //     //     wx.showToast({
  //     //       title: '上传失败',
  //     //       icon: 'none'
  //     //     })
  //     //   },
  //     //   complete: function () {
  //     //     wx.hideToast(); //隐藏Toast
  //     //   }
  //     // })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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