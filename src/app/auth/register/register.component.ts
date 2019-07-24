import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {HttpParams } from '@angular/common/http';
import { MessageService } from '../../message.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private msgService: MessageService) { }
  model = {"name":"", "username":"","password":""};
  ngOnInit() {
  }
  alertMessage="";
  alertErrMessage="";
  register(form: NgForm){
	  this.alertMessage = "";
	  const modelParam = new HttpParams()
	  .set("name", this.model.username)
	  .set("username", this.model.username)
	  .set("password", this.model.password);
     this.authService.register(modelParam).subscribe((data) =>{
		 this.alertMessage = "";
		 this.alertErrMessage = "";
		 if(data.status=="1"){
			 form.reset();
			 this.alertMessage = data.message;
		 }else{
			 if(typeof(data.message)!=="undefined"){
				this.alertErrMessage = data.message; 
			 }else{
				 this.alertErrMessage = this.msgService.messages.toString();
			 }
		 }
	 });
  } 
}
