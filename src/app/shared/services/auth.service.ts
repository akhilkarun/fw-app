import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn() {

    if (localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }
  login(posttData: any) {
   return this.http.post(this.base_url+'api/pos/login',posttData);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  changePwd(posttData: any) {
    return this.http.post(this.base_url+'api/pos/change-password',posttData);
   }
}
