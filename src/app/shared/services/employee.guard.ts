import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard  {
  constructor(private data:DataService, private http: HttpService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const employee = this.data.employee.value;
      if(employee) {
        return of(true);
      }else {
        this.http.getEmployee().subscribe((result)=>{
          if(result) {
            this.data.setEmployee(result);
            return of(true);
          }
          return null;
        });
      }
      return true;
  }

}
