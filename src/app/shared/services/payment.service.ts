import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = environment.base_url;
  http: HttpService;
  router: Router;
  public currentUser: Observable<any>;

  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpService>(HttpService);
    this.router = this.injector.get<Router>(Router);
  }

  getPaymentsPerLoan(loanID: number): Observable<any> {
    const endpoint = `/loans/loan/${loanID}/payment-records`;
    const token = sessionStorage.getItem('authToken');
    const headers = {
      'Authorization': eval(`${token}`),
      'Content-Type': 'application/json'
    };
    return this.http.getRequestWithParams(endpoint, headers);
  }
}
