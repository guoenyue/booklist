import { Component } from '@angular/core';



@Component({
  selector: 'my-app',
  template: `
      <aside-menu></aside-menu>
      <router-outlet></router-outlet>
  `
})
export class AppComponent { 
  constructor(){}
}
