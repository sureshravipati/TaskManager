import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { EdittaskComponent } from './edittask.component';
import {RouterTestingModule} from '@angular/router/testing'
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../Services/shared.service';
import {HttpModule} from '@angular/http';
import { Http, Response } from '@angular/http';
import { Task } from './../../Models/task';
import { ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('EdittaskComponent', () => {
  let component: EdittaskComponent;
  let fixture: ComponentFixture<EdittaskComponent>;
  let response :any;
  let mockResponse:any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittaskComponent ],
      imports : [FormsModule,RouterTestingModule,HttpModule],
      providers : [SharedService,{ provide: XHRBackend, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Cancel', () => {
    component.Cancel();
  });
  
  it('should update task',inject([SharedService], (service : SharedService) => {
    expect(service).toBeTruthy();
  
    let  taskData = new Task()
    taskData.taskName = "Test New 1";
    taskData.parentId = 1;
    taskData.startDate = '2018-08-25';
    taskData.endDate = '2018-08-30';
    taskData.priority = 10;
    taskData.taskId = 2;
  
    service.UpdateTask(taskData).subscribe((res: Response) => {
      response = res.json();
    expect(response).toBeTruthy;
    });
  
    const element = fixture.nativeElement;
    fixture.detectChanges();
  }));
  
  it('Update Task', inject([XHRBackend], (mockBackend : MockBackend) => {
   component.taskData = {
                taskName: 'text 2',
				parentTask: 'text 1',
				startDate: '2018-10-10',
				endDate: '2018-10-10',
				priority: 1,
				parentTaskId: 1,
				taskId: 2,
				parentId: 1,
				isTaskEnded : 1
            };  	
   component.taskName =null;
   component.pTaskName ='Task';
   component.pID= 1;
   component.priority= 21;
   component.sDate =null;
   component.eDate=null;  
   component.taskId = 1;   
   component.parent= 1;
   component.UpdateTask();		
   mockResponse = true;	
	mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });		
   component.taskName ='Task';  
   component.sDate ='2018-10-10';
   component.eDate='2018-10-10';    
   component.UpdateTask();   
   
  })); 
  
  it('Update Task faild', inject([XHRBackend], (mockBackend : MockBackend) => {
   component.taskData = {
                taskName: 'text 2',
				parentTask: 'text 1',
				startDate: '2018-10-10',
				endDate: '2018-10-10',
				priority: 1,
				parentTaskId: 1,
				taskId: 2,
				parentId: 1,
				isTaskEnded : 1
            };  	
   component.taskName =null;
   component.pTaskName ='Task';
   component.pID= 1;
   component.priority= 21;
   component.sDate =null;
   component.eDate=null;  
   component.taskId = 1;   
   component.parent= 1;
   component.UpdateTask();
    mockResponse = false;	
	mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });		
   component.taskName ='Task';  
   component.sDate ='2018-10-10';
   component.eDate='2018-10-10';    
   component.UpdateTask();   
  }));  
  
  it('Get Task ', inject([XHRBackend], (mockBackend : MockBackend) => {
    mockResponse = [{
                taskName: 'text 2',
				parentTask: 'text 1',
				startDate: '2018-10-10',
				endDate: '2018-10-10',
				priority: 1,
				parentTaskId: 1,
				taskId: 1,
				parentId: 1,
				isTaskEnded : 1
            },
			{
                taskName: 'text 2',
				parentTask: 'text 1',
				startDate: '2018-10-10',
				endDate: '2018-10-10',
				priority: 1,
				parentTaskId: 1,
				taskId: 2,
				parentId: 1,
				isTaskEnded : 1
            }];  	
    component.taskId =1;    
	mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });		    
   component.GetTask();   
  }));  
  
});
