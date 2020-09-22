import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../_services/company.service';
import { AlertifyService } from '../_services/alertify.service';
import { Company } from '../_models/company';
import { Project } from '../_models/project';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyAddEditComponent } from './company-add-edit/company-add-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'action'];
  // dataSource = new MatTableDataSource<Procject>(templateServiceOrderItem);
  dataSource: any;
  company = new Array<Company>();
  selection = new SelectionModel<Project>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router,
    public dialog: MatDialog,
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,) {
  }

  ngOnInit() {
    this.setTable();
  }

  setTable() {
    this.spinner.show();
    this.companyService.get().then((res: Array<Company>) => {

      this.company = res;
      this.dataSource = new MatTableDataSource<Company>(this.company);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(ex => {

      this.alertify.error('Internal Server Error');
    }).finally(() => {
      this.spinner.hide();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource?.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    const rowIndex = (element) => element == row.id;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.company.findIndex(rowIndex)}`;
  }

  export(id: string) {
    this.router.navigate(['project/export/' + id]);
  }
  serviceOrder(id: string) {
    this.router.navigate(['serviceOrder/add/' + id]);
  }
  openDialog() {
    const dialogRef = this.dialog.open(CompanyAddEditComponent,
      {
        data: { id: null },
      });

    dialogRef.afterClosed().subscribe(result => {

      this.setTable();
    });
  }
  edit(id: string) {


    const dialogRef = this.dialog.open(CompanyAddEditComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setTable();
    });
  }


  async deleteSelected() {
    let selected = this.selection.selected;
    if (selected.length === 0) {
      return;
    }
    this.spinner.show();
    for (let index = 0; index < selected.length; index++) {
      const id = selected[index].id;

      let res = await this.companyService.delete(id).catch(ex => {
        this.alertify.error('Delete Failed');
      })
    }
    this.selection.clear();
    this.setTable();
    this.spinner.hide();
  }

  delete(id: string) {
    this.spinner.show();
    this.companyService.delete(id).then(t => {
      this.alertify.success('Deleted');
      this.setTable();
    }).catch(ex => {
      this.alertify.error('Delete Failed');
    }).finally(() => {
      this.spinner.hide();
    });
  }
}
