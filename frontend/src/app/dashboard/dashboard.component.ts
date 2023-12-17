import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title:string="Cloud Contacts";
  menuItems: MenuItem[]  | undefined;
  userProfile: MenuItem[]  | undefined;
  

  constructor(private auth:AuthService) { }
  logOut()
   {
     this.auth.logout();
   }
  ngOnInit() {
    this.userProfile = [
      {
        label: 'Log out',
        icon: PrimeIcons.SIGN_OUT
      },
      {
        label: `Username: ${this.auth.getUserName()} `,
        icon: PrimeIcons.USER
      }
    ]
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
        label: 'Trash',
        icon: PrimeIcons.TRASH,
        routerLink: ['/dashboard/trash']
      },
      {
        label: 'Add to whatsapp',
        icon: PrimeIcons.WHATSAPP,
        routerLink: ['/dashboard/whatsapp']
      },
  
    ];
  }

}
