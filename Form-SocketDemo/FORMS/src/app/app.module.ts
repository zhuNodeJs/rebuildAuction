import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModelComponent } from './forms-model/forms-model.component';
import { FormsReactComponent } from './forms-react/forms-react.component';
import { LoginComponent } from './login/login.component';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { HttpComponent } from './http/http.component';
import { WebsocketService } from './shared/websocket.service';
import { WebsocketComponent } from './websocket/websocket.component';


@NgModule({
  declarations: [
    AppComponent,
    FormsModelComponent,
    FormsReactComponent,
    LoginComponent,
    MobileValidatorDirective,
    EqualValidatorDirective,
    HttpComponent,
    WebsocketComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
