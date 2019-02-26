import { Component, OnInit } from '@angular/core';
import { Task, taskData } from '../../Models/task';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchtask',
  templateUrl: './searchtask.component.html',
  styleUrls: ['./searchtask.component.css'],
  providers: [SharedService]
})
export class SearchtaskComponent implements OnInit {
  
  taskList: Task[];
  taskListFiltered: any;
  taskName: string;
  pTaskName: string;
  startDate: Date;
  endDate: Date;
  priorityFrom: number;
  priorityTo: number;
  response: any;
  userId:string;
  constructor(private _router: Router, public _service: SharedService) {
    this.GetTask();
   this.userId=sessionStorage.getItem("USER_ID");
  }

  GetTask() {
    this._service.GetTaskList().subscribe((taskList: Response) => {
      this.taskListFiltered =taskList;
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  ngOnInit() {
  }

  onLogout(){
    sessionStorage.setItem("OAUTH_KEY","");
    this._router.navigate(["login"]);
  }
  
  EditTask(data: any) {

    var taskId = data.taskId;
    this._router.navigateByUrl('/Edit/' + taskId);
  }

  EndTask(data: any) {
    this._service.EndTask(data).subscribe((res: Response) => {
      this.response = res;
      if (this.response.isTaskEnded == 1) {
        data.isTaskEnded = 1;
      } else {
        alert("Error in ending task");
      }
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  AddTask() {
    this._service.taskList = this.taskList;
    this._router.navigateByUrl('/Add');
  }

  ViewTask() {
    this._router.navigateByUrl('');
  }

}
