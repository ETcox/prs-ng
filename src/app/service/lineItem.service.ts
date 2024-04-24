import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LineItem } from '../model/lineItem';

const URL: string = 'http://localhost:8080/api/lineitems';
//const URL: string = 'https://localhost:7090/api/lineitems';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) { }


  getAllLineItems(): Observable<LineItem[]> {

    return this.http.get(URL+"/") as Observable<LineItem[]>;
}

getLineItemById(id: number) : Observable<LineItem> {
    return this.http.get(URL + '/' +id) as Observable<LineItem>;
 }

 getLineItemByRequestId(id:number) : Observable<LineItem[]> {
    return this.http.get(URL + '/lines-for-pr/' +id ) as Observable<LineItem[]>;
 }

createLineItem(lineItem: LineItem) : Observable<LineItem>{
   
    return this.http.post(URL, lineItem) as Observable<LineItem>;
}

updateLineItem(lineItem: LineItem) : Observable<LineItem>{
    return this.http.put(URL+'/'+lineItem.id, lineItem) as Observable<LineItem>;
}

deleteLineItem(id: number): Observable<boolean>{
   return this.http.delete(URL+"/"+id) as Observable<boolean>;
}

}
