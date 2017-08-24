import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap';

import { API } from '../service/api.service';
import { Config } from '../service/system.service';

@Component({
	selector:"book-datail",
	templateUrl:"./book.detail.html",
	styleUrls:["./book.detail.css"]
})

export class BookDetailComponent implements OnInit{
	public comics:any;
	constructor(private api:API,private location:Location,private config:Config,private route: ActivatedRoute,private router: Router) {

	}

	ngOnInit(){
		let id = this.route.snapshot.paramMap.get('booklink');
		console.log(id);
		this.getComics(id+".html");
		// this.route.paramMap.switchMap((params: ParamMap) =>{
		// 	//this.getComics(params.get('id'))
		// });
	}

	getComics(id:string){
		this.api.getComics(id).map(data=>{
			let retData=data.json();
			this.comics=retData.showapi_res_body.item;
		}).subscribe();
	}

	goBack(){
		this.location.back();
	}
}