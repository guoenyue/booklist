import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Book } from '../book/book';

import { Config } from "../service/system.service";
import { API } from '../service/api.service';

@Component({
	moduleId:module.id,
	selector:"book-list",
	templateUrl:"./book.list.html",
	styleUrls:['./book.list.css']
})

export class BookListComponent implements OnInit{
	public booklist:any[];

	constructor(private api:API,private config:Config,private router:Router,private location:Location){}

	ngOnInit(){
		//初始化书单列表
		this.getBookList(1);
	}

	getBookList(page:number){
		// this.api.getBookList().map(data=>{
		// 	this.booklist=data;
		// })

		//这里是填充书单列表
		this.api.log(page);
		this.api.getComicsList(page).map(data=>{
			let retData=data.json();
			if(retData&&!retData.showapi_res_body.pagebean.hasMorePage){
				console.log("没有更多数据了");
			}else{
				this.booklist=retData.showapi_res_body.pagebean.contentlist;
			}
		}).subscribe();
		
	}

	goToDetail(link:any){
		 this.router.navigate(['/detail',link])
	}
}
