
animation
=====

http://www.w3school.com.cn/css3/css3_animation.asp

@keyframes	规定动画
animation	所有动画属性的简写属性，除了 animation-play-state 属性。
animation-name	规定 @keyframes 动画的名称。	
animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0。	
animation-timing-function	规定动画的速度曲线。默认是 "ease"。	
animation-delay	规定动画何时开始。默认是 0。	
animation-iteration-count	规定动画被播放的次数。默认是 1。	
animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"。	
animation-play-state	规定动画是否正在运行或暂停。默认是 "running"。	
animation-fill-mode	规定对象动画时间之外的状态。	

# animation-iteration-count

规定动画被播放的次数, 默认是 1

n: 定义动画播放次数的数值。
infinite: 规定动画应该无限次播放。

# animation-timing-function

linear	动画从头到尾的速度是相同的。	
ease	默认。动画以低速开始，然后加快，在结束前变慢。	
ease-in	动画以低速开始。	
ease-out	动画以低速结束。	
ease-in-out	动画以低速开始和结束。	
cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。