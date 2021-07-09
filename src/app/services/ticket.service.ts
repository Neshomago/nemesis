import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { debounceTime } from 'rxjs/internal/operators/debounceTime';

//const APIUrl = "http://192.168.1.65:8000";
//const APIUrl = "http://127.0.0.1:8000";
const APIUrl = "http://217.133.14.152:5000";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  constructor(private http:HttpClient) { }
  
  //Main ticket Info - Step 1 of the Ticket
  getTicket(id:any):Observable<any>{
    return this.http.get<any[]>(APIUrl+`/tickets/${id}`);
  }

  getTicketList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/tickets');
  }

  getTicketList_customer(customerId:any):Observable<any>{
    return this.http.get<any[]>(APIUrl + '/tickets/'+ customerId);
  }

  addTicket(val:any): Observable<any>{
    return this.http.post(APIUrl + '/ticket/add',val);
  }

  
  deleteTicket(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/abort/${id}`, val);
  }
  
  getAgencyName(customerId:string):Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agency/'+customerId);
  }
  
  getTicketIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/ticket/${id}`);
  }
  
  getTickettoUpdate(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/ticket2up/${id}`);
  }
  
  updateTicket(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/update/${id}`, val);
  }

  getTicketAgency(agencyid:any): Observable<any>{
    return this.http.get(`${APIUrl}/agencyid/${agencyid}`);
  }

  getAgencyList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agenciesperclient');
  }

  // getAgencyListClient():Observable<any>{
  //   return this.http.get<any[]>(APIUrl + '/agenciesperclient');
  // }

  getTagList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/tags');
  }

  addequipment(val: any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket-equip/`,val);
  }

  addequipmentTechnicianView(val: any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket-equip/techview/`,val);
  }

  updateEquipment(id:any,val:any):Observable<any>{
    return this.http.post(`${APIUrl}/ticket-equip/update/${id}`,val);
  }

  deleteItemEquipment(id:any):Observable<any>{
    return this.http.get(`${APIUrl}/ticket-equip/del/${id}`);
  }

  get_equipment(): Observable<any>{
    return this.http.get(APIUrl+'/ticket-equipment')
  }

  getTicketEquipmentList(ticketId:any): Observable<any>{
    return this.http.get<any>(`${APIUrl}/equipmentList/${ticketId}`);
  }

  getSerialEquipmentCheck(serial:any): Observable<any>{
    return this.http.get(`${APIUrl}/equipmentSerialCheck/`+serial);
  }

  updateTicketVersion(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticketv/${id}`,val);
  }

  updateTicketReject(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticketreject/${id}`,val);
  }

  updateTicketResolved(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticketresolved/${id}`,val);
  }

  //save image filenames intodatabase
  resolvedImages(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticketresolvedimg/${id}`,val);
  }

  saveSerialsOfItems(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket-serial/${id}`,val);
  }

  
  getWarehouseNameQuantity(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/ticketwarehouse`);
  }
  
  //Step 4 Assign Technician
  assign_technician(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/technicianassign/${id}`,val);
  }

  update_technician(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/technicianupdate/${id}`,val);
  }

  //ticketvalue
  ticketValues(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/ticket/value`);
  }

  // Ordering by date
  filterByDate(fechabusqueda:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/date`, fechabusqueda);
  }

  //New services for item version in allestimento.
    checkItemsforEquipmentfromWarehouse(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/warehouseitv`);
    }
  
    
    itemEquipmentLegacy(legacyId:any): Observable<any>{
      return this.http.get(`${APIUrl}/warehouseitvl/${legacyId}`);
    }
    
    updateItemEquipmentVersion(id:any, value:any): Observable<any>{
      return this.http.post(`${APIUrl}/warehouseitvu/${id}`,value);
    }
    
    //itemEquipmentVersion(id:any): Observable<any>{
    //  return this.http.get(`${APIUrl}/warehouseitv/${id}`);
    //}

    serialVerification(item:any): Observable<any>{
      return this.http.post(APIUrl+'/warehouseitvn',item);
    }
  }


// export class searchAgency{
//   constructor (private httpService: HttpClient) { }  

//     search(term:any) {
//         var listOfAgency = this.httpService.get(APIUrl+'/agency/'+ term)
//         .pipe(
//             debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
//             map(
//                 (data: any) => {
//                     return (
//                         data.length != 0 ? data as any[] : [{"Agency": "No Record Found"} as any]
//                     );
//                 }
//         ));

//         return listOfAgency;  
//     }  
// }