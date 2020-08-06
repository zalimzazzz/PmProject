import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, templatename: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, templatename: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, templatename: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, templatename: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, templatename: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, templatename: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, templatename: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, templatename: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, templatename: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, templatename: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-template-service-order',
  templateUrl: './template-service-order.component.html',
  styleUrls: ['./template-service-order.component.scss'],
})
export class TemplateServiceOrderComponent implements OnInit {

  //displayedColumns: any;
  // dataSource: any;
  // selection: any;
  displayedColumns: string[] = ['select', 'templatename', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() {
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}


export interface PeriodicElement {
  templatename: string;
  position: number;
  weight: number;
  symbol: string;
}




