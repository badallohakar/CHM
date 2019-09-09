import { Component, OnInit } from '@angular/core';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, NgForm, Validators} from '@angular/forms';
import { empty, from } from 'rxjs';
import { interval } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  addEmployee:FormGroup;
  name:string;
  addingStatusText:string;
  salary:string;
  namestatus = "";
  agestatus = "";
  salarystatus = "";
  fupload:boolean=true;
  updation:boolean = false;
  imgup:boolean = true;
  timeLogined:any="0";
  sectime:any = "0";
  min:number = 0;
  sec:number = 0;
  
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
  
  ngOnDestroy(){
    
  }
  checklogincreadintial() {
    if(this.employeeService.getFlagValue()){
        console.log(this.employeeService.getFlagValue());
    }else{
        this.routes.navigate(['/login']);
    }
  }

  postData(addEmployee:NgForm){
    
      this.addingStatusText = "Please Wait Details Adding .....";
      this.imgup = false;
      this.updation = true;
      //console.log("add")
      this.employeeService.addMyEmployee(addEmployee).subscribe((response)=>{
        this.createresponse.push(response);
        if(this.createresponse[0]["id"] != 0){
            alert("Succesfully Add..");
            addEmployee.reset();
            this.addingStatusText = "Employee Details Added .....";
            this.imgup = true;
            this.fupload = false;
            this.routes.navigate(['/sidebar']);
        }else{
          alert("Failed to Add Employee..");
        }
       
    });
    
   
 
  }

  updateuvalue(){
    this.fupload = true;
    this.updation = false;
  }

  resetformd(){
    this.addEmployee.reset();
    this.imgup = true;
    this.fupload = false;
  }
  FaddEmployee(name:string,age:number,salary:number){
    console.log("add click"+name+age+salary); 
  }
  

}
