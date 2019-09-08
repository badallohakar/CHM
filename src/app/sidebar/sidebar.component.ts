import { Component, OnInit } from '@angular/core';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, NgForm, Validators} from '@angular/forms';
import { empty, from } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  addEmployee:FormGroup;
  name:string;
  salary:string;
  namestatus = "";
  agestatus = "";
  salarystatus = "";
  constructor(private employeeService:EmployeeDataServiceService,private routes:Router,private formbuilder:FormBuilder) { 

    this.addEmployee = formbuilder.group({
      name:['',Validators.required],
      age:['',Validators.required],
      salary:['',Validators.required]
    });

  }
  createresponse:any = new Array();
  
  ngOnInit() {
      this.checklogincreadintial();
  }
  checklogincreadintial() {
    if(this.employeeService.getFlagValue()){
        console.log(this.employeeService.getFlagValue());
    }else{
        this.routes.navigate(['/login']);
    }
  }

  postData(addEmployee:NgForm){
    
    this.employeeService.addMyEmployee(addEmployee).subscribe((response)=>{
      this.createresponse.push(response);
      if(this.createresponse[0]["id"] != 0){
          alert("Succesfully Add..");
          addEmployee.reset();
          this.routes.navigate(['/sidebar']);
      }else{
        alert("Failed to Add Employee..");
      }
      
  });
  }

  resetformd(){
    this.addEmployee.reset();
  }
  FaddEmployee(name:string,age:number,salary:number){
    console.log("add click"+name+age+salary); 
  }
  

}
