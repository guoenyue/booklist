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


import { LastSubstrPipe } from '../pipes/pipe';


import { Book } from '../book/book';

import { Config } from "../service/system.service";
import { API } from '../service/api.service';

@Component({
	moduleId:module.id,
	selector:"book-list",
	providers:[LastSubstrPipe],
	templateUrl:"./book.list.html",
	styleUrls:['./book.list.css']
})

export class BookListComponent implements OnInit{
	public booklist:any[]=localStorage['comicsData']&&JSON.parse(localStorage['comicsData'])['page1']||[];

	constructor(private api:API,private config:Config,private router:Router,private location:Location,private pipe:LastSubstrPipe){}

	ngOnInit(){
		//初始化书单列表
		if(!this.booklist)
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
				localStorage['comicsData']=localStorage['comicsData']||JSON.stringify({});
				let tmp=JSON.parse(localStorage['comicsData']);
				tmp['page'+page]=this.booklist;
				localStorage['comicsData']=JSON.stringify(tmp);
			}
		}).subscribe();
		
	}

	goToDetail(link:any){
		let mylink=this.pipe.transform(link,5);
		 this.router.navigate(['/detail',mylink])
	}
}
