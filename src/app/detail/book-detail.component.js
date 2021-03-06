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
require("rxjs/add/operator/switchMap");
var api_service_1 = require("../service/api.service");
var system_service_1 = require("../service/system.service");
var BookDetailComponent = (function () {
    function BookDetailComponent(api, location, config, route, router) {
        this.api = api;
        this.location = location;
        this.config = config;
        this.route = route;
        this.router = router;
    }
    BookDetailComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.paramMap.get('booklink');
        console.log(id);
        this.getComics(id + ".html");
        // this.route.paramMap.switchMap((params: ParamMap) =>{
        // 	//this.getComics(params.get('id'))
        // });
    };
    BookDetailComponent.prototype.getComics = function (id) {
        var _this = this;
        this.api.getComics(id).map(function (data) {
            var retData = data.json();
            _this.comics = retData.showapi_res_body.item;
        }).subscribe();
    };
    BookDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return BookDetailComponent;
}());
BookDetailComponent = __decorate([
    core_1.Component({
        selector: "book-datail",
        templateUrl: "./book.detail.html",
        styleUrls: ["./book.detail.css"]
    }),
    __metadata("design:paramtypes", [api_service_1.API, common_1.Location, system_service_1.Config, router_1.ActivatedRoute, router_1.Router])
], BookDetailComponent);
exports.BookDetailComponent = BookDetailComponent;
//# sourceMappingURL=book-detail.component.js.map