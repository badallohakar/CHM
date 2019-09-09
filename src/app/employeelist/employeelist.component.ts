import { Component, OnInit } from '@angular/core';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service';
import { Router } from '@angular/router';

import {FormGroup,FormControl,FormBuilder, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  updateEmployee:FormGroup;
  uname:string;
  uage:string;
  usalary:string;
  selectedEmployeeid:string;
  
  spinneri:boolean = true;
  constructor(private employeeService:EmployeeDataServiceService,private routes:Router,private formbuilder:FormBuilder) {
    this.updateEmployee = formbuilder.group({
      uname:['',Validators.required],
      uage:['',Validators.required],
      usalary:['',Validators.required]
    });
   }
  employeeData:any[] = new Array();
  ResultEmployeeDetails:any=new Array();
  flag:number = 0;
  deletestatus:any[] = new Array();
  ngOnInit() {
   // this.spinner.show();
     this.getEmployeeDataFromServer();
     
  }
  getSelectedDataOfEmployee() {
    this.ResultEmployeeDetails = this.employeeService.getSelectedEmployeeDetails();
    //console.log(this.ResultEmployeeDetails["employee_name"]);
    
    this.updateEmployee.get('uname').setValue(this.ResultEmployeeDetails["employee_name"]);
    this.updateEmployee.get('uage').setValue(this.ResultEmployeeDetails["employee_age"]);
    this.updateEmployee.get('usalary').setValue(this.ResultEmployeeDetails["employee_salary"]);
    
  }
  getEmployeeDataFromServer() {

    console.log(this.employeeService.getFlagValue());
    if(this.employeeService.getFlagValue()){
      this.employeeService.getEmployeeLists().subscribe((response)=>{
        this.employeeData.push(response);
        this.flag = 0;
      this.spinneri = false;
    },err=>{
      alert("Check Your Internet Connection...");
      this.routes.navigate(['/sidebar']);
    });
  }else{
      this.routes.navigate(['/login']);
  }

   
  }

  sendingEmployeeOb(data:any){
    
    this.flag = 1;
    this.selectedEmployeeid = data.id;
    this.employeeService.setSelectedEmployeeDetails(data);
    this.routes.navigate(['/sidebar/employeeDetails']);
    
  }
  deletethisid(id:number){
    this.spinneri = true;
    if(confirm("Are you sure to delete ")) {
      this.employeeService.deleteThisId(id).subscribe((response)=>{
        this.deletestatus.push(response);
      
        if(this.deletestatus[0]["success"]["text"] == "successfully! deleted Records"){
          
            alert("Succesfully Delete..");
            this.employeeData.splice(0, this.employeeData.length) 
            this.getEmployeeDataFromServer();
            
        }else{
            alert("Failed To Deleted...");
            this.spinneri = false;
        }
  
      });
    }else{
      this.spinneri = false;
    }


    
  }
  
  resetform(){
    this.updateEmployee.reset();
  }

  updateData(updateEmployee:NgForm){
    console.log("f"+updateEmployee);
    this.employeeService.updateMyEmployeeDetails(updateEmployee,this.selectedEmployeeid).subscribe((response)=>{
      if(updateEmployee.controls.uname.value == response["name"]){
          alert("Employee Details Updated....");
          updateEmployee.reset();
          
          this.employeeData.splice(0, this.employeeData.length) 
          this.getEmployeeDataFromServer();
          
          
      }else{
        alert("Employee Details Not Updated....");
        
      }

     

    });
  }

}
