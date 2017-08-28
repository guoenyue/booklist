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
		if(!this.booklist||this.booklist.length==0)
		this.getBookList(1);
		// setInterval(()=>{
		// 	this.freshBookListData();
		// },4000);
	}

	getBookList(page:number){
		this.api.log(page);
		let bookListData;
		if(bookListData=this.getBookListDataByPage(page)){
			this.setBookListData(bookListData);
		}else{
			this.api.getComicsList(page).map(data=>{
				let retData=data.json();
				if(retData&&!retData.showapi_res_body.pagebean.hasMorePage){
					console.log("没有更多数据了");
				}else{
					bookListData=retData.showapi_res_body.pagebean.contentlist;
					this.saveBookListData(bookListData,page);
					this.setBookListData(bookListData);
				}
			}).subscribe(data=>{
				console.log(data);
			});
		}		
	}

	freshBookListData(page?:number){
		delete localStorage.comicsData;
		this.booklist=[];
		this.getBookList(1);
	}

	saveBookListData(data:any,page:number):void{
		localStorage['comicsData']=localStorage['comicsData']||JSON.stringify({});
		let tmp=JSON.parse(localStorage['comicsData']);
		tmp['page'+page]=data;
		localStorage['comicsData']=JSON.stringify(tmp);
		tmp=null;
	}

	getBookListDataByPage(page:any):any{
		let data=localStorage['comicsData'];
		let parseData;
		if(data&&(parseData=JSON.parse(data))&&parseData['page'+page]){
			return parseData['page'+page];
		}
		return false;
	}

	setBookListData(data:any):void{
		this.booklist=data;
	}

	goToDetail(link:any):void{
		let mylink=this.pipe.transform(link,5);
		 this.router.navigate(['/detail',mylink])
	}

	


}
