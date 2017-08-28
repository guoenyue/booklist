import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';
import { RouterModule } from '@angular/router';

import { API } from './service/api.service';
import { Config } from './service/system.service';

import { ScrollerDirective } from './directive/scroller.directive';

import { LastSubstrPipe } from './pipes/pipe';

import { BookDetailComponent } from './detail/book-detail.component';
import { BookListComponent } from './booklist/book-list.component';
import { ThemeComponent } from './theme/theme.component';
import { HeaderComponent } from './header/header.component';
import { AsideMenuComponent } from './aside/aside.component';
import { AboutComponent } from './about/about.component';
import { AppComponent }  from './app.component';

import { Routers } from './router';

@NgModule({
  imports:      [ BrowserModule ,HttpModule,RouterModule.forRoot(Routers)],
  providers:[API,Config],
  declarations: [ AppComponent ,BookDetailComponent,BookListComponent,AsideMenuComponent,ThemeComponent,HeaderComponent,AboutComponent,LastSubstrPipe,ScrollerDirective],
  bootstrap:    [ AppComponent ]
})


export class AppModule { }
