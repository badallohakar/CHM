import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  constructor(private routes:Router,private servicei:EmployeeDataServiceService) { }
  loginstatus:string;
  ngOnInit() {
    this.setflagvalue();
    console.log("login-flag"+this.servicei.getFlagValue());
  }
  setflagvalue() {
    this.servicei.setFlagValue()
  }

  logintome(uid:string,pass:string){
      if(uid == "admin123" && pass == "admin123"){
        this.loginstatus = "Wait Login .."
          if(this.servicei.setLoginCredentials()){
            this.routes.navigate(['/sidebar']);
          }else{
            this.loginstatus = "Please Enter Valid Inputs ...."
          }

         
      }else{
        this.loginstatus = "Please Enter Valid Inputs ...."
      }
  }

}
