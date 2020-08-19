import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project } from '../_models/project';
import { ServiceOrder } from '../_models/service-order';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async add(serviceOrder: ServiceOrder) {
    return await this.http.post(this.baseUrl + 'ServiceOrder', serviceOrder).toPromise();
  }
  async update(serviceOrder: ServiceOrder) {
    return await this.http.put(this.baseUrl + 'ServiceOrder/' + serviceOrder.id, serviceOrder).toPromise();
  }
  async uploadFile(formData: FormData) {
    return await this.http.post(this.baseUrl + 'ServiceOrder/Upload', formData).toPromise();
  }
  async download(name: string) {
    return await this.http.get(this.baseUrl + 'ServiceOrder/Download/' + name).toPromise();
  }
  async delete(id: string) {
    return await this.http.delete(this.baseUrl + 'ServiceOrder/' + id).toPromise();
  }
  async get() {
    return await this.http.get(this.baseUrl + 'ServiceOrder').toPromise();
  }
  async getById(id: string) {
    return await this.http.get(this.baseUrl + 'ServiceOrder/' + id).toPromise();
  }
  async getQuestion(id: string) {
    return await this.http.get(this.baseUrl + 'ServiceOrder/Question/' + id).toPromise();
  }
}
