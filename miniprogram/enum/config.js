export const arrToObj = function(arr, format = {
  key: 'value',
  label: 'label'
}) {
  return arr.reduce(function(acc, cur, i) {
    const curkey = cur[format.key]
    acc[curkey] = cur[format.label];
    return acc;
  }, {})
}

export const robotState = [
  {
    label:'离线',
    value:'-1'
  },
  {
    label:'空闲',
    value:'1'
  },
  {
    label:'任务中',
    value:'2'
  },
  {
    label:'异常',
    value:'3'
  },
]
export const robotStateObj = arrToObj(robotState)