import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceOrderAddEditComponent } from './service-order-add-edit/service-order-add-edit.component';
import { ServiceOrderService } from '../_services/service-order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { ServiceOrder } from '../_models/service-order';



@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.css']
})
export class ServiceOrderComponent implements OnInit {

  //displayedColumns: any;
  // dataSource: any;
  // selection: any;
  serviceOrderItem = new Array<ServiceOrder>();
  displayedColumns: string[] = ['select', 'serviceOrderNo', 'description', 'status', 'action'];
  dataSource: any;
  selection = new SelectionModel<ServiceOrder>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router,
    public dialog: MatDialog,
    private serviceOrderService: ServiceOrderService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.setTable();
  }
  setTable() {
    this.spinner.show();
    this.serviceOrderService.get().then((res: Array<ServiceOrder>) => {
      console.log(res);

      if (res !== null)
        this.serviceOrderItem = res;
      this.dataSource = new MatTableDataSource<ServiceOrder>(this.serviceOrderItem);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(ex => {
      this.alertify.error(ex);
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
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    const rowIndex = (element) => element == row.id;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.serviceOrderItem.findIndex(rowIndex)}`;
  }

  edit(id: string, projectId: string) {
    console.log(projectId);

    this.router.navigate(['/serviceOrder/edit/' + id + '/' + projectId]);
  }
  openDialog() {
    this.dialog.open(ServiceOrderAddEditComponent, {
      data: {
        animal: 'panda'
      }
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
      console.log(id);
      let res = await this.serviceOrderService.delete(id).catch(ex => {
        this.alertify.error('Delete Failed');
      })
    }
    this.selection.clear();
    this.setTable();
    this.spinner.hide();
  }

  delete(id: string) {
    this.spinner.show();
    this.serviceOrderService.delete(id).then(t => {
      this.setTable();
      this.alertify.success('Deleted');
    }).catch(ex => {
      this.alertify.error('Delete Failed');
    }).finally(() => {
      this.spinner.hide();
    });
  }

}



