import { Component, OnInit } from '@angular/core';
import { UsersService} from 'src/app/services/users.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: UsersService, private fb:FormBuilder) { }

  Contact:any = [];
  customerId = localStorage.getItem('customerId');
  zRoleC = localStorage.getItem('RoleC');
  zRoleA = localStorage.getItem('RoleA');

  currentUser = null;
  currentIndex = -1;

  public FilterValue: any;
  filter = false;
  filteredString: string = '';

  ngOnInit(): void {
    this.refreshContactList();
  }

  refreshContactList(){
    this.contactService.getContactList().subscribe(
      data => {
        this.Contact = data
      }
    );
  }

  setCurrentUser(user:any, index:any): void{
    this.currentUser = user;
    this.currentIndex = index;
  }

  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.Contact.filter(
      (item:any) => item.name.toLowerCase().indexOf(this.filteredString.toLowerCase()) !== -1);
        if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filter = true;
        this.filteredResult = resp;
        return resp;
      } else (resp == "" || resp == null || resp == undefined || resp == []); {
        this.filter = false;
        this.filteredResult = [];
      }
  }

}