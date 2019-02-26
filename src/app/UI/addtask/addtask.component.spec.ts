import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { AddtaskComponent } from './addtask.component';
import {RouterTestingModule} from '@angular/router/testing'
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../Services/shared.service';
import {HttpModule} from '@angular/http';
import { Http, Response } from '@angular/http';
import { Task } from './../../Models/task';
import { ResponseOptions, XHRBackend } from '@angular/http';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;
  let response :any;
  let mockResponse:any;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskComponent ],
      imports : [FormsModule,RouterTestingModule,HttpModule],
      providers : [SharedService,{ provide: XHRBackend, useClass: MockBackend }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have Reset', () => {
   component.Reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have Add', () => {
   component.Add();
  });
  
  it('should have View Task', () => {
    component.ViewTask();
  });
  

it('should add new task service',inject([SharedService], (service : SharedService) => {
  expect(service).toBeTruthy();

  let  taskData = new Task()
  taskData.taskName = "Test task one";
  taskData.parentId = null;
  taskData.startDate = '2018-08-25';
  taskData.endDate = '2018-08-30';
  taskData.priority = 5;

  service.AddTask(taskData).subscribe((res: Response) => {
    response = res.json();
  expect(response).toBeTruthy;
  });

  const element = fixture.nativeElement;
  fixture.detectChanges();
}));

it('Add New task ', inject([XHRBackend], (mockBackend : MockBackend) => {

	component.taskName =null;
    component.pTaskName ='Task';
    component.priority= 1;   
    component.sDate =null;
    component.eDate=null;  
    component.pTaskId = 1; 
   
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
	component.AddTask();   
	
    component.taskName ='Task';  
    component.sDate ='2018-10-10';
    component.eDate='2018-10-10';  	
    mockResponse = true; 
	mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });		    
   component.AddTask();   
  }));  

});
