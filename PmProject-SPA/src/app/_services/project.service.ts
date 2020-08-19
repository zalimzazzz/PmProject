import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async add(project: Project) {
    return await this.http.post(this.baseUrl + 'Project', project).toPromise();
  }
  async update(project: Project) {
    return await this.http.put(this.baseUrl + 'Project/' + project.id, project).toPromise();
  }
  async delete(id: string) {
    return await this.http.delete(this.baseUrl + 'Project/' + id).toPromise();
  }
  async get() {
    return await this.http.get(this.baseUrl + 'Project').toPromise();
  }
  async getById(id: string) {
    return await this.http.get(this.baseUrl + 'Project/' + id).toPromise();
  }

}
