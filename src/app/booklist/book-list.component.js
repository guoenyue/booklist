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
var pipe_1 = require("../pipes/pipe");
var system_service_1 = require("../service/system.service");
var api_service_1 = require("../service/api.service");
var BookListComponent = (function () {
    function BookListComponent(api, config, router, location, pipe) {
        this.api = api;
        this.config = config;
        this.router = router;
        this.location = location;
        this.pipe = pipe;
        this.booklist = localStorage['comicsData'] && JSON.parse(localStorage['comicsData'])['page1'] || [];
    }
    BookListComponent.prototype.ngOnInit = function () {
        //初始化书单列表
        if (!this.booklist || this.booklist.length == 0)
            this.getBookList(1);
        // setInterval(()=>{
        // 	this.freshBookListData();
        // },4000);
    };
    BookListComponent.prototype.getBookList = function (page) {
        var _this = this;
        this.api.log(page);
        var bookListData;
        if (bookListData = this.getBookListDataByPage(page)) {
            this.setBookListData(bookListData);
        }
        else {
            this.api.getComicsList(page).map(function (data) {
                var retData = data.json();
                if (retData && !retData.showapi_res_body.pagebean.hasMorePage) {
                    console.log("没有更多数据了");
                }
                else {
                    bookListData = retData.showapi_res_body.pagebean.contentlist;
                    _this.saveBookListData(bookListData, page);
                    _this.setBookListData(bookListData);
                }
            }).subscribe(function (data) {
                console.log(data);
            });
        }
    };
    BookListComponent.prototype.freshBookListData = function (page) {
        delete localStorage.comicsData;
        this.booklist = [];
        this.getBookList(1);
    };
    BookListComponent.prototype.saveBookListData = function (data, page) {
        localStorage['comicsData'] = localStorage['comicsData'] || JSON.stringify({});
        var tmp = JSON.parse(localStorage['comicsData']);
        tmp['page' + page] = data;
        localStorage['comicsData'] = JSON.stringify(tmp);
        tmp = null;
    };
    BookListComponent.prototype.getBookListDataByPage = function (page) {
        var data = localStorage['comicsData'];
        var parseData;
        if (data && (parseData = JSON.parse(data)) && parseData['page' + page]) {
            return parseData['page' + page];
        }
        return false;
    };
    BookListComponent.prototype.setBookListData = function (data) {
        this.booklist = data;
    };
    BookListComponent.prototype.goToDetail = function (link) {
        var mylink = this.pipe.transform(link, 5);
        this.router.navigate(['/detail', mylink]);
    };
    return BookListComponent;
}());
BookListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "book-list",
        providers: [pipe_1.LastSubstrPipe],
        templateUrl: "./book.list.html",
        styleUrls: ['./book.list.css']
    }),
    __metadata("design:paramtypes", [api_service_1.API, system_service_1.Config, router_1.Router, common_1.Location, pipe_1.LastSubstrPipe])
], BookListComponent);
exports.BookListComponent = BookListComponent;
//# sourceMappingURL=book-list.component.js.map