import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SharedService } from '../Services/shared.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: SharedService) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      sessionStorage.setItem("OAUTH_KEY","");
  }

  SignUP(){
    this.router.navigate(["signup"]);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                if('true'==data['isExist']){
                  sessionStorage.setItem("USER_ID",data['userId']);
                  sessionStorage.setItem("OAUTH_KEY",data['token'])
                    this.router.navigate(["Add"]);
                }else{
                  alert("Invalid Credentials.");
                  this.loading =false;
                } 
              },
              error => {
                alert("Application Error.plz check the log");
                this.router.navigate(["login"]);
              });
  }
}
