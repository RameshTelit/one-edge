import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../../message.service';
import {HttpParams } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data={};
  alertMessage="";
  constructor(private authService: AuthService, private router:Router, private msgService: MessageService) { }
  model = {"username":"","password":""};
  ngOnInit() {
	  if(localStorage.sessionId!="" && typeof(localStorage.sessionId)!="undefined"){
		  this.authService.logout().subscribe((data)=>{
			  localStorage.removeItem("sessionId");
		  });
	  }
  }
  login(){
	  this.alertMessage = "";
	  const modelParam = new HttpParams()
	  .set("username", this.model.username)
	  .set("password", this.model.password);
     this.authService.userLogin(modelParam).subscribe((data) =>{
		 if(data.status=="1"){
			 localStorage.sessionId = data.sessionId;
			 this.router.navigate([''])
		 }else{
			 if(typeof(data.message)!=="undefined"){
				this.alertMessage = data.message; 
			 }else{
				 this.alertMessage = this.msgService.messages.toString();
			 }
			 
		 }
	 });
  }  
}
