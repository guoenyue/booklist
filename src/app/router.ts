import { Routes } from '@angular/router';

import { BookDetailComponent } from './detail/book-detail.component';
import { BookListComponent } from './booklist/book-list.component';
import { ThemeComponent } from './theme/theme.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';




export const Routers:Routes=[
	{
		path:"list",
		component:BookListComponent
	},
	{
		path:"theme",
		component:ThemeComponent
	},
	{
		path:"detail/:booklink",
		component:BookDetailComponent
	},
	{
		path:"about",
		component:AboutComponent
	},
	{ 
		path: '',
    	redirectTo: '/list',
    	pathMatch: 'full'
	},
	{
		path:"**",
		redirectTo:"/list"
	}
];