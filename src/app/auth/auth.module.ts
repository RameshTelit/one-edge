import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule,
    NgbModule
  ],
})
export class AuthModule { }
