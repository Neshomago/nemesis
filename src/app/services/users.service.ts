import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

//const APIUrl = "http://192.168.1.65:8000";
//const APIUrl = "http://127.0.0.1:8000";
const APIUrl = "http://217.133.14.152:5000";

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'Origin, Content-Type'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private fooSubject = new Subject<any>();

  constructor( private http:HttpClient) { }

  getContact():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/contact/');
  }

  getContactList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/contact');
  }

  addUser(val:any): Observable<any>{
    return this.http.post(APIUrl + '/user/add',val);
  } 

  changeUserPassword(val:any): Observable<any>{
    return this.http.post(APIUrl + '/user/changepass',val);
  }

  addContact(val:any): Observable<any>{
    return this.http.post(APIUrl + '/contact/add',val);
  }

  updateContact(id:any, val:any): Observable<any>{
    return this.http.post(APIUrl + '/contact/update/'+id, val);
  }

  deleteContact(val:any): Observable<any>{
    return this.http.delete(APIUrl + '/contact/delete',val);
  }

  // getTechnicianList(): Observable<any>{
  //   return this.http.get<any[]>(APIUrl + '/techn');
  // }
  getTechnicianList(): Observable<any>{
    return this.http.get<any[]>(APIUrl + '/usersmailsanddata');
  }
  getContactIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/contactiso/${id}`);
  }

  getContactUser(username:any): Observable<any>{
    return this.http.get(`${APIUrl}/contactiso/${username}`);
  }

  getUserCheck(usermail:any): Observable<any>{
    return this.http.post(APIUrl + '/user/mail', usermail);
  }

  publishSomeData(data:any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    console.log("Prueba de observable: ", this.fooSubject);
    return this.fooSubject;
  }

  getUsersData(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/usersmailsanddata`);
  }

  getUsersCompleteList(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/users`);
  }

  getUserNameEmailList():Observable<any>{
    return this.http.get<any[]>(`${APIUrl}/warehouseusertrackinfolist`);
  }

  technicianUpdateAvailabe(id:any, val:any): Observable<any>{
    console.log("contenido del val: ",val);
    return this.http.post(APIUrl + '/user/updateavailable/'+id, val);
  }


    // metodo para obtener los datos del usuario a acutualizar
    getUsertoUpdate(id:any):Observable<any>{
      return this.http.get<any[]>(`${APIUrl}/users/tomodify/${id}`);
    }
  
    // metodo para obtener los datos del usuario a acutualizar
    UpdatePasswordAndRole(id:any, val:any):Observable<any>{
      return this.http.post(`${APIUrl}/users/tomodify/${id}`, val);
    }

    //Update Role of user
    updateUserRole(id:any, val:any):Observable<any>{
      return this.http.post(APIUrl+"/user/gettoupdate/"+id, val);
    }
}
