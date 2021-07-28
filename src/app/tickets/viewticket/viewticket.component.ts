import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from 'src/app/interfaces/equipmentadditional.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';

/* PDF IMPORTING TO SAVE*/
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewChild } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { exit } from 'process';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { promise } from 'protractor';


@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss'],
  providers: [DatePipe]
})


export class ViewticketComponent implements OnInit {

  publicIp = "http://217.133.14.152:5000";
  id: number | undefined;
  showEdit1 = false;
  showEdit2 = false;
  showEdit3 = false;
  showEdit4 = false;
  
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  
  allestimento!: FormGroup;

  theTicketData : any;
  newtags: any = [];
  TechnicianList: any = [];
  unserialTags: any = [];
  warehouseData:any = [];
  tagsarray: any = [];
  equipment = new Equipment();
  allestimentoEdit: Boolean = true;
  viewAllestimento: Boolean = true;
  equipmentArrayData: any = [];
  ticketVersion ={ version: 1, status: ''};

  nombre: any;
  zRoleA: any;
  zRoleC: any;
  zRoleE: any;
  zRoleT: any;
  iniciales:any;
  surname: any;
  userId: any;

  //currentTicket = null;
  currentIndex = -1;
  //ticketinView: any;

  theTicketUpdate: any = {
    agencyId: '',
    code: '',
    priority:'',
    description:'',
    type:''
  };

  agencyToUpdate: any = {
    name:'',
    certification:'',
    address:'',
    phone:'',
    email:'',
    managerId:''
  };

  tickStatus ={ status:'ABORTED'};
  customerId = localStorage.getItem('customerId');
  AgencyList: any = [];
  FilteredAgency: any = [];

  techDate = new Date();
  TechnicianModel: any = {
    tech_assign: '',
    assignedDate: '',
    fechaPrueba:new Date(),
    version: 5,
  }

  newtechdate = new Date();
  technicianToUpdate:any ={
    tech_assign:'',
    assignedDate:'',
    fechaPrueba:new Date(),
    version: 5,
  }

  itemsToConfirm:any = [];

  constructor(private service:TicketService, private usersService: UsersService,
    private whservice:WarehouseService, private route:ActivatedRoute,
    private router: Router, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
      if(localStorage.getItem('zRoleA')) { this.zRoleA = localStorage.getItem('zRoleA'); }

      if(localStorage.getItem('zRoleC')) { this.zRoleC = localStorage.getItem('zRoleC'); }

      if(localStorage.getItem('zRoleE')) { this.zRoleE = localStorage.getItem('zRoleE'); }
      
      if(localStorage.getItem('zRoleT')) { this.zRoleT = localStorage.getItem('zRoleT'); }
    
      if(localStorage.getItem('nombre')) { this.nombre = localStorage.getItem('nombre'); }
    
      if(localStorage.getItem('surname')) { this.surname = localStorage.getItem('surname'); }

      if(localStorage.getItem('id')) { this.userId = localStorage.getItem('id'); }
     }
    
    public ngOnInit(): void {
      const ticketId = this.route.snapshot.paramMap.get('id');
      this.getAgencyListName();
      this.getUnserializedItems(ticketId);
      // initialize the current ticket ID
      this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
      
      //Load from database all the fields required according to each step
      this.Technicians_List();
      this.getTags();
      this.allestimentoTicketList(ticketId);
      this.getWarehouseStock();
      this.getWarehouses();
      this.setDefaultDate();
      this.getCategoryList();
      this.getTechnicianReviewItems(ticketId);
      this.GetItemsToConfirmTicket(ticketId);

    //formgroup for steps
    this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
 
  // AgencyList: any = [];
  getAgencyListName(){
    let customer:any = this.customerId;
    this.service.getAgencyName(customer).subscribe(
      agency => { this.AgencyList = agency; });
  }

  warehouses:any=[];
  getWarehouses(){
  this.whservice.getWarehouseList().subscribe(
    data => { this.warehouses = data; });
  }

  // Getting General Ticket Information

  getTicketIndividual(id:any):any{
    this.service.getTicketIso(id).subscribe(
      (data)=> {
      this.theTicketData = data[0];
      this.theTicketUpdate.agencyId = data[0].agencyId;
      this.theTicketUpdate.code = data[0].code;
      this.theTicketUpdate.type = data[0].type;
      this.theTicketUpdate.description = data[0].description;
      this.theTicketUpdate.priority = data[0].priority;
      this.technicianToUpdate.tech_assign = data[0].tech_assign;
      let datePrueba = new Date(data[0].assignedDate);
      let fechastring = (datePrueba.getMonth()+1)
      +'/'+datePrueba.getDate()
      +'/'+datePrueba.getFullYear();

      this.technicianToUpdate.fechaPrueba = new Date(fechastring);
      
      let agenciaSelected:any = this.AgencyList.find((a:any) => a.id === parseInt(this.theTicketUpdate.agencyId, 10));
      this.agencyToUpdate.name = agenciaSelected.name;
    },
    error =>{console.log(error);
    });
  }

  // newtags: any = [];
  getTags(){
    /**
     * Linea antes del cambio de metodo para traer items de bodega y no de tags
     *this.service.getTagList().subscribe(
     /* 
     */
    //Lìnea con el nuevo metodo para pedir equipment segun version y version de ticket.
    this.service.checkItemsforEquipmentfromWarehouse().subscribe(
      data => { this.newtags = data;
      console.log("tags: ", this.newtags)});
  }
  
  // TechnicianList: any = [];
  Technicians_List(){
    this.usersService.getTechnicianList().subscribe(
      data => { this.TechnicianList = data; });
  }

  setDefaultDate(){
    let year, month, day, hour, minute, second;

    year = this.techDate.getFullYear();
    month = this.techDate.getMonth()+1;
    day = this.techDate.getDate();
    hour = this.techDate.getHours();
    minute = this.techDate.getMinutes();
    second = this.techDate.getSeconds();

    this.TechnicianModel.assignedDate = year+'-'+month+'-'+day+' '+'0'+hour+':'+'0'+minute+':'+'0'+second;
    console.warn('prueba date format: ',this.TechnicianModel.assignedDate);
  }

  setDateUpdate(){
    let upyear, upmonth, upday, uphour, upminute, upsecond;

    upyear = this.newtechdate.getFullYear();
    upmonth = this.newtechdate.getMonth()+1;
    upday = this.newtechdate.getDate();
    uphour = this.newtechdate.getHours();
    upminute = this.newtechdate.getMinutes();
    upsecond = this.newtechdate.getSeconds();

    this.technicianToUpdate.assignedDate = upyear+'-'+upmonth+'-'+upday+' '+'0'+uphour+':'+'0'+upminute+':'+'0'+upsecond;
    console.warn('prueba date format: ',this.technicianToUpdate.assignedDate);
  }

  technicianAssignedtoTicket(id:any){
    this.setDefaultDate();
    console.log("TechDate para insertar: ", this.techDate);
  this.service.assign_technician(id,this.TechnicianModel).subscribe(
    (data) => { 
      this.TechnicianModel = data;
      this._snackBar.open("Technician Assigned Succesfully", "OK", { duration:3500, panelClass: "success",});
      console.log('data del tecnico: ', this.TechnicianModel);
    });
}

  // Unserialized Items methods
  // unserialTags: any = [];
  conteoItemsporserializar:number = 0;
  getUnserializedItems(id:any){
    this.service.getTicketEquipmentList(id).subscribe(
      (tag) => { this.unserialTags = tag;
        this.conteoItemsporserializar = this.unserialTags.length;
        console.log("datos a serializar: ",this.unserialTags.length + " Total items: " + this.conteoItemsporserializar);
      });
  }

  // warehouseData:any = [];
  getWarehouseStock(){
    this.service.getWarehouseNameQuantity().subscribe(
      data => { this.warehouseData = data}
      );
    }

  saveSerials(){
    let i= 0;

    this.unserialTags.forEach((element: any) => {
        this.service.saveSerialsOfItems(element.id, element).subscribe(
          (data) => { 
            console.log('Equipment added', data);
          this._snackBar.open("Equipment Serialized Succesfully", "OK", {
            duration:3500, panelClass: "success",});
          if (this.unserialTags.length == (i+1)){

            this.allestimentoTicketList(element.ticketId);
          }
          i++;
        },
        (error) => { console.log('Failed to add equipment', error);
        this._snackBar.open("Failed to Serialize equipment", "OK", {
          duration:3500, panelClass: "error",}); },
        )
        console.warn(element);  
      });
  }
  
  addItem(id:any){//método para añadir item en el viewticket.html de Additional Equipment
    const equipment = {
      item: '',
      serial:'',
      quantity: 1,
      ticketId: id,
    };
    this.tagsarray.push(equipment);
    console.log(this.tagsarray);
  }

  saveEquipment(){
    let datosGrabar:any[] =[];
    let i=0;
    let producto:any= [];

    this.tagsarray.forEach((element: any) => {
      let item = {item: element.item};
      let quantityPerItem = element.quantity;

        this.service.serialVerification(item).subscribe(
          res => {
            if (res.length == 0){
              alert('Item no disponible');
            }
  
            if (quantityPerItem > res.length){
              alert('Stock no disponible Solo hay '+ res.length +' en existencia.');
            }

            let contador = 0;
  
            res.forEach((data:any) => {
              if (contador == quantityPerItem){
                return false;
              } else {
                producto = {
                  id: data['id'],
                  item: data['name'],
                  quantity: 1,
                  ticketId:element.ticketId,
                  serial:data['serial']
                }
                let itemId = producto.id;

                let grabar:any = {
                  version: 1,
                  legacyId: element.ticketId
                }

                this.service.updateItemEquipmentVersion(itemId, grabar).subscribe(
                  update => {
                    console.log("data a grabar: ", update);
                  });

                  let toEquipment = {
                    item: producto.item,
                    item_serial: producto.serial,
                    quantity: 1,
                    ticketId: producto.ticketId,
                  }
                this.service.addequipment(toEquipment).subscribe(
                  (data) => {
                    console.log('Equipment added', data);
                    this._snackBar.open("Equipment added Succesfully", "OK", {
                      duration: 3500,
                      panelClass: "success",
                    });

                    if (this.tagsarray.length == (i + 1)) {
                      this.allestimentoTicketList(producto.ticketId);
                    }
                    i++;
                  },
                  (error) => {
                    console.log('Failed to add equipment', error);
                    this._snackBar.open("Failed to add equipment", "OK", {
                      duration: 3500,
                      panelClass: "error",
                    });
                  },
                );

                console.log("grabando item: ", producto);
              }
              contador += 1;
            });  
            datosGrabar.push(producto);
            producto=[];

          });
        
      });
     
    this.tagsarray = [];

  }

  updateEquipment(){
    let i=0;
    
    
    this.equipmentArrayData.forEach((element: any) => {
      
      /* let item = {
        item: element.item
      };
      let quantityPerItem = element.quantity;

      this.service.serialVerification(item).subscribe(
          res => {
            if (res.length == 0) {
              alert('Item no disponible');
            }

            if (quantityPerItem > res.length) {
              alert('Stock no disponible Solo hay ' + res.length + ' en existencia.');
            }*/

            let grabar: any = {
              version: 1,
              legacyId: element.ticketId
            }

            this.service.updateItemEquipmentVersion(element.id, grabar).subscribe(
              update => {
                console.log("data a grabar: ", update);
              }); 


      this.service.updateEquipment(element.id, element).subscribe(
        (data) => { 
          this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
          if (this.equipmentArrayData.length == (i+1))
          {
            this.allestimentoTicketList(element.ticketId);
          }
          i++;
        },
        (error) => {
          console.log('Failed to add equipment', error);
          this._snackBar.open("Failed to add equipment", "OK", { duration:3500, panelClass: "error",}); },
        
        );
      //console.warn(element);  
    });
    this.showEdit2 = false;
    this.saveEquipment();
  }

  refreshPage() {
    this.tagsarray = [];
    setTimeout(
      function(){window.location.reload()}, 800)
  }

  // equipmentArrayData: any = [];
  allestimentoTicketList(ticketId: any){
    console.log("ticket de consulta: ",ticketId);
    this.service.getTicketEquipmentList(ticketId).subscribe(
      data => {this.equipmentArrayData = data;
      console.log("Elementos equipment ya guardados: ", this.equipmentArrayData);
    });
  }

  // Updating Ticket Version on each step
  // ticketVersion = { version: null, status: ''};
  updateTicketStatus2(id: any){
    const version = {
      version: 2,
      status: 'MANAGING',
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 2;
        this.theTicketData.status = 'MANAGING';
        this._snackBar.open("Ticket has been updated. Continue in step 3.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been updated. Continue in step 3', data);}
    );
  }

  updateTicketStatus3(id: any){
    const version = {
      version: 3,
      status: 'MANAGING',
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 3;
        this._snackBar.open("Ticket has been updated. Proceedo to serialize.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been taken in charge. Status updated', data)    }
    );
  }

  updateTicketStatus4(id: any){
    const version = {
      version: 4,
      status: 'WORKING',
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 4;
        this._snackBar.open("Ticket is now in Working status.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket is now been worked. Status updated', data)    }
    );
  }

  infoTechReview:any=[];
  getTechnicianReviewItems(id:any){
    this.whservice.GetItemAgencyReview(id).subscribe(
      data => {this.infoTechReview = data}
    );
  }

  confirmResolved(id: any){
    const version = {
      version: 8,
      status:'RESOLVED',
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 8;
        this._snackBar.open("Ticket is now Resolved and Confirmed by Admin.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket is now been closed. Status updated', data)    }
    );
    this.refreshPage();
  }

  GetItemsToConfirmTicket(legacyId:any){
    this.whservice.GetItemsToConfirmTicket(legacyId).subscribe(
      info => {this.itemsToConfirm = info;
      console.log("items para confirmar: ", info);}
    )
  }

  closeTicketItem(){
    this.itemsToConfirm.forEach((element:any) => {
      let itemLocation:any ={
       id: element.id,
       item: element.name,
       item_serial: element.serial,
       version:2,
       legacyId: element.legacyId,
       location: element.location,
       locationId: element.locationId,
       partOf:'',
       slot:'',
       statusDescription: 'Complete move. Item '+ element.name +' is in '+ element.location + ' - ' + element.locationId
      }
      console.warn("Item a grabar data model: ", itemLocation);

      let finalCheckResolved:any = {
        id:itemLocation.id,
        version:itemLocation.version,
        legacyId:element.legacyId,
        partOf:'',
        slot:''
      };
      console.log(finalCheckResolved);

      this.whservice.closeTicketAdmin(element.id, finalCheckResolved).subscribe(
        (check) => {
          finalCheckResolved = check;
          console.log("datos grabados en update de item: ", location);
        }
      );

      let trackingItem:any = {
        itemId:element.serial,
        userId:this.technicianToUpdate.tech_assign,
        change:itemLocation.statusDescription,
        type:'Ticket Close',
        descriptionTrack:'Item moved to destination by technician',
        rawData:'',
      }
      this.whservice.trackingItem(trackingItem).subscribe(
        (track) => {
          trackingItem.rawData = String(JSON.stringify(trackingItem));
          console.log(track+". Data a grabar Tracking Info: ", trackingItem);
        },
        error => {console.log(error)}
        );

        // let resultadoAg:any;
        // let warehouseName:any = this.warehouses.find( (identificadorw:any) => identificadorw.id == this.trackingDataChanges.warehouse );
        // if (this.trackingDataChanges.location === 'AGENCY'){
        //   resultadoAg = this.AgencyList.find( (identificador:any) => identificador.id == this.trackingDataChanges.locationId );
        // } else if (this.trackingDataChanges.location === 'WAREHOUSE'){
        //   resultadoAg = this.warehouses.find( (identificador:any) => identificador.id == this.trackingDataChanges.locationId );
        // }
      });
      // this.refreshPage();
    // });
  }

  //Toggle Edition fields in Html view
  toogleEditstep1(){ this.showEdit1 = !this.showEdit1;}

  toogleEditstep2(){this.showEdit2 = !this.showEdit2;}

  toogleEditstep3(){this.showEdit3 = !this.showEdit3;}

  toogleEditstep4(){this.showEdit4 = !this.showEdit4;}

  removeItem(index:any){this.tagsarray.splice(index, 1); }

  removeItemList(index:any, id:any){
    this.equipmentArrayData.splice(index, 1);
    this.deleteOneItemEquipment(id);}

  //
  // theTicketUpdate: any = [];
  getTicketInfotoUpdate(id:any){
    this.service.getTickettoUpdate(id).subscribe(
      data => { this.theTicketUpdate = data;
      console.log("The Ticket Update: ", this.theTicketUpdate)}
    );
  }

  updateTicket(id:any){
    this.service.updateTicket(id, this.theTicketUpdate).subscribe(
      (data) => { 
        this.theTicketData.code = this.theTicketUpdate.code;
        this.theTicketData.type = this.theTicketUpdate.type;
        this.theTicketData.priority = this.theTicketUpdate.priority;
        this.theTicketData.description = this.theTicketUpdate.description;
        this.theTicketData.agencyId = this.theTicketUpdate.agencyId;
        this._snackBar.open(data, "OK", 
        { duration:3500, panelClass: "success",});
      });
      this.showEdit1 = false;
  }

  agencyListBindUpdate(){
    let agenciaSelected:any = this.AgencyList.find(
      (a:any) => a.id === parseInt(this.theTicketUpdate.agencyId, 10));
    this.theTicketData.managerId = agenciaSelected.managerId;
    this.theTicketData.address = agenciaSelected.address;
    this.theTicketData.certification = agenciaSelected.certification;
    this.theTicketData.name = agenciaSelected.name;
    this.theTicketData.phone = agenciaSelected.phone;
    this.theTicketData.email = agenciaSelected.email;
  }

  // tickStatus ={ status:'ABORTED'};
  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){
        this.service.deleteTicket(id, this.tickStatus).subscribe(
          (data) => { this.tickStatus = data;
            this._snackBar.open("Ticket Aborted Succesfully", "OK", { duration:3500, panelClass: "success",});
            this.router.navigateByUrl("/tickets");
          });
      }
  }

  deleteOneItemEquipment(id: number) {
    let grabar: any = {
      version: null,
      legacyId: null
    }

    this.service.updateItemEquipmentVersion(id, grabar).subscribe(
      update => {
        console.log("data a grabar: ", update);
      });

    this.service.deleteItemEquipment(id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateTechnician(id:any){
    // this.setDateUpdate();
    this.technicianToUpdate.assignedDate = 
    (
      (this.technicianToUpdate.fechaPrueba.getFullYear())+'-'+
      (this.technicianToUpdate.fechaPrueba.getMonth()+1)+'-'+
      (this.technicianToUpdate.fechaPrueba.getDate())
      +' '+'0'+(this.technicianToUpdate.fechaPrueba.getHours())+':'
      +'0'+(this.technicianToUpdate.fechaPrueba.getMinutes())+':'
      +'0'+(this.technicianToUpdate.fechaPrueba.getSeconds())
    );

    console.warn("prueba de fecha to updat: ",this.technicianToUpdate.fechaPrueba);
    this.service.assign_technician(id,this.technicianToUpdate).subscribe(
      (data) => { 
        // this.technicianToUpdate.data;
        this.theTicketData.tech_assign = this.technicianToUpdate.tech_assign;
        // this.theTicketData.assignedDate = this.technicianToUpdate.assignedDate;
        this._snackBar.open("Technician Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });
      this.refreshPage();
  }

  categoryList:any =[];
  getCategoryList(){
    this.whservice.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  }

  // serialComprobar:any ={
  //   item_serial: ''
  // }
  itemSerial: any =[]
  serialOk(serial:any){
    let checker = {
      nserial: ''
    }
    
    console.log("SERIALCHECK data enviada: ", serial);
    // console.log("SERIALCHECK data enviada propiedad: ", checker.serial);
    this.service.getSerialEquipmentCheck(serial).subscribe(
      data => { console.log("SERIALCHECK datos recibidos: ", data);
        this.itemSerial = data[0];
        this.itemSerial.seriales = data[0].seriales;
      console.log("SERIALCHECK data en variable: ", this.itemSerial.seriales);
  
      // if (this.itemSerial.length <= 0 ){
      //   this.itemSerial = checker;
      //   console.log("condicion en serialOk: ",this.itemSerial.nserial);
      // }
    });
  }

  filteredString: string = '';
  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.itemSerial.filter(
      (item:any) => item.serial.toLowerCase().indexOf(this.filteredString.toLowerCase()) !== -1);
        if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filteredResult = resp;
        return resp;
      } else (resp == "" || resp == null || resp == undefined || resp == []); {
        this.filteredResult = [];
      }
  }

  prueba(){
    //let stepsToRecord;
    let datosGrabar:any =[];
    let producto:any = {};
    this.tagsarray.forEach((element:any) => {
      console.log("elemetnno: ", element.quantity);
      let quantityPerItem = element.quantity;
      for(let i=0; i < quantityPerItem; i++){
        console.log("item ",i,": ");
        producto = {
          item: element.item,
          ticketId: element.ticketId
        }
        console.log(producto);
        datosGrabar.push(producto);
      }
    });
    console.log("pruebas: ", datosGrabar);
  }
  /** PDF creation DDT
   * npm install jspdf necessary to create PDFS from the data
   * **/
  @ViewChild('dataPdf')
  
  
  filename = "_tid_";

  ddtDownload(): void{
    const DATA = document.getElementById('dataPdf') as HTMLElement;
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4', true);
        let position = 5;
        PDF.internal.scaleFactor = 30;
        PDF.addImage(FILEURI, 'PNG',5,position,fileWidth-(fileWidth * 0.05), fileHeight-(fileHeight * 0.05));
        
        PDF.save('DDT_'+this.theTicketData.code+this.theTicketData.id+'.pdf');
    });     
  }

 rptDownload(): void{
    const DATA = document.getElementById('dataPdfReport') as HTMLElement;
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4', true);
        let position = 5;
        PDF.internal.scaleFactor = 30;
        PDF.addImage(FILEURI, 'PNG',5,position,fileWidth-(fileWidth * 0.05), fileHeight-(fileHeight * 0.05));
        
        PDF.save('RPT_'+this.theTicketData.code+this.theTicketData.id+'.pdf');
    });     
  }
  
}