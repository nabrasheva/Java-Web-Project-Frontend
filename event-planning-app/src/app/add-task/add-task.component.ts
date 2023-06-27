import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {Task} from "../model/task";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  minDate: Date = new Date(Date.now());
  @Output() task_row = new EventEmitter<any>();

  taskForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      due_date: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl('')
    }
    // }, {
    //   validators: formValidator
    // }
  );

  addTask() {
    const newTask: Task = this.taskForm.getRawValue();

    const year = newTask.due_date.getFullYear();
    const month = String(newTask.due_date.getMonth() + 1).padStart(2, '0');
    const day = String(newTask.due_date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const newRow = {name: newTask.name, due_date: formattedDate, status: newTask.status};
    this.task_row.emit(newRow);
    this.taskForm.reset();

  }
}
