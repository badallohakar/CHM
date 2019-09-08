import { Component, OnInit } from '@angular/core';
import {EmployeeDataServiceService} from 'src/app/Service/employee-data-service.service';
@Component({
  selector: 'app-profileandoption',
  templateUrl: './profileandoption.component.html',
  styleUrls: ['./profileandoption.component.css']
})
export class ProfileandoptionComponent implements OnInit {

  constructor(private service:EmployeeDataServiceService) { }
  ResultEmployeeDetails:any = new Array();
  ngOnInit() {
      this.getSelectedEmployeeDetails();
  }
  getSelectedEmployeeDetails() {
    
      this.ResultEmployeeDetails = this.service.getSelectedEmployeeDetails();
      console.log(this.ResultEmployeeDetails);
  
  }

}
