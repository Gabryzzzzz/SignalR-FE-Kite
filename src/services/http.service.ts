import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface params {
  name: string;
  value: any;
}

export interface header {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  @Output() newOrupdateData = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  header = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8'
  );

  get(url: string, inputParams?: any) {
    if (inputParams != null) {
      let params: HttpParams = new HttpParams();
      // inputParams.forEach((param) => {
      //   params = params.append(param.name, param.value);
      // });

      for (const key in inputParams) {
        params = params.append(key, inputParams[key]);
      }

      return this.http.get<any>(environment.base_url + url, {
        params: params,
        headers: this.header,
      });
    }
    if (url.includes('@local@')) {
      return this.http.get<any>(`${url.replace('@local@', '')}`);
    }
    return this.http.get<any>(environment.base_url + url, { headers: this.header });
  }

  post(url: string, body?: any) {
    let serializedForm = JSON.stringify(body);
    return this.http.post<any>(environment.base_url + url, serializedForm, {
      headers: this.header,
    });
  }

}
