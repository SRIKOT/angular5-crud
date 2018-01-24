import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

//message alert
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class EmployeeService {
  EmployeeList: Employee[];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getEmployeeList() {
    this.http.get('http://localhost/service-angular/public/employee/list_employee')
      .map(res => {
        return res as Employee[];
      }
      ).toPromise().then(x => {
        this.EmployeeList = x;
      });
  }

  postEmployee(emp: Employee) {
    const formdata = {
      "formdata":
      {
        "cu_emp": emp
      }
    }
    this.http.post("http://localhost/service-angular/public/employee/cu", formdata)
    .subscribe(res => {
      if(res['status']===200) {
        this.toastr.success('Add Employee', 'Success!');
        this.getEmployeeList();
      } else {
        this.toastr.warning('Add Employee', 'Faild!');
      }
    }, (error) => {
        console.log(error);
    });
  }

  updateEmployee(emp: Employee) {
    const formdata = {
      "formdata":
      {
        "cu_emp": emp
      }
    }
    this.http.post("http://localhost/service-angular/public/employee/cu", formdata)
    .subscribe(res => {
      if(res['status']===200) {
        this.toastr.success('Update Employee', 'Success!');
        this.getEmployeeList();
      } else {
        this.toastr.warning('Update Employee', 'Faild!');
      }
    }, (error) => {
        console.log(error);
    });
  }

  deleteEmployee(id: number) {
    this.http.get("http://localhost/service-angular/public/employee/delete?id="+id)
    .subscribe(res => {
      if(res['status']===200) {
        this.toastr.success('Delete!');
        this.getEmployeeList();
      } else {
        console.log(res);
      }
    }, (error) => {
        console.log(error);
    });
  }

}
