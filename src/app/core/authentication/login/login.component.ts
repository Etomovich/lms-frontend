import { Injectable, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormBuilder, FormGroup, Validators, NgForm,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  http: AuthService;
  loginForm: FormGroup;
  router: Router;
  route: ActivatedRoute;
  formBuilder: FormBuilder;
  toaster: ToasterService;
  loading = false;
  returnUrl: string;

  constructor(private injector: Injector) {
    this.http = this.injector.get<AuthService>(AuthService);
    this.toaster = this.injector.get<ToasterService>(ToasterService);
    this.formBuilder = injector.get<FormBuilder>(FormBuilder);
    this.router = injector.get<Router>(Router);
    this.route = injector.get<ActivatedRoute>(ActivatedRoute);
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    console.log("WERER",this.route);
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    const payload = { email, password };
    this.loading = true;
    this.http.login(payload).pipe(takeUntil(this.destroy$))
      .subscribe(
      (data: any) => {
        const {token, user } = data['data'];
        sessionStorage.setItem( 'authToken', JSON.stringify(token));
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.toaster.showSuccess(data.message);
        this.router.navigate([`/${this.returnUrl}`]);
      },
      (err: any) => {
        const msg = "You have entered invalid login credentials";
        this.toaster.showError(msg);
      },
      () => this.loading = false,
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
