import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Guid } from 'guid-typescript';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(
    page?,
    itemsPerPage?,
    userParams?,
    likesParam?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    return this.http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: Guid): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  async getById(id: Guid) {
    return await this.http.get<User>(this.baseUrl + 'users/' + id).toPromise();
  }
  async update(user: User) {
    return await this.http.put(this.baseUrl + 'users/' + user.id, user).toPromise();
  }
  async getTechnician(id: string) {
    return await this.http.get<Array<User>>(this.baseUrl + 'users/technician/' + id).toPromise();
  }
  async getAdmin() {
    return await this.http.get<Array<User>>(this.baseUrl + 'users/admin/').toPromise();
  }
  async delete(id: string) {
    return await this.http.delete(this.baseUrl + 'users/' + id).toPromise();
  }
  updateUser(id: Guid, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: Guid, id: Guid) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: Guid, id: Guid) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: Guid, recipientId: string) {
    return this.http.post(
      this.baseUrl + 'users/' + id + '/like/' + recipientId,
      {}
    );
  }
}
