import { Injectable } from '@angular/core';

import { WindowService } from '../service/window.service';

Injectable()

export class TouchService{
    
    public endTransitionEventName:any;
    public transitionDuration:any;
    public transitionTimingFunction:any;
    public transform:any;



    public scroller :any;
    public element :any;
    public vertical :any;
    public property :any;
    public preventDefault :any;
    public sensitivity :any;
    public lockDirection :any;

    public initialValue :any;

    public moveFactor :any;
    public factor :any;
    public outFactor:any;

    public min :any;
    public max :any;

    public maxRegion :any;

    public deceleration = 0.0006;
    public springMaxRegion :any;

    public change :any;
    public touchEnd :any;
    public touchStart :any;
    public touchMove :any;
    public touchCancel:any;
    public animationEnd :any;
    public currentPage:any;
    public preventDefaultException = {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/};
    public hasMin = !(this.min === void 0);
    public hasMax = !(this.max === void 0);
    public isTouchStart = false;
    public step :any;
    public inertia:any;
    public maxSpeed :any;
    public hasMaxSpeed:any;

    public _startHandler:any;
    public _moveHandler:any;
    public _transitionEndHandler:any;
    public _endHandler :any;
    public _cancelHandler:any;


    public _endCallbackTag:any;

    public _endTimeout:any;

    public tickID:any;

    public _firstTouchMove = true;
    public _preventMove = false;

    public startTime :any;
    public _startX :any;
    public _startY:any;
    public start :any;
    public preX:any;
    public preY :any;
    public _triggerTransitionEnd:any;



    private ease:string = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    public window:Window;
    constructor(){
        this.fixup();
        this.fixStyle();
    }

    fixup(){
        if (!Date.now)
            Date.now = function () { return new Date().getTime(); };
    
        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']|| window[vp + 'CancelRequestAnimationFrame']);
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
            || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame =  (callback:any):any=>{
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(()=> { callback(lastTime = nextTime); },nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    }

    fixStyle(){
        var _elementStyle = document.createElement('div').style;

        if ('transform' in _elementStyle) {
            this.transform = 'transform';
            this.endTransitionEventName = 'transitionend';
            this.transitionDuration = 'transitionDuration';
            this.transitionTimingFunction = 'transitionTimingFunction';
        } else if ('webkitTransform' in _elementStyle) {
            this.transform = 'webkitTransform';
            this.endTransitionEventName = 'webkitTransitionEnd';
            this.transitionDuration = 'webkitTransitionDuration';
            this.transitionTimingFunction = 'webkitTransitionTimingFunction';
        } else {
            throw 'please use a modern browser'
        }

    }

    private reverseEase(y:number) {
        return 1 - Math.sqrt(1 - y * y);
    }

    private bind(element:any, type:string, callback:any) {
        element.addEventListener(type, callback, false);
    }

    private unbind(element:any, type:string, callback:any) {
        element.removeEventListener(type, callback);
    }

    private preventDefaultTest(el:any, exceptions:any) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }
        return false;
    }

    init(option:any){
        this.scroller = option.target;
        this.element = typeof option.touch === "string" ? document.querySelector(option.touch) : option.touch;
        this.vertical = this._getValue(option.vertical,true) ;
        this.property = option.property;
        this.preventDefault = this._getValue(option.preventDefault,true) ;
        this.sensitivity =  this._getValue(option.sensitivity,1);
        this.lockDirection = this._getValue(option.lockDirection, true);

        this.initialValue = this._getValue(option.initialValue, this.scroller[this.property]);
        this.scroller[this.property] = this.initialValue;

        this.moveFactor = this._getValue(option.moveFactor, 1);
        this.factor = this._getValue(option.factor, 1);
        this.outFactor =  this._getValue(option.outFactor, 0.3);

        this.min = option.min;
        this.max = option.max;

        this.maxRegion = this._getValue(option.maxRegion,60);

        this.deceleration = 0.0006;
        this.maxRegion = this._getValue(option.maxRegion, 600);
        this.springMaxRegion = this._getValue(option.springMaxRegion, 60);

        this.change = option.change || function () { };
        this.touchEnd = option.touchEnd || function () { };
        this.touchStart = option.touchStart || function () { };
        this.touchMove = option.touchMove || function () { };
        this.touchCancel = option.touchMove || function () { };
        this.animationEnd = option.animationEnd || function () { };

        this.preventDefaultException = {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/};
        this.hasMin = !(this.min === void 0);
        this.hasMax = !(this.max === void 0);
        this.isTouchStart = false;
        this.step = option.step;
        this.inertia = this._getValue(option.inertia,true);
        this.maxSpeed = option.maxSpeed;
        this.hasMaxSpeed = !(this.maxSpeed === void 0);


        if (this.hasMax && this.hasMin) {
            if (this.min > this.max) throw "min value can't be greater than max value";
            this.currentPage = Math.round((this.max - this.scroller[this.property]) / this.step);
        }

        this._startHandler = this._start.bind(this);
        this._moveHandler = this._move.bind(this);
        this._transitionEndHandler = this._transitionEnd.bind(this);
        this._endHandler = this._end.bind(this);
        this._cancelHandler = this._cancel.bind(this);
        this.bind(this.element, "touchstart", this._startHandler);
        this.bind(this.scroller, this.endTransitionEventName, this._transitionEndHandler);
        this.bind(window, "touchmove", this._moveHandler);
        this.bind(window, "touchend", this._endHandler);
        this.bind(window, "touchcancel", this._cancelHandler);
        //当有step设置的时候防止执行两次end
        this._endCallbackTag = true;

        this._endTimeout = null;
    }

    _getValue(obj:any, defaultValue:any) {
        return obj === void 0 ? defaultValue : obj;
    };
    _transitionEnd() {
        if (!this._triggerTransitionEnd) return;
        var current = this.scroller[this.property];
        if (current < this.min) {
            this.to(this.min, 600, this.ease);
            return;
        } else if (current > this.max) {
            this.to(this.max, 600, this.ease);
            return;
        }

        if (this.step) {
            this.correction();
            if (this._endCallbackTag) {
                this._endTimeout = setTimeout(function () {
                    this.animationEnd.call(this, current);
                    window.cancelAnimationFrame(this.tickID);
                }.bind(this), 400);
                this._endCallbackTag = false;
            }
        } else {
            this.animationEnd.call(this, current);
            window.cancelAnimationFrame(this.tickID);
        }
    };
    _cancelAnimation() {
        this.scroller.style[this.transitionDuration] = '0ms';
        this.scroller[this.property] = this.getComputedPosition();

    };
    getComputedPosition() {
        var matrix:any = window.getComputedStyle(this.scroller, null);
        matrix = matrix[this.transform].split(')')[0].split(', ');
        return this.vertical ? (+(matrix[13] || matrix[5])) : (+(matrix[12] || matrix[4]));
    };
    _tick () {
        this.change.call(this, this.getComputedPosition());
        this.tickID = window.requestAnimationFrame(this._tick.bind(this));
    };
    stop(){
        window.cancelAnimationFrame(this.tickID);
        this._cancelAnimation();
        clearTimeout(this._endTimeout);
        if (this.hasMax && this.hasMin) {
            this.currentPage = Math.round((this.max - this.scroller[this.property]) / this.step);
        }
    }
    _start(evt:any) {
        window.cancelAnimationFrame(this.tickID);
        this._tick();

        this._endCallbackTag = true;
        this.isTouchStart = true;
        this._firstTouchMove = true;
        this._preventMove = false;
        this.touchStart.call(this,evt,this.scroller[this.property]);
        this._cancelAnimation();
        clearTimeout(this._endTimeout);
        if (this.hasMax && this.hasMin) {
            this.currentPage = Math.round((this.max - this.scroller[this.property]) / this.step);
        }
        this.startTime = new Date().getTime();
        this._startX = this.preX = evt.touches[0].pageX;
        this._startY = this.preY = evt.touches[0].pageY;
        this.start = this.vertical ? this.preY : this.preX;
    };
    _move(evt:any) {
        if (this.isTouchStart) {
            var dx = Math.abs(evt.touches[0].pageX - this._startX), dy = Math.abs(evt.touches[0].pageY - this._startY);
            if (this._firstTouchMove && this.lockDirection) {
                var dDis = dx - dy;
                if (dDis > 0 && this.vertical) {
                    this._preventMove = true;
                } else if (dDis < 0 && !this.vertical) {
                    this._preventMove = true;
                }
                this._firstTouchMove = false;
            }
            if (dx < 10 && dy < 10) return;

            if (!this._preventMove) {
                var f = this.moveFactor;
                var d = (this.vertical ? evt.touches[0].pageY - this.preY : evt.touches[0].pageX - this.preX) * this.sensitivity;
                if (this.hasMax && this.scroller[this.property] > this.max && d > 0) {
                    f = this.outFactor;
                } else if (this.hasMin && this.scroller[this.property] < this.min && d < 0) {
                    f = this.outFactor;
                }
                d *= f;
                this.preX = evt.touches[0].pageX;
                this.preY = evt.touches[0].pageY;
                this.scroller[this.property] += d;

                var timestamp = new Date().getTime();
                if (timestamp - this.startTime > 300) {
                    this.startTime = timestamp;
                    this.start = this.vertical ? this.preY : this.preX;
                }
                this.touchMove.call(this,evt,this.scroller[this.property]);

            }

            if (this.preventDefault && !this.preventDefaultTest(evt.target, this.preventDefaultException)) {
                evt.preventDefault();
            }
        }
    };
    _end(evt:any) {
        if (this.isTouchStart) {
            var self = this,
                current = this.scroller[this.property];
            if (this.touchEnd.call(this, evt, current) === false) {
                this._triggerTransitionEnd = false;
                cancelAnimationFrame(this.tickID);
                return;
            } else {
                this._triggerTransitionEnd = true;
            }
            if (this.hasMax && current > this.max) {
                this.to(this.max, 600, this.ease);
            } else if (this.hasMin && current < this.min) {
                this.to(this.min, 600, this.ease);
            } else if (this.inertia && !this._preventMove) {
                var dt = new Date().getTime() - this.startTime;
                if (dt < 300) {

                    var distance = ((this.vertical ? evt.changedTouches[0].pageY : evt.changedTouches[0].pageX) - this.start) * this.sensitivity,
                        speed = Math.abs(distance) / dt,
                        speed2 = this.factor * speed;
                    if(this.hasMaxSpeed&&speed2>this.maxSpeed) {
                        speed2 = this.maxSpeed;
                    }
                    var destination = current + (speed2 * speed2) / (2 * this.deceleration) * (distance < 0 ? -1 : 1);

                    var tRatio = 1;
                    if (destination < this.min) {
                        if (destination < this.min - this.maxRegion) {
                            tRatio = this.reverseEase((current - this.min + this.springMaxRegion) / (current - destination));
                            destination = this.min - this.springMaxRegion;
                        } else {
                            tRatio = this.reverseEase((current - this.min + this.springMaxRegion * (this.min - destination) / this.maxRegion) / (current - destination));
                            destination = this.min - this.springMaxRegion * (this.min - destination) / this.maxRegion;
                        }
                    } else if (destination > this.max) {
                        if (destination > this.max + this.maxRegion) {
                            tRatio = this.reverseEase((this.max + this.springMaxRegion - current) / (destination - current));
                            destination = this.max + this.springMaxRegion;
                        } else {
                            tRatio = this.reverseEase((this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion - current) / (destination - current));
                            destination = this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion;

                        }
                    }
                    var duration = Math.round(speed / self.deceleration) * tRatio;

                    self.to(Math.round(destination), duration, this.ease);
                } else {
                    if (self.step) {
                        self.correction();
                    }
                }
            } else {
                if (self.step) {
                    self.correction();
                }
            }
            // if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) {
            //     evt.preventDefault();
            // }
            this.isTouchStart = false;
        }
    };
    _cancel(evt:any) {
        window.cancelAnimationFrame(this.tickID);
        if (this.step) {
            this.correction();
        }
        this.touchCancel.call(this, evt);
    };
    to(value:number, time:number, u_ease:string) {
        var el = this.scroller,
            property = this.property;

       el.style[this.transitionDuration] =  this._getValue(time, 600) + 'ms';
       el.style[this.transitionTimingFunction] = u_ease||this.ease;
        el[property] = value;
    };
    correction() {
        var m_str = window.getComputedStyle(this.scroller)[this.transform];
        var value = this.vertical ? parseInt(m_str.split(',')[13]) : parseInt(m_str.split(',')[12]);
        var rpt = Math.floor(Math.abs(value / this.step));
        var dy = value % this.step;
        var result;
        if (Math.abs(dy) > this.step / 2) {
            result = (value < 0 ? -1 : 1) * (rpt + 1) * this.step;
            if (result > this.max) result = this.max;
            if (result < this.min) result = this.min;
            this.to(result, 400, this.ease);
        } else {
            result = (value < 0 ? -1 : 1) * rpt * this.step;
            if (result > this.max) result = this.max;
            if (result < this.min) result = this.min;
            this.to(result, 400, this.ease);
        }
    };
    destroy () {
        this.unbind(this.element, "touchstart", this._startHandler);
        this.unbind(this.scroller, this.endTransitionEventName, this._transitionEndHandler);
        this.unbind(window, "touchmove", this._moveHandler);
        this.unbind(window, "touchend", this._endHandler);
        this.unbind(window, "touchcancel", this._cancelHandler);
    }


}