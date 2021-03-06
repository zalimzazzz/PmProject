import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../_models/project';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { UserManagementAddEditComponent } from './user-management-add-edit/user-management-add-edit.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'company', 'action'];
  // dataSource = new MatTableDataSource<Procject>(templateServiceOrderItem);
  dataSource: any;
  user = new Array<User>();
  selection = new SelectionModel<Project>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,) {
  }

  ngOnInit() {
    this.setTable();
  }

  setTable() {
    this.spinner.show();
    this.userService.getAdmin().then((res: Array<User>) => {

      this.user = res;
      this.dataSource = new MatTableDataSource<User>(this.user);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.user.findIndex(rowIndex)}`;
  }

  export(id: string) {
    this.router.navigate(['project/export/' + id]);
  }
  serviceOrder(id: string) {
    this.router.navigate(['serviceOrder/add/' + id]);
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserManagementAddEditComponent,
      {
        data: { id: null },
      });

    dialogRef.afterClosed().subscribe(() => {

      this.setTable();
    });
  }
  edit(id: string) {


    const dialogRef = this.dialog.open(UserManagementAddEditComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
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

    }
    this.selection.clear();
    this.setTable();
    this.spinner.hide();
  }

  delete(id: string) {
    this.spinner.show();
    this.userService.delete(id).then(() => {
      this.alertify.success('Deleted');
      this.setTable();
    }).catch(() => {
      this.alertify.error('Delete Failed');
    }).finally(() => {
      this.spinner.hide();
    });
  }
}