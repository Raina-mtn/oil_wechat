/*
 * rules是一个对象  key对应的表单字段， key是一个数组类型，一个输入框可判断多个条件  required判断是否为空，pattern正则判断
 * 注意： rules对象不能放在 页面的data对象中，否则会获取不到正则 请在Page({})外面定义常量
 */
export const formRules=(rules:any, form:any, callback:(status:boolean)=>void)=>{
  console.log('rules',rules)
  for (let key in rules) {
    const value = form[key]
    const rs = rules[key]
    for (let i = 0; i < rs.length; i++) {
      if (rs[i].required && (value?value.length === 0:value!==0)) {
        wx.showToast({
          title: rs[i].message,
          icon: 'none'
        })
        callback(false)
        return
      } else if (rs[i].pattern && !(rs[i].pattern.test(value))) {
        wx.showToast({
          title: rs[i].message,
          icon: 'none'
        })
        callback(false)
        return
      }
    }
  }
  callback(true)
}