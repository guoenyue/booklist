import { Component,OnInit } from '@angular/core';

import { Config } from "../service/system.service";

@Component({
    selector:"my-theme",
    templateUrl:"./theme.html",
    styleUrls:["./theme.css"]
})

export class ThemeComponent implements OnInit{
    public themes:any[];
    constructor(private config:Config){}
    ngOnInit(){
        this.themes=this.config.themes;
    }
    setTheme(item:any){
        this.config.setTheme(item.color);
    }
}