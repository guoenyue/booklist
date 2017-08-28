"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var transform_1 = require("../service/transform");
var touch_service_1 = require("../service/touch.service");
var ScrollerDirective = (function () {
    function ScrollerDirective(el, transform, touch) {
        this.el = el;
        this.transform = transform;
        this.touch = touch;
    }
    ScrollerDirective.prototype.ngOnInit = function () {
        this.init();
    };
    ScrollerDirective.prototype.init = function () {
        console.log(this.options);
        this.transform.init(this.el.nativeElement, true);
        this.touch.init({
            touch: "#scrollBody",
            vertical: true,
            target: this.el.nativeElement,
            property: "translateY",
            initialValue: 0,
            min: -40,
            max: 0,
            change: function (value) {
                //pull_refresh.translateY = value;
            },
            touchMove: function (evt, value) {
                if (value > 70) {
                    //console.log("大于了下拉刷新的值",value);
                    //http://caniuse.com/#search=classList
                    //arrow.classList.add("arrow_up");
                    this.options && this.options.pull_refresh && this.options.pull_refresh(this);
                }
                else if (value < -60) {
                    //arrow.classList.remove("arrow_up");
                    //console.log("小于了上拉加载的值",value);
                    this.options && this.options.pull_reload && this.options.pull_reload(this);
                }
                else {
                }
            },
            touchEnd: function (evt, value) {
                var _this = this;
                if (value > 70) {
                    this.to(60);
                    console.log("下拉刷新");
                    setTimeout(function () { _this.to(0); console.log("刷新完毕"); }, 3000);
                    return false;
                }
                else if (value < -70) {
                    this.to(-60);
                    console.log("上拉加载");
                    setTimeout(function () { _this.to(0); console.log("加载完毕"); }, 3000);
                    return false;
                }
            }
        });
    };
    return ScrollerDirective;
}());
__decorate([
    core_1.Input("scrollerOptions"),
    __metadata("design:type", Object)
], ScrollerDirective.prototype, "options", void 0);
ScrollerDirective = __decorate([
    core_1.Directive({
        selector: '[scroller]',
        providers: [transform_1.TransformService, touch_service_1.TouchService]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, transform_1.TransformService, touch_service_1.TouchService])
], ScrollerDirective);
exports.ScrollerDirective = ScrollerDirective;
//# sourceMappingURL=scroller.directive.js.map