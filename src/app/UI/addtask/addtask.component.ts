import { Component, OnInit, NgModule } from '@angular/core';
import { EdittaskComponent } from '../edittask/edittask.component';
import { SearchtaskComponent } from '../searchtask/searchtask.component';
import { RouterModule, Route, Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { Http, Response } from '@angular/http';
import { Task } from '../../Models/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  taskName: string;
  pTaskName: String;
  priority: number = 1;
  sDate: string;
  eDate: string;
  response: any;
  taskData: Task;
  pTaskId: number;
  ParentList: any;

  constructor(private _router: Router, public _service: SharedService) { }

  ngOnInit() {
    this.GetParentTask();
    this.pTaskId = null;

  }

  onLogout(){
    sessionStorage.setItem("OAUTH_KEY","");
    this._router.navigate(["login"]);
  }

  Reset() {
    this.taskName = "";
    this.pTaskName = "";
    this.priority = 1;
    this.sDate = null;
    this.eDate = null;
    this.pTaskId = null;
  }

  Add() {
    this._router.navigateByUrl('/Add');
  }

  ViewTask() {
    this._router.navigateByUrl('');
  }

  GetParentTask() {
    this._service.GetParentTask().subscribe((res: Response) => {
      this.ParentList = res;
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  AddTask() {

    this.taskData = new Task()
    this.taskData.taskName = this.taskName;
    this.taskData.parentId = this.pTaskId;
    this.taskData.startDate = this.sDate;
    this.taskData.endDate = this.eDate;
    this.taskData.priority = this.priority;

    if (this.taskName == null || this.sDate == null || this.eDate == null) {
      alert("Please enter Task, Start Date & End Date");
      return;
    }
    this._service.AddTask(this.taskData).subscribe((res: Response) => {
      this.response = res;
      if (this.response == true) {
        this._router.navigateByUrl('');
      } else {
        alert("Error in adding new task")
        this._router.navigateByUrl('');
      }
    }, error => {
      this._router.navigateByUrl('');
      console.log("Error While Processing Results");
    });
  }
}


