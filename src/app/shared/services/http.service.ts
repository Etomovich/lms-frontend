import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  getRequest(endpoint, baseUrl = this.base_url) {
    return this.http.get(baseUrl + endpoint);
  }

  getRequestWithParams(endpoint, headers = {}, params = {}, baseUrl = this.base_url) {
    const payload = { headers , params }
    return this.http.get(baseUrl + endpoint, payload);
  }


  makeRequestWithData<T>(
    endpoint: any,
    params: any,
    method: any,
    baseUrl = this.base_url,
  ): Observable<T> | any {
    return this.http[method](`${baseUrl}${endpoint}`, params);
  }
}
