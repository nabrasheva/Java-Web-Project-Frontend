import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {Task} from "../model/task";
import {TaskService} from "../services/task.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  minDate: Date = new Date(Date.now());
  @Output() task_row = new EventEmitter<any>();
 // @Input() user_email!:string;
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, private fb: FormBuilder, private taskService: TaskService) {
  }

  taskForm!: FormGroup;
  public error: boolean = false;
  public errorMessage: string = '';
  ngOnInit()
  {
    this.taskForm = this.fb.group({
      name: [''],
      dueDate: [''],
      description: [''],
      status: [''],
      creatorEmail: [this.dialogData.user_email],
      eventName: [this.dialogData.eventName],
      assignees: this.fb.array([])
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

  // Method to handle form submission
  // onSubmit() {
  //   if (this.taskForm.valid) {
  //     // Perform the necessary actions with the form data
  //     console.log(this.taskForm.value);
  //   }
  // }

  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';
  }
  addTask() {
    const newTask: Task = this.taskForm.getRawValue();
    const year = newTask.dueDate.getFullYear();
    const month = String(newTask.dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(newTask.dueDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
      const task ={
        name: newTask.name,
        description: newTask.description,
        dueDate: formattedDate,
        status: newTask.status,
        creatorEmail: newTask.creatorEmail,
        eventName: newTask.eventName,
        assignees: newTask.assignees
      };


    this.taskService.createTask(newTask.eventName, task).subscribe({
      next: value => {
        console.log(value);
        const newRow = {name: newTask.name, due_date: formattedDate, status: newTask.status};
        this.task_row.emit(newRow);
        this.taskForm.reset();
      },
      error: err => {
        console.log(err);
        this.showError(err.error.Message);
      }
    })


  }
}
