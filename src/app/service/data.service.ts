import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()


export class Data{
    
	constructor(private http:Http){}

	log(any:any){
		console.log(any);
    }
}