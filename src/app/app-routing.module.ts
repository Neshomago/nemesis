import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAgencyComponent } from './create-agency/create-agency.component';
import { AgencyComponent } from './agency/agency.component';
import { CustomersComponent } from './customers/customers.component';
import { ContactComponent } from './contact/contact.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ViewticketComponent } from './tickets/viewticket/viewticket.component';
import { CreatContactComponent } from './creat-contact/creat-contact.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { HomeComponent } from './home/home.component';
import { ViewcustomerComponent } from './customers/view/viewcustomer.component';
import { EditcustomerComponent } from './customers/edit/editcustomer.component';
import { ViewagencyComponent } from './agency/viewagency/viewagency.component';
import { ViewComponent } from './contact/view/view.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RegisteritemComponent } from './warehouse/registeritem/registeritem.component';
import { EdititemComponent } from './warehouse/edititem/edititem.component';
import { ViewwarehouseComponent } from './warehouse/viewwarehouse/viewwarehouse.component';
import { DdtpdfComponent } from './tickets/ddtpdf/ddtpdf.component';
import { ViewitemsetComponent } from './warehouse/viewitemset/viewitemset.component';
import { ViewtickettechComponent } from './tickets/viewtickettech/viewtickettech.component';
import { TickettoworkComponent } from './tickets/viewtickettech/tickettowork/tickettowork.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RegistroUserComponent } from './registro-user/registro-user.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdditemComponent } from './warehouse/additem/additem.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'main', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'agency', children:[
    {path: '', component:AgencyComponent, canActivate:[AuthGuard]},
    {path: 'viewagency/:id',component:ViewagencyComponent},
  ]},
  { path: 'customers', children:[
    { path: '', component:CustomersComponent, canActivate:[AuthGuard]},
    { path: 'viewcustomer/:id', component:ViewcustomerComponent},
  ]},
  { path: 'contact',children:[
    {path: '',component:ContactComponent, canActivate:[AuthGuard]},
    {path: 'viewcontact/:id', component:ViewComponent},

  ]},
  { path: 'tickets', children: [
    { path: '', component:TicketsComponent, canActivate:[AuthGuard]},
    { path: 'viewticket/:id', component:ViewticketComponent},
    { path: 'ddtpdf',component:DdtpdfComponent}
  ]},
  { path: 'warehouse', children: [
    { path: '',component:WarehouseComponent, canActivate:[AuthGuard]},
    { path: 'viewitem/:id', component:ViewwarehouseComponent},
    { path: 'viewitemset/:id', children:[
      { path:'', component:ViewitemsetComponent},
      { path: 'edit-item/:id', component:EdititemComponent},
    ]}
  ]},
  { path: 'create-item', component:RegisteritemComponent },
  { path: 'add-item', component:AdditemComponent },
  { path: 'create-ticket', component:CreateTicketComponent },
  { path: 'create-agency', component:CreateAgencyComponent },
  { path: 'create-contact', component:CreatContactComponent },
  { path: 'create-customer', component:CreateCustomerComponent },
  { path: 'edit-customer/:id', component: EditcustomerComponent },
  { path: 'registro', component:RegistroComponent },
  { path: 'login', component:LoginComponent },
  { path: 'registro-user', component:RegistroUserComponent },
  { path:'viewtickettech', children:[
    { path:'', component: ViewtickettechComponent},
    { path:'tickettowork/:id', component: TickettoworkComponent}
  ]},
  {path:'adminpanel', component:AdminpanelComponent, canActivate:[AuthGuard]},
];

export const APP_ROUTING = RouterModule.forRoot(routes, { useHash: true })

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
