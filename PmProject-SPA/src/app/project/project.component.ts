import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

const templateServiceOrderItem: Procject[] = [
  { id: '1', name: 'Project 1', templateName: 'Template 1' },
  { id: '2', name: 'Project 2', templateName: 'Template 2' },
  { id: '3', name: 'Project 3', templateName: 'Template 3' },
  { id: '4', name: 'Project 4', templateName: 'Template 4' },
  { id: '5', name: 'Project 5', templateName: 'Template 1' },
  { id: '6', name: 'Project 6', templateName: 'Template 1' },
];

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  //displayedColumns: any;
  // dataSource: any;
  // selection: any;
  templateServiceOrderItem = templateServiceOrderItem;
  displayedColumns: string[] = ['select', 'name', 'templateServiceOrder', 'export', 'action'];
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
    this.dialog.open(ProjectAddEditComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
  export(id: string) {
    this.router.navigate(['project/export/' + id]);
  }
  openDialog() {
    this.dialog.open(ProjectAddEditComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}


export interface Procject {
  id: string;
  name: string;
  templateName: string;
}




