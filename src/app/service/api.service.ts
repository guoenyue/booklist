import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()


export class API{
	private baseUrl:string="http://route.showapi.com/";
	private secret:string="7441e94c5a26475b9ae181597a01593c";
	private appid:number=33872;
	public type:string="/category/weimanhua/kbmh";
	public page:number=1;



	constructor(private http:Http){}

	log(any:any){
		console.log(any);
	}
	getBook(args:any){
		//return
	};

	getComicsList(page:number) :Observable<any>{
		return this.http.post(this.baseUrl+"958-1",{},{params:{
			showapi_sign:this.secret,
			showapi_appid:this.appid,
			type:this.type,
			page:page||this.page}
		});
	};
	getComics(id:string) :Observable<any>{
		return this.http.post(this.baseUrl+"958-2",{},{params:{
			showapi_sign:this.secret,
			showapi_appid:this.appid,
			id:id}
		});
	};
}