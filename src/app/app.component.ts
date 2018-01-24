import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmployeeService]
})
export class AppComponent {
  constructor(
    public EmployeeFromService: EmployeeService
  ) { }

  EmployeeModel: Employee = new Employee();

  ngOnInit() {
    this.EmployeeFromService.getEmployeeList();
  }

  add_update_Employee(form: NgForm) {
    if (!form.value.empId) {
      console.log(form.value.empId,"add")
      // add
      this.EmployeeFromService.postEmployee(form.value);
    } else {
      console.log(form.value.empId,"update")
      // update
      this.EmployeeFromService.updateEmployee(form.value);
    }
    form.reset();
  }

  edit_Employee(emp) {
    Object.assign(this.EmployeeModel, emp);
  }

  del_Employee(id) {
    this.EmployeeFromService.deleteEmployee(id);
  }
}
