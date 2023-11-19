import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './Services/guard.service';
import { LoginComponent } from './login/login.component';
import { ContactsDirectoryComponent } from './Tables/contacts-directory/contacts-directory.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [GuardService], 
 
  },
  { path: 'contacts', component: ContactsDirectoryComponent,canActivate:[GuardService] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
