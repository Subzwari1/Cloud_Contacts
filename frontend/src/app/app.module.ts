import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MessageModule } from 'primeng/message';
import { ContactsDirectoryComponent } from './Tables/contacts-directory/contacts-directory.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
<<<<<<< HEAD
import { RegistrationComponent } from './registration/registration.component';
=======
import { TrashDirectoryComponent } from './Tables/trash-directory/trash-directory.component';
>>>>>>> 1515ba1df20f6db8f227353a052c189a162b6157
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ContactsDirectoryComponent,
    CreateContactComponent,
<<<<<<< HEAD
    RegistrationComponent
=======
    TrashDirectoryComponent
>>>>>>> 1515ba1df20f6db8f227353a052c189a162b6157
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    MenuModule,
    ToastModule,
    ButtonModule,
    TableModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    InputMaskModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
