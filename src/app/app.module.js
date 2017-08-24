"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var api_service_1 = require("./service/api.service");
var system_service_1 = require("./service/system.service");
var book_detail_component_1 = require("./detail/book-detail.component");
var book_list_component_1 = require("./booklist/book-list.component");
var theme_component_1 = require("./theme/theme.component");
var header_component_1 = require("./header/header.component");
var aside_component_1 = require("./aside/aside.component");
var app_component_1 = require("./app.component");
var router_2 = require("./router");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(router_2.Routers)],
        providers: [api_service_1.API, system_service_1.Config],
        declarations: [app_component_1.AppComponent, book_detail_component_1.BookDetailComponent, book_list_component_1.BookListComponent, aside_component_1.AsideMenuComponent, theme_component_1.ThemeComponent, header_component_1.HeaderComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map