import { Component} from '@angular/core';
import { Config } from "../service/system.service";

@Component({
    selector:"my-header",
    templateUrl:"./header.html",
    styleUrls:["./header.css"]
})

export class HeaderComponent{
    constructor(private config:Config){}

    showMenu(){
        this.config.openMenu();
    }

}