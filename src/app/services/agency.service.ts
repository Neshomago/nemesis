import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


//const APIUrl = "http://192.168.1.65:8000";
//const APIUrl = "http://127.0.0.1:8000";
const APIUrl = "http://217.133.14.152:5000";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http:HttpClient) { }
  
  getAgency(name:string):Observable<any>{
    return this.http.get<any[]>(APIUrl+'/agency/'+name);
  }

  getAgencyList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agencies');
  }

  getCustomerAgencyList(customerId:any):Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agencies/'+ customerId);
  }

  addAgency(val:any): Observable<any>{
    return this.http.post(APIUrl + '/agency/add',val);
  }

  updateAgency(id: any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/agency/update/${id}`, val);
  }

  deleteAgency(id:any, val:any): Observable<any>{
    return this.http.post(APIUrl + '/agency/delete/'+id, val);
  }

  getAgencyIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/agencyiso/${id}`);
  }

  getAgencyName(id:any):Observable<any>{
    return this.http.get(`${APIUrl}/agencyid/${id}`);
  }

}
