import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


//const APIUrl = "http://192.168.1.65:8000";
//const APIUrl = "http://127.0.0.1:8000";
const APIUrl = "http://217.133.14.152:5000";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  

  getCustomerList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/customers');
  }


  addCustomer(val:any): Observable<any>{
    return this.http.post(APIUrl + '/customer/add',val);
  }

  updateCustomer(id: any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/customer/update/${id}`, val);
  }

  deleteCustomer(id:any, val:any): Observable<any>{
    return this.http.post(APIUrl + '/customer/delete/' + id, val);
  }

  getCustomerIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/customeriso/${id}`);
  }

}
