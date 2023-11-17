import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title:string="Cloud Contacts";
  menuItems: MenuItem[]  | undefined;
  userProfile: MenuItem[]  | undefined;
  

  constructor() { }
 
  ngOnInit() {
    this.userProfile = [
      {
        label: 'Log out',
        icon: PrimeIcons.SIGN_OUT
      }]
    this.menuItems = [
      {
        label: 'Create contact',
        icon: PrimeIcons.USER_PLUS,
        routerLink: ['/dashboard/new-contact']
      },
      {
        label: 'Contacts',
        icon: PrimeIcons.USERS,
        routerLink: ['/dashboard/contacts']
      },
      {
        label: 'Frequents',
        icon: 'pi pi-shopping-cart',
        routerLink: ['/products']
      },
      {
        label: 'Other Contacts',
        icon: 'pi pi-info',
        routerLink: ['/about']
      },
  
    ];
  }

}
