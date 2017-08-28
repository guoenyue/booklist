import { Injectable } from '@angular/core';

@Injectable()

export class WindowService{
    constructor(){
    }
    init(){
        console.log(window);
        return window;
    }
}