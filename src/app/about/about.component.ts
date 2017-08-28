import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Config } from '../service/system.service';

@Component({
    selector:"my-about",
    templateUrl:"./about.html",
    styleUrls:["./about.css"]
})

export class AboutComponent implements OnInit{
    constructor(private config:Config,private location:Location){}
    ngOnInit(){}


    goBack(){
        this.location.back();
    }
}