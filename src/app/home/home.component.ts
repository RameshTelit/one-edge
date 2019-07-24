import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
	  if(localStorage.sessionId=="" || typeof(localStorage.sessionId)=="undefined"){
		  this.router.navigate(['login'])
	  }else{
		  this.authService.authenticate().subscribe((data)=>{
			  if(data.status!="1" || typeof(data.status)=="undefined"){
				  this.router.navigate(['login'])
			  }
		  });
	  }
  }

}
