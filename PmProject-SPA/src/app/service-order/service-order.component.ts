import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceOrderAddEditComponent } from './service-order-add-edit/service-order-add-edit.component';

const templateServiceOrderItem: Procject[] = [
  { id: '1', serviceOrderNo: 'S01', description: 'description Abc', status: '1' },
  { id: '2', serviceOrderNo: 'S02', description: 'description Abc', status: '1' },
  { id: '3', serviceOrderNo: 'S03', description: 'description Abc', status: '1' },
  { id: '4', serviceOrderNo: 'S04', description: 'description Abc', status: '1' },
];

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.css']
})
export class ServiceOrderComponent implements OnInit {

  //displayedColumns: any;
  // dataSource: any;
  // selection: any;
  templateServiceOrderItem = templateServiceOrderItem;
  displayedColumns: string[] = ['select', 'serviceOrderNo', 'description', 'status', 'action'];
  dataSource = new MatTableDataSource<Procject>(templateServiceOrderItem);
  selection = new SelectionModel<Procject>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.paginator);
    console.log(this.sort);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Procject): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    const rowIndex = (element) => element == row.id;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.templateServiceOrderItem.findIndex(rowIndex)}`;
  }

  edit(id: string) {
    this.router.navigate(['/serviceOrder/edit/' + id]);
  }
  openDialog() {
    this.dialog.open(ServiceOrderAddEditComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}


export interface Procject {
  id: string;
  serviceOrderNo: string;
  description: string;
  status: string;
}




