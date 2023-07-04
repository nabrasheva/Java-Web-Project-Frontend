import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskRow} from "../model/task-row";
import {Task} from "../model/task";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit{

  @Input() task!: Task;
  @Output() task_row = new EventEmitter<any>();


  taskForm!: FormGroup;
  public error: boolean = false;
  public errorMessage: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,private fb: FormBuilder, private taskService:TaskService) {}

  ngOnInit(): void {
    this.task = this.dialogData.task;
    this.taskForm = this.fb.group({
      name: [this.task.name],
      dueDate: [this.task.dueDate],
      description: [this.task.description],
      status: [this.task.status],
      creatorEmail: [this.task.creatorEmail],
      eventName: [this.task.eventName],
      assignees: this.fb.array(this.task.assignees)
    });
  }
  get assignees() {
    return this.taskForm.get('assignees') as FormArray;
  }

  // Method to add a new assignee form control
  addAssignee() {
    this.assignees.push(this.fb.control(''));
  }

  // Method to remove an assignee form control
  removeAssignee(index: number) {
    this.assignees.removeAt(index);
  }
  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';
  }
  private areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  updateTask() {
    const newTask: Task = this.taskForm.getRawValue();

    let formattedDate:string;
    type taskJsonType = {[key: string] : string}
    const taskJSON:taskJsonType = { };

    if(!this.areDatesEqual(new Date(newTask.dueDate), new Date(this.task.dueDate)))
    {
      const year = newTask.dueDate.getFullYear();
      const month = String(newTask.dueDate.getMonth() + 1).padStart(2, '0');
      const day = String(newTask.dueDate.getDate()).padStart(2, '0');

      formattedDate = `${year}-${month}-${day}`;
      taskJSON["dueDate"] = formattedDate;
    }
    else formattedDate = this.task.dueDate.toLocaleString();


    if(newTask.description !== this.task.description)
    {
      taskJSON["description"] = newTask.description;
    }

    if(newTask.status !== this.task.status)
    {
      taskJSON["status"] = newTask.status;
    }

    if(newTask.assignees !== this.task.assignees && newTask.assignees.length > 0)
    {
      taskJSON["assignees"] = newTask.assignees;
    }

    if(newTask.assignees.length == 0)
    {
      this.showError("Task should have assignees!");
      return;
    }
    this.taskService.updateTask(newTask.eventName, newTask.name, taskJSON).subscribe({
      next: value => {
        console.log(value);
        const newRow = {name: newTask.name, due_date: formattedDate, status: newTask.status};
        this.task_row.emit(newRow);
        this.taskForm.reset();
      },
      error: err => {
        console.error(err);

        this.showError(err.error.Message);
      }
    })

  }
}
