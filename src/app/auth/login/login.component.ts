import { Component } from '@angular/core';
import { FormGroup,FormControl , FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = null;
  template = null;
  loading = false;
  version : any;
  form:any = FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit() {
    //Add User form validations
    this.form = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
    });

    this.version = environment.version;
    if(!localStorage.getItem('fingerPrint')) {
      this.loadFingerrint();
    }
     //this.printInIFrame();
    // if(this.auth.isLoggedIn()) {
    //   if(localStorage.getItem('store_open')){
    //     this.router.navigate(['/main/pos']);
    //   } else {
    //     this.router.navigate(['/opening']);
    //   }

    // }
  }

  //Add user form actions
  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.valid) {
      this.loading =true;
      const postData = {
        grant_type:'password',
        client_id:environment.client_id,
        client_secret:environment.client_secret,
        ...this.form.value
      };
      postData.macId = localStorage.getItem('fingerPrint');
      this.auth.login(postData).subscribe((response: any)=>{
         this.loading = false;
         localStorage.setItem('access_token',response.access_token);
         localStorage.setItem('refersh_token',response.refersh_token);
         const data = jwtDecode(response.access_token);
         localStorage.setItem('user_data',JSON.stringify(data));
         localStorage.setItem('expires_in',response.expires_in);
        this.error = null;
         this.router.navigate(['/opening']);
      },(error: any)=> {
        this.error = error.error.message;
        this.loading = false;
        // alert('Invalid Username or Password');
      });
    }


  }

  async loadFingerrint(): Promise<any> {
    const fp = await FingerprintJS.load();

    // The FingerprintJS agent is ready.
    // Get a visitor identifier when you'd like to.
    const result = await fp.get();

    // This is the visitor identifier:
    const visitorId = result.visitorId;
    localStorage.setItem('fingerPrint',visitorId);
  }

}
