import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [CommonModule, NavbarComponent],
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  error: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private gql: GraphqlService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.gql.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employee details';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
