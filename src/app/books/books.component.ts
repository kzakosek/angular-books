import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface  Book {
    title : string,
    publisher: string,
    pageCount: number,
    descriptions: string,
    expanded: boolean
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('descriptionExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  columnsToDisplay = ['title', 'publisher', 'pageCount'];

  toggleRow(element: { expanded: boolean; }) {
    element.expanded = !element.expanded
  }

  constructor(
    private httpClient: HttpClient
    
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    const API = 'https://www.googleapis.com/books/v1/volumes?q=angular &maxResults=25';
    this.httpClient.get<any>(API).subscribe(
      respone => {
        let res = JSON.parse(JSON.stringify(respone.items))
        let data = [];
        for(var i = 0; i < res.length; i++){
          data.push(res[i].volumeInfo);
        }
        this.books = data;
        //console.log(this.books);
      }
    )
  }
}
