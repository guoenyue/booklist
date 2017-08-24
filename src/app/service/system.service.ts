import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()


export class Config{
    public themes:any[]=[{color:"#269A24",name:"原谅绿"},{color:"#444444",name:"高贵棕"},{color:"#212121",name:"酷炫黑"},{color:"#ffee53",name:"闪眼黄"},{color:"#D4BFA9",name:"土豪金"}];
    public defaultTheme:string='#269A24';
    public theme:string=this.defaultTheme;

    public showMenu:boolean=false;

	constructor(private http:Http){}

	log(any:any){
		console.log(any);
    }
    setTheme(theme:string){
        this.theme=theme;
    }
    closeMenu(){
        this.showMenu=false;
    }
    openMenu(){
        this.showMenu=true;
    }
}