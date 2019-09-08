import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, identity } from 'rxjs';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class EmployeeDataServiceService {
  
    url:string = "http://dummy.restapiexample.com/";
    selectedEmployeeDetails:any = new Array();
   flag:number = 0;
  constructor(private http:HttpClient) { }

  getEmployeeLists():Observable<any[]>{
    
    return this.http.get<any[]>("http://dummy.restapiexample.com/api/v1/employees");

  }

 

  setSelectedEmployeeDetails(data:any){
    
    this.selectedEmployeeDetails = data;
  }

  getSelectedEmployeeDetails():any{
      return this.selectedEmployeeDetails;
  }

  deleteThisId(id:number):Observable<any[]>{

return this.http.delete<any[]>("http://dummy.restapiexample.com/api/v1/delete/"+id);

  }
  addMyEmployee(employeeData:NgForm):Observable<any[]>{
    return this.http.post<any[]>("http://dummy.restapiexample.com/api/v1/create",{
      "name":employeeData.controls.name.value,
      "salary":employeeData.controls.salary.value,
      "age":employeeData.controls.age.value});
  }

  updateMyEmployeeDetails(data:NgForm,id:string):Observable<any[]>{
    return this.http.put<any[]>("http://dummy.restapiexample.com/api/v1/update/"+id,
    {"name":data.controls.uname.value,"salary":data.controls.uage.value,"age":data.controls.usalary.value});
  }

  setLoginCredentials() {
    this.flag = 1;
    return this.flag;
  }
  setFlagValue() {
    this.flag = 0;
  }
  
getFlagValue():number{
  return this.flag;
}
}
