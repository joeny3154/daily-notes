// https://www.h5jun.com/post/sixty-lines-of-code-animation.html
function Animator(duration, update, easing){
  this.duration = duration;
  this.update = update;
  this.easing = easing;
}

Animator.prototype = {

  animate: function(){

    var startTime = 0,
        duration = this.duration,
        update = this.update,
        easing = this.easing,
        self = this;

    return new Promise(function(resolve, reject){
      var qId = 0;

      function step(timestamp){
        startTime = startTime || timestamp;
        var p = Math.min(1.0, (timestamp - startTime) / duration);

        update.call(self, easing ? easing(p) : p, p);

        if(p < 1.0){
          qId = requestAnimationFrame(step);
        }else{
          resolve(self);
        }
      }

      self.cancel = function(){
        cancelAnimationFrame(qId);
        update.call(self, 0, 0);
        reject('User canceled!');
      }

      qId = requestAnimationFrame(step);
    });
  },
  ease: function(easing){
    return new Animator(this.duration, this.update, easing);
  }
};

module.exports = Animator;