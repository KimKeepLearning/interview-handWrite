function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
 
//红灯3秒亮一次，
//黄灯2秒亮一次，
//绿灯1秒亮一次；
//如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：


const light = (func, timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      func();
    }, timer)
  })
}

const step = () => {
  Promise.resolve()
    .then(() => {
      return light(red, 3000)
    }).then(() => {
      return light(green, 2000)
    }).then(() => {
      return light(yellow, 1000)
    }).then(() => {
      return step();
    })
}

step();