import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import {EmployeeAddComponent} from './employees/employee-add/employee-add.component';
import {EmployeeEditComponent} from './employees/employee-edit/employee-edit.component';
import {EmployeeDetailComponent} from './employees/employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // protected routes
  {
    path: 'employees',
    canActivate: [authGuard], // Protect this route
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'add', component: EmployeeAddComponent },
      { path: 'edit/:id', component: EmployeeEditComponent },
      { path: 'detail/:id', component: EmployeeDetailComponent },
    ]
  }


];
