function nowtime(){
  if(typeof performance !== 'undefined' && performance.now){
    return performance.now();
  }
  return Date.now ? Date.now() : (new Date()).getTime();
}

if (typeof window.requestAnimationFrame === 'undefined') {
  window.requestAnimationFrame = function (callback) {
    return setTimeout(function () {
      callback.call(this, nowtime());
    }, 1000 / 60);
  }
  window.cancelAnimationFrame = function (qId) {
    return clearTimeout(qId);
  }
}


class Animator {
  constructor(duration, update, easing) {
    this.duration = duration // 动画时间
    this.update = update // 没单位更新方法
    this.easing = easing // 
  }

  animate() {
    var startTime = 0,
      duration = this.duration,
      update = this.update,
      easing = this.easing,
      self = this
      
      return new Promise((resolve, reject) => {
        let qId = 0

        let step = (timestamp) => {
          startTime = startTime || timestamp
          let p = Math.min(1, (timestamp - startTime) / duration)
          update.call(this, p)
          if (p < 1) {
            qId = requestAnimationFrame(step)
          } else {
            resolve(self)
          }
        }

        this.cancel = function(){
          cancelAnimationFrame(qId)
          update.call(self, 0, 0)
          reject('User canceled!')
        }

        qId = requestAnimationFrame(step)
      })
  }
}


var elem = document.getElementById('block')

let animator = new Animator(1000, function (t) {
  let tx = -100 * Math.sin(2 * Math.PI * t),
      ty = -100 * Math.cos(2 * Math.PI * t)
  elem.style.transform = `translate(${tx}px, ${ty}px)`
})

elem.addEventListener('click', async function () {
  console.log('click')
  let i = 0
  while (i < 10000) {
    await animator.animate()
    block.style.background = ['red','green','blue'][i++%3]
  }
})