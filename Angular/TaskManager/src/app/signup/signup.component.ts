import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SharedService } from '../Services/shared.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
          password: ['', Validators.required],
          passwordverify: ['', Validators.required]
      });

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

      if (this.f.password.value!==this.f.passwordverify.value) {
        alert('Password and verify Password should be the same');
        return;
    }

      this.loading = true;
      this.authenticationService.signup(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                alert('User Added successfully.');
                  this.router.navigate(["login"]);
              },
              error => {
                alert('User Saving Faild.');
                this.loading = false;
              });
  }

}
