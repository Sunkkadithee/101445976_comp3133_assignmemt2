import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [CommonModule, NgIf, NgFor, FormsModule, NavbarComponent],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(private gql: GraphqlService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && this.router.url === '/employees'))
      .subscribe(() => {
        this.fetchEmployees();
      });
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.gql.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load employees.';
        console.error(err);
      }
    });
  }

  handleSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      (`${emp.first_name} ${emp.last_name}`.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.designation.toLowerCase().includes(query))
    );
  }

  handleDelete(id: string) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      this.gql.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted!');
          this.fetchEmployees();
        },
        error: () => alert('Failed to delete employee.')
      });
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
