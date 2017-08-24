import { Component ,Input} from '@angular/core';

import { Config } from '../service/system.service';


@Component({
    selector:"aside-menu",
    templateUrl:"./aside.html",
    styleUrls:['../../../asset/css/iconfont.css','./aside.css']
})

export class AsideMenuComponent{
    constructor(private config:Config){
    }
    closeMenu(){
        this.config.closeMenu();
    }
}
