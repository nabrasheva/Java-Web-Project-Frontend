import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskRow} from "../model/task-row";
import {Task} from "../model/task";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {

  @Input() task!: TaskRow;
  @Output() task_row = new EventEmitter<any>();

  // minDate: Date = new Date(Date.now());

  taskForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.task = this.dialogData.task;
    this.taskForm = this.formBuilder.group({
      name: [this.task.name],
      due_date: [this.task.due_date],
      description: [''],
      status: [this.task.status]
    });
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

    let formattedDate;

    if(!this.areDatesEqual(new Date(newTask.dueDate), new Date(this.task.due_date)))
    {
      const year = newTask.dueDate.getFullYear();
      const month = String(newTask.dueDate.getMonth() + 1).padStart(2, '0');
      const day = String(newTask.dueDate.getDate()).padStart(2, '0');

      formattedDate = `${year}-${month}-${day}`;
    }
    else formattedDate = this.task.due_date;

    const newRow = {name: newTask.name, due_date: formattedDate, status: newTask.status};
    this.task_row.emit(newRow);
    this.taskForm.reset();
  }
}
