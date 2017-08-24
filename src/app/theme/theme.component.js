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
var system_service_1 = require("../service/system.service");
var ThemeComponent = (function () {
    function ThemeComponent(config) {
        this.config = config;
    }
    ThemeComponent.prototype.ngOnInit = function () {
        this.themes = this.config.themes;
    };
    ThemeComponent.prototype.setTheme = function (item) {
        this.config.setTheme(item.color);
    };
    return ThemeComponent;
}());
ThemeComponent = __decorate([
    core_1.Component({
        selector: "my-theme",
        templateUrl: "./theme.html",
        styleUrls: ["./theme.css"]
    }),
    __metadata("design:paramtypes", [system_service_1.Config])
], ThemeComponent);
exports.ThemeComponent = ThemeComponent;
//# sourceMappingURL=theme.component.js.map