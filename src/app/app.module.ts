import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { APP_ROUTING } from './app-routing.module';

import { AppRoutingModule } from './app-routing.module';
import { AgencyComponent } from './agency/agency.component';
import { CreateAgencyComponent } from './create-agency/create-agency.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { SharedService } from './shared.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ContactComponent } from './contact/contact.component';
import { CustomersComponent } from './customers/customers.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CreatContactComponent } from './creat-contact/creat-contact.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { ViewticketComponent } from './tickets/viewticket/viewticket.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { ViewComponent } from './contact/view/view.component';
import { ViewcustomerComponent } from './customers/view/viewcustomer.component'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditcustomerComponent } from './customers/edit/editcustomer.component';
import { MassiveticketsComponent } from './tickets/massivetickets/massivetickets.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewagencyComponent } from './agency/viewagency/viewagency.component';
import { LoginComponent } from './login/login.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ViewwarehouseComponent } from './warehouse/viewwarehouse/viewwarehouse.component';
import { RegisteritemComponent } from './warehouse/registeritem/registeritem.component';
import { EdititemComponent } from './warehouse/edititem/edititem.component';
import { PeragencyComponent } from './warehouse/peragency/peragency.component';
import { DdtpdfComponent } from './tickets/ddtpdf/ddtpdf.component';
import { ViewitemsetComponent } from './warehouse/viewitemset/viewitemset.component';
import { ViewtickettechComponent } from './tickets/viewtickettech/viewtickettech.component';
//import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { MY_DATE_FORMAT } from '././tickets/viewticket/my_date_format';
import { FilterwarehousePipe } from './pipes/filterwarehouse.pipe';
import { TickettoworkComponent } from './tickets/viewtickettech/tickettowork/tickettowork.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroUserComponent } from './registro-user/registro-user.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

//import { NgxSpinnerModule } from "ngx-spinner";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    AgencyComponent,
    CreateAgencyComponent,
    ContactComponent,
    CustomersComponent,
    TicketsComponent,
    NavbarComponent,
    CreatContactComponent,
    CreateTicketComponent,
    CreateCustomerComponent,
    HomeComponent,
    ViewticketComponent,
    ViewComponent,
    ViewcustomerComponent,
    EditcustomerComponent,
    MassiveticketsComponent,
    ViewagencyComponent,
    LoginComponent,
    WarehouseComponent,
    ViewwarehouseComponent,
    RegisteritemComponent,
    EdititemComponent,
    PeragencyComponent,
    DdtpdfComponent,
    ViewitemsetComponent,
    ViewtickettechComponent,
    FilterwarehousePipe,
    TickettoworkComponent,
    RegistroComponent,
    RegistroUserComponent,
    AdminpanelComponent,
  ],
  entryComponents: [MassiveticketsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    //NgxSpinnerModule,
    APP_ROUTING,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [SharedService,
    {    provide: MAT_DATE_FORMATS, useValue:MY_DATE_FORMAT  }],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
