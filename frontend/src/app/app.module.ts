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
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { RegistrationComponent } from './registration/registration.component';
import { TrashDirectoryComponent } from './Tables/trash-directory/trash-directory.component';
import { ViewContactComponent } from './contact/view-contact/view-contact.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ContactsDirectoryComponent,
    CreateContactComponent,
    TrashDirectoryComponent,
    RegistrationComponent,
    ViewContactComponent,
    EditContactComponent
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
