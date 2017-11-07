

父组件调用@ViewChild()
======
相当于ref


import { AfterViewInit, ViewChild } from '@angular/core';
import { CountdownTimerComponent }  from './countdown-timer.component';

@Component({
  selector: 'app-countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  <app-countdown-timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {
 
 <!-- 实现类似ref的功能 -->
  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;
  
  <!-- 被注入的计时器组件只有在Angular显示了父组件视图之后才能访问，所以我们先把秒数显示为0 -->
  seconds() { return 0; }
 
  ngAfterViewInit() {
    <!-- 遵循单向数据流规则 -->
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }
 
  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}