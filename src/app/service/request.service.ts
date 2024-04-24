import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Request } from '../model/request';

const URL: string = 'http://localhost:8080/api/requests';
//const URL: string = 'https://localhost:7090/api/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient){
       
    
  }

  


   getAllRequests(): Observable<Request[]> {

       return this.http.get(URL+"/") as Observable<Request[]>;
   }

   getRequestById(id: number) : Observable<Request> {
    return this.http.get(URL + '/' +id) as Observable<Request>;
 }

   createRequest(request: Request) : Observable<Request>{
     
    return this.http.post(URL, request) as Observable<Request>;
}

  updateRequest(request: Request) : Observable<Request>{
    return this.http.put(URL+'/'+request.id, request) as Observable<Request>;
}

  deleteRequest(id: number): Observable<boolean>{
    return this.http.delete(URL+"/"+id) as Observable<boolean>;
  }

  reviewRequest(request: Request): Observable<Request>{
    return this.http.post(URL+"/review/"+request.id, request) as Observable<Request>;
  }

  getAllRequestForReview(userid: number): Observable<Request[]> {
    return this.http.get(URL + '/reviews/' + userid) as Observable<Request[]>
  }
 
  approveRequest(request: Request): Observable<Request> {
    return this.http.post(URL + '/approve/' + request.id, request) as Observable<Request>;
  }
 
  rejectRequest(request: Request, reasonForRejection: string): Observable<Request> {
    return this.http.post(URL + '/reject/' + request.id, reasonForRejection) as Observable<Request>;
  }


}
