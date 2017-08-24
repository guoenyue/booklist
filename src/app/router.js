"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var book_detail_component_1 = require("./detail/book-detail.component");
var book_list_component_1 = require("./booklist/book-list.component");
var theme_component_1 = require("./theme/theme.component");
exports.Routers = [
    {
        path: "list",
        component: book_list_component_1.BookListComponent
    },
    {
        path: "theme",
        component: theme_component_1.ThemeComponent
    },
    {
        path: "detail/:booklink",
        component: book_detail_component_1.BookDetailComponent
    },
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: "/list"
    }
];
//# sourceMappingURL=router.js.map