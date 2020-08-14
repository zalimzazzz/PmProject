import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TemplateServiceOrder } from '../_models/template-service-order';

@Injectable({
  providedIn: 'root'
})
export class TemplateServiceOrderServiceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async add(templateServiceOrder: TemplateServiceOrder) {
    return await this.http.post(this.baseUrl + 'TemplateServiceOrder', templateServiceOrder).toPromise();
  }
  async get() {
    return await this.http.get(this.baseUrl + 'TemplateServiceOrder').toPromise();
  }
}
