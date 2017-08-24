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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var API = (function () {
    function API(http) {
        this.http = http;
        this.baseUrl = "http://route.showapi.com/";
        this.secret = "7441e94c5a26475b9ae181597a01593c";
        this.appid = 33872;
        this.type = "/category/weimanhua/kbmh";
        this.page = 1;
    }
    API.prototype.log = function (any) {
        console.log(any);
    };
    API.prototype.getBook = function (args) {
        //return
    };
    ;
    API.prototype.getComicsList = function (page) {
        return this.http.post(this.baseUrl + "958-1", {}, { params: {
                showapi_sign: this.secret,
                showapi_appid: this.appid,
                type: this.type,
                page: page || this.page
            }
        });
    };
    ;
    API.prototype.getComics = function (id) {
        return this.http.post(this.baseUrl + "958-2", {}, { params: {
                showapi_sign: this.secret,
                showapi_appid: this.appid,
                id: id
            }
        });
    };
    ;
    return API;
}());
API = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], API);
exports.API = API;
//# sourceMappingURL=api.service.js.map