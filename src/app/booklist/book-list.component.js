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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/map");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var system_service_1 = require("../service/system.service");
var api_service_1 = require("../service/api.service");
var BookListComponent = (function () {
    function BookListComponent(api, config, router, location) {
        this.api = api;
        this.config = config;
        this.router = router;
        this.location = location;
    }
    BookListComponent.prototype.ngOnInit = function () {
        //初始化书单列表
        this.getBookList(1);
    };
    BookListComponent.prototype.getBookList = function (page) {
        // this.api.getBookList().map(data=>{
        // 	this.booklist=data;
        // })
        var _this = this;
        //这里是填充书单列表
        this.api.log(page);
        this.api.getComicsList(page).map(function (data) {
            var retData = data.json();
            if (retData && !retData.showapi_res_body.pagebean.hasMorePage) {
                console.log("没有更多数据了");
            }
            else {
                _this.booklist = retData.showapi_res_body.pagebean.contentlist;
            }
        }).subscribe();
    };
    BookListComponent.prototype.goToDetail = function (link) {
        this.router.navigate(['/detail', link]);
    };
    return BookListComponent;
}());
BookListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "book-list",
        templateUrl: "./book.list.html",
        styleUrls: ['./book.list.css']
    }),
    __metadata("design:paramtypes", [api_service_1.API, system_service_1.Config, router_1.Router, common_1.Location])
], BookListComponent);
exports.BookListComponent = BookListComponent;
//# sourceMappingURL=book-list.component.js.map