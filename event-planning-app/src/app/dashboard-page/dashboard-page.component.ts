import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from "../model/task";
import {TaskRow} from "../model/task-row"
import {EventRow} from "../model/event-row";
import {AddEventComponent} from "../add-event/add-event.component";
import {AddTaskComponent} from "../add-task/add-task.component";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {

  eventName!: string | null;
  role!: string | null;
  showButtons!:boolean;
  newTaskRow!: TaskRow;
  dataSource: MatTableDataSource<TaskRow> = new MatTableDataSource([
    { name: 'Task1', due_date: '2023-06-21', status:'To Do'},
    { name: 'Task2', due_date: '2023-06-21', status: 'In Progress'},
    { name: 'Task3', due_date: '2023-06-21', status: 'Done'},
  ]) ;

  displayedColumns: string[] = ['name', 'due_date', 'status'];

  constructor(private dialog: MatDialog,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.role = params['role'];
      this.eventName = params['name'];
    });

    if(this.role == 'admin' || this.role == 'planner')
    {
      this.showButtons = true;
      this.displayedColumns =  ['name', 'due_date', 'status', 'update', 'delete'];
    }
  }

  openPopupForm(): void {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.componentInstance.task_row.subscribe((object: TaskRow) => {
      this.newTaskRow = object;
      this.dataSource.data.push(this.newTaskRow);
      this.dataSource._updateChangeSubscription();
      this.dialog.closeAll();
    });

  }

  deleteTask(element: TaskRow) {
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  updateTask(element: TaskRow) {

  }
}
