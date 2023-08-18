import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { EmployeeGuard } from './shared/services/employee.guard';

const routes: Routes = [
  { path: '***', redirectTo: '/login', pathMatch: 'full' },
  { path: 'opening', canActivate: [AuthGuard, EmployeeGuard], loadChildren: ()=> import('./open/open.module').then(m => m.OpenModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
