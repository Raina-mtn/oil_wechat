
import * as echarts from '@components/ec-canvas/echarts';

/**
 * @method
 * @param {array} arr 需要查找的数组
 * @param {number} num 目标数值，查找的是与这个数值最接近的
 * @return {number} 返回查找到的最接近的数值
 * @desc 获取数组中与目标数值最接近的数值
 */
export function findCloseNum(arr:number[], num:number) {
  var index = 0; // 保存最接近数值在数组中的索引
  var d_value = Number.MAX_VALUE; // 保存差值绝对值，默认为最大数值
  for (var i = 0; i < arr.length; i++) {
    var new_d_value = Math.abs(arr[i] - num); // 新差值
    if (new_d_value <= d_value) { // 如果新差值绝对值小于等于旧差值绝对值，保存新差值绝对值和索引
      if (new_d_value === d_value && arr[i] < arr[index]) { // 如果数组中两个数值跟目标数值差值一样，取大
        continue;
      }
      index = i;
      d_value = new_d_value;
    }
  }
  return index // 返回最接近的数值
}


export const markLineOptions = ({startTime,endTime}:{startTime:number,endTime:number},x:number[],y:number[])=>{
  const startIndex = findCloseNum(x,startTime)
  const endIndex = findCloseNum(x,endTime)
  return [{
    coord: [String(x[startIndex]), String(y[startIndex])]     // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
  },{
    coord: [String(x[endIndex]), String(y[endIndex])]    // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
  }]
}
export const markPointOptions = ({time,name}:{time:number,name:string},x:number[],y:number[])=>{
  const index = findCloseNum(x,time)
  return {
    coord: [String(x[index]), String(y[index])],
    value:name
  }
}
export const chartOption = ({x,y,xUnit,yUnit,peaks}:{x:number[],y:number[],xUnit:string,yUnit:string,peaks:any[]}) =>{
  return {
    color:['#149F97'],
    tooltip: {
      show:true,
      trigger: "axis",
    },
    grid:{
      top:30,
      bottom:20
    },
    xAxis: {
      // name:xUnit,
      type: 'category',
      boundaryGap: false,
      data:x,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        onZero: false,
      },
      axisLabel: {
        color: '#666666',
      },
      splitLine: {
        show: true,
        lineStyle:{
          type:'dashed',
          color:'#CCCCCC80'
        }
      }
    },
    yAxis: {
      // name:yUnit,
      type: 'value',
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666666',
      },
      splitLine: {
        show: true,
        lineStyle:{
          type:'dashed',
          color:'#CCCCCC80'
        }
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 0],
      },
    ],
    series: [{
      type: 'line',
      data:y,
      symbolSize: 1,
      smooth: true,
      showSymbol: false,
      areaStyle: {
        normal: {
          origin: 'start',
          color: new echarts.graphic.LinearGradient(0,0,0,1,
            [
              {
                offset: 0,
                color: "rgba(21, 183, 172, 0.35)",
              },
              {
                offset: 1,
                color: "rgba(21, 183, 172, 0)",
              },
            ],
            false
          ),
        },
      },
      markPoint: {
        symbol: 'rect',
        symbolSize: [2,10],
        itemStyle: {  //设置标记点的样式
          normal: { color: '#FA3320' }
        },
        label:{
          position: "top",
          distance: 0,
        },
        data:peaks.map(i=>markPointOptions(i,x,y))
      },
      markLine: {
        symbol:"rect",   
        symbolSize: [10,2], 
        silent:false,
        lineStyle:{
          type:"solid",
          color:"#FA3320",
          width:2
        },
        data : peaks.map(i=>markLineOptions(i,x,y))
      }
    }]
  }
} 