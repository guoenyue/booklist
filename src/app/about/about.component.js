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
var common_1 = require("@angular/common");
var system_service_1 = require("../service/system.service");
var AboutComponent = (function () {
    function AboutComponent(config, location) {
        this.config = config;
        this.location = location;
    }
    AboutComponent.prototype.ngOnInit = function () { };
    AboutComponent.prototype.goBack = function () {
        this.location.back();
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: "my-about",
        templateUrl: "./about.html",
        styleUrls: ["./about.css"]
    }),
    __metadata("design:paramtypes", [system_service_1.Config, common_1.Location])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map