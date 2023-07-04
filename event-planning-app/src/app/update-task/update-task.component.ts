import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      dueDate: [this.task.dueDate, Validators.required],
      description: [this.task.description],
      status: [this.task.status, Validators.required],
      creatorEmail: [this.task.creatorEmail],
      eventName: [this.task.eventName],
      assignees: this.fb.array(this.task.assignees)
    });
  }

areFormArrayAndArrayEqual(formArray: FormArray, array: any[]): boolean {

  const formArrayValues = (this.taskForm.get('assignees') as FormArray).value;

  if (formArrayValues.length !== array.length) {
    return false;
  }

  for (let i = 0; i < formArrayValues.length; i++) {
    if (formArrayValues[i] != array[i]) {
      return false;
    }
  }

  // Arrays are equal
  return true;
}

get assignees() {
    return this.taskForm.get('assignees') as FormArray;
  }

  addAssignee() {
    this.assignees.push(this.fb.control('', Validators.required));
  }

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
    if(!this.taskForm.valid){
      return;
    }
    const newTask: Task = this.taskForm.getRawValue();

    let formattedDate:string;
    type taskJsonType = {[key: string] : string}
    const taskJSON:taskJsonType = { };

    if(newTask.assignees.length == 0)
    {
      this.showError("There should be at lest 1 assignee!");
      return;
    }
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

    if(!this.areFormArrayAndArrayEqual(newTask.assignees, this.task.assignees) && newTask.assignees.length > 0)
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
