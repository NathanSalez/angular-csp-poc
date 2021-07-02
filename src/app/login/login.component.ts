import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private target?: string | null;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  error = '';

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.target = this.activatedRoute.snapshot.paramMap.get('target');
  }

  submit(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).pipe(
        catchError(err => {
          this.error = err.error.error + ' : ' + err.error.message;
          return throwError(err);
        })
      ).subscribe(() => {
        this.error = '';
        this.router.navigate(['pokedex']);
      });
    }
  }

  ngOnInit(): void {
    this.authService.login('alexandre.barczyk@ig2i.centralelille.fr', 'toto12345').pipe(
      catchError(err => {
        this.error = err.error.error + ' : ' + err.error.message;
        return throwError(err);
      })
    ).subscribe(() => {
      this.error = '';
      if (this.target) {
        this.router.navigate([this.target]);
      } else {
        this.router.navigate(['pokedex']);
      }
    });

  }

}
