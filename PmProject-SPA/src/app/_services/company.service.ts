import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../_models/company';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // getCompanies(page?, itemsPerPage?): Observable<PaginatedResult<Company[]>> {
  //   const paginatedResult: PaginatedResult<Company[]> = new PaginatedResult<Company[]>();

  //   let params = new HttpParams();

  //   if (page != null && itemsPerPage != null) {
  //     params = params.append('pageNumber', page);
  //     params = params.append('pageSize', itemsPerPage);
  //   }

  //   return this.http
  //     .get<Company[]>(this.baseUrl + 'company', { observe: 'response', params })
  //     .pipe(
  //       map(response => {
  //         paginatedResult.result = response.body;
  //         if (response.headers.get('Pagination') != null) {
  //           paginatedResult.pagination = JSON.parse(
  //             response.headers.get('Pagination')
  //           );
  //         }
  //         return paginatedResult;
  //       })
  //     );
  // }

  async add(company: Company) {
    return await this.http.post(this.baseUrl + 'company', company).toPromise();
  }
  async update(company: Company) {
    return await this.http.put(this.baseUrl + 'company/' + company.id, company).toPromise();
  }

  async get() {
    return await this.http.get(this.baseUrl + 'company').toPromise();
  }
  async getById(id: string) {
    return await this.http.get(this.baseUrl + 'company/' + id).toPromise();
  }
  async delete(id: string) {
    return await this.http.delete(this.baseUrl + 'company/' + id).toPromise();
  }

}
