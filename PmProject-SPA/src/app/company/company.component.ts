import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CompanyService } from '../_services/company.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Company } from '../_models/company';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[];
  pagination: Pagination;
  dtOptions: DataTables.Settings = {};

  constructor(private authService: AuthService, private companyService: CompanyService, 
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    /* this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true
    }; */

    this.route.data.subscribe(data => {
      console.log(data.company.result);
      this.companies = data.company.result;
      this.pagination = data.company.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  loadData() {
    this.companyService.getCompanies(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Company[]>) => {
        this.companies = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
