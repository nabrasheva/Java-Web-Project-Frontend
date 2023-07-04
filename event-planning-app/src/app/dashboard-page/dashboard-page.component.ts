import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {TaskRow} from "../model/task-row"

import {AddTaskComponent} from "../add-task/add-task.component";

import {UpdateTaskComponent} from "../update-task/update-task.component";

import {TaskService} from "../services/task.service";
import {Task} from "../model/task";
import {Event} from "../model/event";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit{

  eventName!: string;
  role!: string | null;
  showButtons!:boolean;
  showUsers!:boolean;
  newTaskRow!: TaskRow;
  inputTasks!: Task[];
  user_email!:string;
  isClickedShowGuests:boolean = false;
  isClickedShowPlanners:boolean = false;
   dataSource: MatTableDataSource<TaskRow> = new MatTableDataSource();

  displayedColumns: string[] = ['name', 'due_date', 'status'];

  constructor(private dialog: MatDialog,private route: ActivatedRoute, private router: Router, private taskService: TaskService,
              private authService:AuthService) { }

  navigateToProfile(): void {


    this.router.navigate(['profile']).then(r => r);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.role = params['role'];
      this.eventName = params['name'];
      this.user_email = params['user_email'];
    });

    this.taskService.getAllTasksByEvent(this.eventName).subscribe({
      next: value => {
        this.inputTasks = value;
        this.inputTasks.forEach(task => {
          this.dataSource.data.push({name: task.name, due_date: task.dueDate.toLocaleString(), status:task.status});
        });
        this.dataSource._updateChangeSubscription();
      },
      error: err => {
        console.log(err);
      }
    })

    if(this.role == 'admin')
    {
      this.showUsers = true;
    }
    if(this.role == 'admin' || this.role == 'planner')
    {
      this.showButtons = true;
      this.displayedColumns =  ['name', 'due_date', 'status', 'update', 'delete'];
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: {eventName: this.eventName, user_email:this.user_email}
    });
    dialogRef.componentInstance.task_row.subscribe((object: TaskRow) => {
      this.newTaskRow = object;
      this.dataSource.data.push(this.newTaskRow);
      this.dataSource._updateChangeSubscription();
      this.dialog.closeAll();
    });

  }

  deleteTask(element: TaskRow) {

    this.taskService.deleteTask(this.eventName, element.name).subscribe({
      next: value => {
        console.log(value);
        const index = this.dataSource.data.indexOf(element);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
      },
      error: err => {
        console.log(err);
      }
    })

  }

  updateTask(toUpdateTaskRow: TaskRow) {

    let toUpdateTask: Task = {} as Task;

    this.taskService.getTask(this.eventName, toUpdateTaskRow.name).subscribe({
      next: value => {
        toUpdateTask = value;

        const dialogRef: MatDialogRef<UpdateTaskComponent, any> = this.dialog.open(UpdateTaskComponent, {
          data: { task: toUpdateTask }
        });

        dialogRef.componentInstance.task_row.subscribe((object: TaskRow) => {
          const updatedTaskIndex = this.dataSource.data.indexOf(toUpdateTaskRow);
          if (updatedTaskIndex !== -1) {

            this.dataSource.data[updatedTaskIndex] = object;
            this.dataSource._updateChangeSubscription();
          }
          this.dialog.closeAll();
        });
      }
    })

  }

  showGuests() {
    this.isClickedShowGuests = !this.isClickedShowGuests;
  }

  showPlanners() {
    this.isClickedShowPlanners = !this.isClickedShowPlanners;
  }

  logOut()
  {
    this.authService.logout();
  }
}
