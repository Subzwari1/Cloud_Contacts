import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsDirectoryComponent } from './Tables/contacts-directory/contacts-directory.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './Services/guard.service';
import { CreateContactComponent } from './create-contact/create-contact.component';
<<<<<<< HEAD
import { RegistrationComponent } from './registration/registration.component';
=======
import { TrashDirectoryComponent } from './Tables/trash-directory/trash-directory.component';
>>>>>>> 1515ba1df20f6db8f227353a052c189a162b6157

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [GuardService], 
    children: [
      { path: 'contacts', component: ContactsDirectoryComponent,canActivate: [GuardService] },
      { path: 'new-contact', component: CreateContactComponent,canActivate: [GuardService] },
      { path: 'trash', component: TrashDirectoryComponent,canActivate: [GuardService] }
    ]
  },
  { path: 'login', component: LoginComponent },
 { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },// Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
