import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const APIUrl = "http://192.168.1.65:5000";
//const APIUrl = "http://127.0.0.1:5000";
const APIUrl = "http://217.133.14.152:5000";

@Injectable({
  providedIn: 'root'
})


export class SharedService {

  constructor( private http:HttpClient) { }

  getClientsCount():Observable<any>{
    return this.http.get(APIUrl+`/clientscount`);
  }

  getTicketCountWorking():Observable<any>{
    return this.http.get(APIUrl+`/ticketcountworking`);
  }

  getTicketCountOpen():Observable<any>{
    return this.http.get(APIUrl+`/ticketcountopen`);
  }
}