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
var Config = (function () {
    function Config(http) {
        this.http = http;
        this.themes = [{ color: "#269A24", name: "原谅绿" }, { color: "#444444", name: "高贵棕" }, { color: "#212121", name: "酷炫黑" }, { color: "#ffee53", name: "闪眼黄" }, { color: "#D4BFA9", name: "土豪金" }];
        this.defaultTheme = '#269A24';
        this.theme = this.defaultTheme;
        this.showMenu = false;
    }
    Config.prototype.log = function (any) {
        console.log(any);
    };
    Config.prototype.setTheme = function (theme) {
        this.theme = theme;
    };
    Config.prototype.closeMenu = function () {
        this.showMenu = false;
    };
    Config.prototype.openMenu = function () {
        this.showMenu = true;
    };
    return Config;
}());
Config = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Config);
exports.Config = Config;
//# sourceMappingURL=system.service.js.map