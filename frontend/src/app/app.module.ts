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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
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
    MessageModule
  
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
