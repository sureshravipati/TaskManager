import { Injectable } from '@angular/core';
import { taskData, Task } from '../Models/task';
import { HttpClient } from '@angular/common/http';
import { constantval } from  '../constents'
@Injectable({
  providedIn: 'root'
})

export class SharedService {

  taskdata: any;
  taskList: any;
  baseUrl=constantval.baserUrl+constantval.serviceUrl;

constructor(private httpServ: HttpClient) { }
  
  addTaskUri = this.baseUrl+"AddTask";
  AddTask(data: Task) {
    return this.httpServ.post(this.addTaskUri, data);
  }

  getParentTaskUri = this.baseUrl+"ParentTask";
  GetParentTask(){
    return this.httpServ.get(this.getParentTaskUri);
  }

  getTaskListUri = this.baseUrl+"GetTaskList";

  GetTaskList(){
    return this.httpServ.get(this.getTaskListUri);
  }

  getTaskUri = this.baseUrl+"GetTaskById";
  GetTaskById(Id:number){
    return this.httpServ.get(this.getTaskUri+ "/"+Id);
  }

  updateTaskUri = this.baseUrl+"UpdateTask";
  UpdateTask(data: Task) {
    return this.httpServ.post(this.updateTaskUri, data);
  }

  endTaskUri = this.baseUrl+"EndTask";
  EndTask(data:Task){
    return this.httpServ.post(this.endTaskUri,data);
  }
  loginuri=constantval.baserUrl+"/login";
  login(username:string,password:String){
    return this.httpServ.post(this.loginuri, {"userId":username,"password":password});
  }
  adduserUri=constantval.baserUrl+"/addUser";
  signup(username:string,password:String){
    return this.httpServ.post(this.adduserUri, {"userId":username,"password":password});
  }
  
}
