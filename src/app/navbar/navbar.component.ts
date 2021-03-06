import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { from, Observable } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { Console } from 'console';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  text: string = '';
  imagen: any;

  langs: string[] = [];
  language = '';

  xRoleA: boolean = false;
  xRoleC: boolean = false; 
  xRoleE: boolean = false;
  xRoleT: boolean = false;
  nombre: any;
  zRoleA: any;
  zRoleC: any;
  zRoleE: any;
  zRoleT: any;
  logueado: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog:MatDialog,
              private auth: AuthService, private router: Router,
              public usersService: UsersService,
              private translate: TranslateService) {
  
                this.langs = this.translate.getLangs();

                if(localStorage.getItem('logueado')) {
                  this.logueado = localStorage.getItem('logueado'); 
                }


                if(localStorage.getItem('zRoleA')) {
                  this.zRoleA = localStorage.getItem('zRoleA'); 
                  localStorage.setItem(this.zRoleA,'Admin');
                }

                if(localStorage.getItem('zRoleC')) {
                  this.zRoleC = localStorage.getItem('zRoleC'); 
                }

                if(localStorage.getItem('zRoleE')) {
                  this.zRoleE = localStorage.getItem('zRoleE'); 
                }

                if(localStorage.getItem('zRoleT')) {
                  this.zRoleT = localStorage.getItem('zRoleT'); 
                }

                if(localStorage.getItem('nombre')) {
                  this.nombre = localStorage.getItem('nombre'); 
                }

                this.usersService.getObservable().subscribe((data) => {
                  console.log('Data received right now: ', data);
                  this.nombre = data.nombre;
                  localStorage.setItem('nombre', this.nombre);
                  if(data.RoleA == '1') {
                    
                    this.zRoleA = 'Admin';
                    localStorage.setItem('zRoleA', this.zRoleA);
                  } 
                   if(data.RoleC == '1') {
                    this.zRoleC = 'Customer';
                    localStorage.setItem('zRoleC', this.zRoleC);
                  }
                  if(data.RoleE == '1') {
                    this.zRoleE = 'Warehouse';
                    localStorage.setItem('zRoleE', this.zRoleE);
                  }
                  if(data.RoleT == '1'){
                    this.zRoleT = 'Technician';
                    localStorage.setItem('zRoleT', this.zRoleT);
                  }
                  window.location.reload();
                });
              }

ngOnInit(): void {
    if (localStorage.getItem('zRoleA') == 'Admin') {
      this.xRoleA = true;
      this.xRoleC = false;
      this.xRoleE = false;
      this.xRoleT = false;
    } else {
      this.xRoleA = false;
    }
    if (localStorage.getItem('zRoleC') == 'Customer') {
      this.xRoleA = false;
      this.xRoleC = true;
      this.xRoleE = false;
      this.xRoleT = false;
    } else {
      this.xRoleC = false;
    }
    if (localStorage.getItem('zRoleE') == 'Warehouse') {
      this.xRoleA = false;
      this.xRoleC = false;
      this.xRoleE = true;
      this.xRoleT = false;
    } else {
      this.xRoleE = false;
    }
    if (localStorage.getItem('zRoleT') == 'Technician') {
      this.xRoleA = false;
      this.xRoleC = false;
      this.xRoleE = false;
      this.xRoleT = true;
    } else {
      this.xRoleT = false;
    }
 /*  console.log("Inicio de Nav");
  this.usersService.getObservable().subscribe(res => {
    console.log('Data received right now: ', res);
  }); */
  
}

  changeLang(lang: string) {
    this.translate.use(lang);
    if(lang == 'it') {
      this.imagen = '../assets/img/italy.png';
    } else {
      this.imagen = '../assets/img/uk.png';
    }
  }
  
  setLanguage(){
    if (this.language == 'english'){
      this.language = 'italian';
      this.translate.use('it');
    } else {
      this.language = 'english';
      this.translate.use('en');
    }
  }

  salir() {
    this.xRoleA = false;
    this.xRoleC = false;
    this.xRoleE = false;
    this.xRoleT = false;
    this.nombre = '';
    this.zRoleA = '';
    this.zRoleC = '';
    this.zRoleE = '';
    this.zRoleT = '';
    this.logueado = 'no';
    localStorage.setItem('logueado', this.logueado);
    localStorage.setItem('zRoleT', this.zRoleT);
    localStorage.setItem('zRoleC', this.zRoleC);
    localStorage.setItem('zRoleE', this.zRoleE);
    localStorage.setItem('zRoleA', this.zRoleA);
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  
  openDialogSettingsBox(){
    this.dialog.open(Settings,{width: '280px'});
  }

}

@Component({
  selector: 'settings-nemesis',
  template:`
  <h1>Settings Box</h1>
  <table>
    <tr>
      <td colspan="1">Dark Mode</td>
      <td>&nbsp;</td>
      <td colspan="1">Language</td>
    </tr>
    <tr>
      <td><button>Activate</button></td>
      <td>&nbsp;</td>
      <td>
        <select>
          <option>option lenguage</option>
        </select>
    </td>
    </tr>
  </table>
  `,
})
export class Settings {

}
