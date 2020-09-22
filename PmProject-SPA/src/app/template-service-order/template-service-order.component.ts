import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TemplateServiceOrder } from '../_models/template-service-order';
import { TemplateServiceOrderServiceService } from '../_services/template-service-order-service.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-template-service-order',
  templateUrl: './template-service-order.component.html',
  styleUrls: ['./template-service-order.component.scss'],
})
export class TemplateServiceOrderComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'action'];
  templateServiceOrder = new Array<TemplateServiceOrder>();
  // dataSource = new MatTableDataSource<TemplateServiceOrder>(templateServiceOrderItem);
  dataSource: any;
  selection = new SelectionModel<TemplateServiceOrder>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router,
    private templateServiceOrderServiceService: TemplateServiceOrderServiceService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.setTable();
  }
  setTable() {
    this.spinner.show();
    this.templateServiceOrderServiceService.get().then((res: Array<TemplateServiceOrder>) => {
      this.templateServiceOrder = res;
      this.dataSource = new MatTableDataSource<TemplateServiceOrder>(this.templateServiceOrder);
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
  checkboxLabel(row?: TemplateServiceOrder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    const rowIndex = (element) => element === row.id;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.templateServiceOrder.findIndex(rowIndex)}`;
  }

  edit(id: string) {
    //
    this.router.navigate(['/template/edit/' + id]);
  }

  async deleteSelected() {
    let selected = this.selection.selected;
    if (selected.length === 0) {
      return;
    }
    this.spinner.show();
    for (let index = 0; index < selected.length; index++) {
      const id = selected[index].id;
      //
      let res = await this.templateServiceOrderServiceService.delete(id).catch(ex => {
        this.alertify.error('Delete Failed');
      });
    }
    this.selection.clear();
    this.setTable();
    this.spinner.hide();
  }

  delete(id: string) {
    this.spinner.show();
    this.templateServiceOrderServiceService.delete(id).then(t => {
      this.setTable();
      this.alertify.success('Deleted');
    }).catch(ex => {
      this.alertify.error('Delete Failed');
    }).finally(() => {
      this.spinner.hide();
    });
  }
}


// export interface TemplateServiceOrder {
//   id: string;
//   name: string;
// }




