import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.css']
})
export class OpeningComponent {
  error:any;
  opening_amount= new FormControl(0);
  employee: any;
  constructor(private http: HttpService, private router: Router, private data: DataService,
              private _snackBar: MatSnackBar, private auth:AuthService) {
  }

  ngOnInit(): void {
    this.data.getEmployee().subscribe((employee)=>this.employee = employee.employee);
    this.http.counterIsOpen().subscribe((status)=>{
      console.log(status);
      if(status) {
        console.log("aaa");
        this.router.navigate(['/main/pos']);
      }
    })
  }
  proceed() {
  const body = {
    opening_balance:this.opening_amount.value
  }
  this.http.openingBalance(body).subscribe((resp:any)=>{
    console.log(resp);
    if(resp.code === 200) {
      localStorage.setItem('store_open',JSON.stringify(resp));
      this._snackBar.open('Counter Opening Balance Updated', 'Dance', {
        duration: 2000,
      });
    } else {
      this._snackBar.open(resp.message , 'Dismiss', {
        duration: 2000,
      });
    }
    console.log("here");
    this.router.navigate(['/main/pos']);
  });
  }
  logout() {
    this.auth.logout();
  }


}
