import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivationService {
  url = environment.base_url;
  private newUserSubject: BehaviorSubject<any>;
  // End
  public userError = new Subject<any>();
  http: HttpClient;
  router: Router;

  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient);
    this.router = this.injector.get<Router>(Router);
    this.formatConstructorData();
  }


  formatConstructorData() {
    const userObject = JSON.parse(sessionStorage.getItem('currentUser'));
    this.newUserSubject = new BehaviorSubject<any>(
      userObject ? JSON.parse(sessionStorage.getItem('authToken')) : null,
    );
  }

  public get thisUserValue() {
    return this.newUserSubject.value;
  }

}
