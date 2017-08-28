import { Directive, ElementRef, Input,HostListener,OnInit } from '@angular/core';

import { TransformService } from '../service/transform';

import { TouchService } from '../service/touch.service';

@Directive({ 
    selector: '[scroller]',
    providers:[TransformService,TouchService]
})
export class ScrollerDirective  implements OnInit{

     @Input("scrollerOptions") options:any;

    constructor(private el: ElementRef,private transform:TransformService,private touch:TouchService) {
       
    }

    ngOnInit() {
        this.init(); 
    }

    init(){
        console.log(this.options);
        this.transform.init(this.el.nativeElement,true)
        this.touch.init({
             touch: "#scrollBody",//反馈触摸的dom
             vertical: true,//不必需，默认是true代表监听竖直方向touch
             target: this.el.nativeElement, //运动的对象
             property: "translateY",  //被滚动的属性
             initialValue: 0,
             min:-40, //不必需,滚动属性的最小值
             max: 0, //不必需,滚动属性的最大值
             change: function (value:number) {
                 //pull_refresh.translateY = value;
             },
             touchMove: function (evt:any, value:number) {
                 if (value > 70) {
                     //console.log("大于了下拉刷新的值",value);
                     //http://caniuse.com/#search=classList
                     //arrow.classList.add("arrow_up");
                     this.options&&this.options.pull_refresh&&this.options.pull_refresh(this);
                 } else if(value<-60){
                     //arrow.classList.remove("arrow_up");
                     //console.log("小于了上拉加载的值",value);
                     this.options&&this.options.pull_reload&&this.options.pull_reload(this);
                 }else{
 
                 }
             },
             touchEnd: function (evt:any, value:number) {
                 if (value > 70) {
                     this.to(60);
                     console.log("下拉刷新");
                     setTimeout(()=>{this.to(0);console.log("刷新完毕");},3000);
                     return false;
                 }else if(value<-70){
                     this.to(-60);
                     console.log("上拉加载");
                     setTimeout(()=>{this.to(0);console.log("加载完毕");},3000);
                     return false;
                 }
             }
         });
    }
    // @HostListener('touchstart',["$event"]) onMouseEnter(event:any) {
    //     console.log(this.options);
    //     console.log(event);
    //   }
    
}