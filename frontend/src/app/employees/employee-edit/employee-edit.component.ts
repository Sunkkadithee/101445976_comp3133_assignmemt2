import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  employeeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gql: GraphqlService,
    protected router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(1000)]],
      department: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      employee_photo: ['']
    });
    this.updatePreview();
  }

  photoPreview: string | null = null;

  updatePreview() {
    const url = this.employeeForm.get('employee_photo')?.value;
    this.photoPreview = url && url.trim() !== '' ? url : null;
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.gql.getEmployeeById(this.employeeId).subscribe({
      next: (data) => this.employeeForm.patchValue(data),
      error: (err) => {
        console.error('Failed to load employee', err);
        alert('Failed to load employee data');
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) return;

    this.gql.updateEmployee(this.employeeId, this.employeeForm.value).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        alert('Update failed');
      }
    });
  }
}
