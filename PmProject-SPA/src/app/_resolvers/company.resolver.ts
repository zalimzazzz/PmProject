import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../_models/company';
import { CompanyService } from '../_services/company.service';

@Injectable()
export class CompanyResolver implements Resolve<Company[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Company[]> {
    return this.companyService.getCompanies(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
