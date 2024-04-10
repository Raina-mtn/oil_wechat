// pages/system/unitmanage/addStation/index.ts
import {apiAddSubstation,apiUpdateSubstation,apiGetOrgTree} from '@http/api/unit'

Page({

  /**
   * 组件的初始数据
   */
  data: {
    id:"",//变电站id
    value:"",//变电站name
    substationShow:false,
    columns: [],
    selectUnitIndex:0,//默认选中picker
    selectUnitItem:{}//选中的运营部单位
  },

    // 变电站-选择-打开
    openSubstationShow(){
      this.setData({
        substationShow:true
      })
    },
    // 变电站-选择-关闭
    closeSubstationShow(){
      this.setData({
        substationShow:false
      })
    },
    onChange(){},
    async onLoad(options){
      await this.getOrgList()
      const detail = JSON.parse(options.detail || "{}");
      wx.setNavigationBarTitle({
        title: (detail?.realId ?'编辑':'新增')+'变电站'
     })
      // 回填处理运营部数据
      if(detail.realId){
        const selectUnitItem = this.data.columns.find(item=>item.realId == detail.parentId)
        const selectUnitIndex = this.data.columns.findIndex(item=>item.realId == detail.parentId)
        this.setData({
          selectUnitIndex,
          selectUnitItem
        })
      }
      this.setData({
        id:detail?.realId || "",
        value:detail?.name || "",
      })
     
    },
    async onSubmit(){
      const {id,value,selectUnitItem} = this.data
      const func = id ? apiUpdateSubstation : apiAddSubstation; 
      const params = {
        substationId:id,
        substationName:value,
        organizationId:selectUnitItem.realId
      }
      try {    
        await func(params)                                       
        // 操作上一页方法 获取更新的list
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2]; 
        prevPage.getList()
        this.onBack()
      } catch (error) {
        console.log(error)
      }
    },
    onBack(){
      wx.navigateBack()
    },
    // 获取单位list
    async getOrgList(){
      try {
        const res = await apiGetOrgTree()
        this.setData({
          columns:res,
        })
      } catch (error) {
        console.log(error)
      }
    },
    onConfirm(event){
      this.setData({
        selectUnitItem:event.detail.value
      })
      this.closeSubstationShow()
    }
})