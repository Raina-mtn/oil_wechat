// pages/system/unitmanage/addStation/index.ts
import {formRules} from '../../../../utils/validate'
import {apiAddRobot,apiEditRobot} from '@http/api/robot'
import {apiGetOrganizations} from '@http/api/common'


const rules = {
  robotName:[
    {
      required: true,
      message: '请输入机器人名称'
    }
  ],
  robotId:[
    {
      required: true,
      message: '请输入机器人ID'
    }
  ],
  unit:[
    {
      required: true,
      message: '请选择所属单位'
    }
  ],
  workstationName:[
    {
      required: true,
      message: '请输入工作站名称'
    }
  ],
  workstationId:[
    {
      required: true,
      message: '请输入工作站ID'
    }
  ]
}


Page({
  /**
   * 组件的初始数据
   */
  data: {
    substationShow:false,
    columns:[],
    robotName:'',
    robotId:'',
    unit:"",//所属单位id
    isAdd:true,//编辑还是新增
    workstationId:"",//工作站id
    workstationName:"",//工作站名称
  },
  // 所属单位-选择-打开
  openSubstationShow(){
    this.setData({
      substationShow:true
    })
  },
  // 所属单位-选择-关闭
  closeSubstationShow(){
    this.setData({
      substationShow:false
    })
  },
  // 选中单位
  onConfirm(event){
    const { value } = event.detail;
    this.setData({
      unit:value
    })
    this.closeSubstationShow()
  },
  //确认
  submit(){
    formRules(rules,this.data,async (status:boolean)=>{
      if(!status) return
      const {robotName,robotId,unit,workstationId,workstationName,isAdd} = this.data
      const params = {
        robotName,
        robotId,
        substationId:unit.organizationId,
        workstationName,
        workstationId
      }
      try {
        const func = isAdd ? apiAddRobot: apiEditRobot
        const res = await func(params)
        // 操作上一页方法 获取更新的list
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2]; 
        prevPage.getList()
        wx.navigateBack()
      } catch (error) {
        console.log(error)
      }
    })
  },
  // 取消
  cancel(){
    wx.navigateBack()
  },
  async onLoad({type,currentCheck}:{type:string,currentCheck:string}){
    await this.getOriganization()
    this.setData({
      isAdd:type==='add'
    })
    wx.setNavigationBarTitle({
      title: type==='add'?'新增机器人':'编辑机器人'
   })
    if(type==='add') return
    
    const {robotId,robotName,substationId,workstationId,workstationName} = JSON.parse(currentCheck)
    let unitItem = this.data.columns.find(i=>i.organizationId===substationId)
    this.setData({
      robotId,
      robotName,
      unit:unitItem,
      workstationId,
      workstationName
    })
    

  },
  // 获取所属单位
  async getOriganization(){
    const res = await apiGetOrganizations()
    this.setData({
      columns:res
    })
  }
})