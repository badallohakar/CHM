import { Component, OnInit } from '@angular/core';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-employee-prfile',
  templateUrl: './employee-prfile.component.html',
  styleUrls: ['./employee-prfile.component.css']
})
export class EmployeePrfileComponent implements OnInit {
  updateEmployee:FormGroup;
  uname:string;
  uage:string;
  fupload:boolean=true;
  usalary:string;
  selectedEmployeeid:string;
  spinneri:boolean = true;
  ResultEmployeeDetails:any=new Array();
  updation:boolean = false;
  imgup:boolean = true;
  uploadingStatusText:string;
  deletestatus:any[] = new Array();
  constructor(private employeeService:EmployeeDataServiceService,private routes:Router,private formbuilder:FormBuilder) {
    this.updateEmployee = formbuilder.group({
      uname:['',Validators.required],
      uage:['',Validators.required],
      usalary:['',Validators.required]
    });
   }

  ngOnInit() {
    this.getSelectedDataOfEmployee();
  }

  getSelectedDataOfEmployee() {
    this.ResultEmployeeDetails = this.employeeService.getSelectedEmployeeDetails();
    //console.log(this.ResultEmployeeDetails["employee_name"]);
    
    this.updateEmployee.get('uname').setValue(this.ResultEmployeeDetails["employee_name"]);
    this.updateEmployee.get('uage').setValue(this.ResultEmployeeDetails["employee_age"]);
    this.updateEmployee.get('usalary').setValue(this.ResultEmployeeDetails["employee_salary"]);
    this.selectedEmployeeid = this.ResultEmployeeDetails["id"];
  }

  resetform(){
    this.updateEmployee.reset();
  }

  updateeUvalue(){
    this.uploadingStatusText = "Please Wait Details Uploading .....";
    this.fupload = true;
    this.updation = false;
  }
  updateData(updateEmployee:NgForm){
    this.uploadingStatusText = "Please Wait Details Uploading .....";
    this.imgup = false;
    this.updation = true;
    console.log("f"+updateEmployee.controls);
    this.employeeService.updateMyEmployeeDetails(updateEmployee,this.selectedEmployeeid).subscribe((response)=>{
      if(updateEmployee.controls.uname.value == response["name"]){
        this.ResultEmployeeDetails["employee_name"] =response["name"];
        this.ResultEmployeeDetails["employee_age"] =response["age"];
        this.ResultEmployeeDetails["employee_salary"] =response["salary"]; 
        updateEmployee.reset();
        this.uploadingStatusText = "Details Uploaded .....";
          this.imgup = true;
          this.fupload = false;
          this.getSelectedDataOfEmployee();
          //alert("Employee Details Updated....");
          //this.routes.navigate(['/sidebar/employeelist']);
      }else{
        alert("Employee Details Not Updated....");
        
      }
    });
  }

}
 