import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { Task } from '../../Models/task';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css'],
  providers:[SharedService,Task]
})
export class EdittaskComponent implements OnInit {

  
  taskName : string;
  pTaskName : String;
  pID: number;
  priority: number;
  sDate :string;
  eDate:string;
  editTaskData :any;
  taskData : any;
  response: any;
  taskId : number;
  ParentList : any;
  parent: any;


  constructor(private  _router:Router, public _service:SharedService) { }

  ngOnInit() {
    this.taskId = +this._router.url.substr(this._router.url.lastIndexOf('/')+1);
    this.GetTask();

   
  }

  onLogout(){
    sessionStorage.setItem("OAUTH_KEY","");
    this._router.navigate(["login"]);
  }
  GetTask() {

    this._service.GetParentTask().subscribe((res: Response) => {
      this.ParentList = res;
      this.ParentList = this.ParentList.filter(x => (x.Id != this.taskId));
    }, (error) => {
      console.log("Error While Processing Results");
    });

      this._service.GetTaskById(this.taskId).subscribe((res: Response) => {
      this.taskData = res;
      this.taskId = this.taskData.taskId;
      this.taskName = this.taskData.taskName;
      this.pTaskName = this.taskData.parentTask;
      this.priority = this.taskData.priority;
      this.sDate = this.taskData.startDate;
      this.eDate = this.taskData.endDate;
      this.pID = this.taskData.parentId
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  UpdateTask() {

    this.taskData.taskName = this.taskName;
    this.taskData.parentId = this.pID;
    this.taskData.taskId = this.taskId;
    this.taskData.startDate = this.sDate;
    this.taskData.endDate = this.eDate;
    this.taskData.priority = this.priority;

    if(this.taskName == null || this.sDate == null || this.eDate == null)
    {
      alert("Please enter Task, Start Date & End Date");
      return;
    }

    this._service.UpdateTask(this.taskData).subscribe((res: Response) => {
      this.response = res;
      if (this.response ==  true) {
        this._router.navigateByUrl('');
        } else {
          alert("Error in updating task")
        this._router.navigateByUrl('');
        }
    }, (error) => {
      this._router.navigateByUrl('');
      console.log("Error While Processing Results");
    });

  }

  Cancel(){
    this._router.navigateByUrl('');
  }

}
