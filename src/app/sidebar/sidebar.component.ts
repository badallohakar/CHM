import { Component, OnInit } from '@angular/core';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, NgForm, Validators} from '@angular/forms';
import { empty, from, ObjectUnsubscribedError } from 'rxjs';
import { interval } from 'rxjs';
import {Observable} from 'rxjs/Rx';
import { flatMap } from 'rxjs/operators';
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
  min:number = 1;
  sec:number = 0;
  logoutflag:boolean=false;
  constructor(private employeeService:EmployeeDataServiceService,private routes:Router,
    private formbuilder:FormBuilder) { 

    this.addEmployee = formbuilder.group({
      name:['',Validators.required],
      age:['',Validators.required],
      salary:['',Validators.required]
    });

     const secondsCounter = Observable.interval(1000*60).subscribe(n=>{
    //  console.log(this.min +=1);
      this.min +=1;
      if(this.cheklogoutornot()){
        secondsCounter.unsubscribe();
      }
    });
    
   
  }
  createresponse:any = new Array();
  cheklogoutornot() {
   if(this.logoutflag){
return true;
   }else{
return false;
   }
  }
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
  logoutme(){
    this.logoutflag = true;
    this.routes.navigate(['/login']);
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
       
    },err=>{
      this.imgup = true;
      this.fupload = false;
      this.addingStatusText = "Failed To Added .....";
      
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
