export interface Task{
  name: string;
  dueDate:Date;
  description: string;
  status: string;
  creatorEmail:string;
  eventName:string;
  assignees: any
}


// {
//   "name": "Order party cake",
//   "description": null,
//   "dueDate": "2023-06-14",
//   "status": "TO_DO",
//   "creatorEmail": "georgi@test.com",
//   "eventName": "Birthday party",
//   "assignees": []
// }
