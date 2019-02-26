import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Task, taskData } from '../../Models/task';
import { Router } from '@angular/router';
import { SearchtaskComponent } from './searchtask.component';
import {RouterTestingModule} from '@angular/router/testing'
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../Services/shared.service';
import {HttpModule} from '@angular/http';
import { Http, Response } from '@angular/http';

describe('SearchtaskComponent', () => {
  let component: SearchtaskComponent;
  let fixture: ComponentFixture<SearchtaskComponent>;
  let taskList : any;
  let parentList : any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchtaskComponent],
      imports: [RouterTestingModule, FormsModule, HttpModule],
      providers: [SharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	 component.taskList=[
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
            },
            {
                taskName: 'text 3',
				parentTask: 'text 1',
				startDate: '2018-10-10',
				endDate: '2018-10-10',
				priority: 1,
				parentTaskId: 2,
				taskId: 2,
				parentId: 2,
				isTaskEnded : 1
            }
        ];
		component.taskName='text 2';
		component.pTaskName='text 2';
		component.priorityTo=1;
		component.priorityFrom=0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Search ByDate', () => {
    component.SearchByDate();	
	component.startDate=new Date('2018-11-12T00:00:00');
	component.endDate=new Date('2018-11-15T00:00:00');
	component.SearchByDate();	
	component.startDate=new Date('2018-11-12T00:00:00');
	component.endDate=null;
	component.SearchByDate();
	component.startDate=null;
	component.endDate=new Date('2018-11-15T00:00:00');
	component.SearchByDate();	
  });
  it('Search ByPriority', () => {
    component.SearchByPriority();	
	component.priorityTo=null;
	component.SearchByPriority();
	component.priorityTo=2;
	component.priorityFrom=null;
	component.SearchByPriority();
	component.priorityFrom=null;
	component.priorityTo=null;
	component.SearchByPriority();
  });
  
  it('Search ByTask', () => {   
    component.SearchByTask();	
  });
  it('Search ByParent Task', () => {
    component.SearchByParentTask();	
  });

  it('End Task', () => {
    component.EndTask('{}');	
  });
  
  it('Add Task', () => {
    component.AddTask();	
  });
  
  it('View Task', () => {
    component.ViewTask();	
  });
  
  it('Edit Task', () => {
    component.EditTask({'taskId':1});	
  });
  
  it('should load task list',inject([SharedService], (service : SharedService) => {
    expect(service).toBeTruthy();

    service.GetTaskList().subscribe((res: Response) => {
      taskList = res.json();
    expect(taskList.length).toBeGreaterThanOrEqual(0);
    });

    const element = fixture.nativeElement;
    fixture.detectChanges();
}));


it('should load parent list',inject([SharedService], (service : SharedService) => {
  expect(service).toBeTruthy();

  service.GetParentTask().subscribe((res: Response) => {
    parentList = res.json();
  expect(parentList.length).toBeGreaterThanOrEqual(0);
  });

  const element = fixture.nativeElement;
  fixture.detectChanges();
}));

onLogout(){
  sessionStorage.setItem("OAUTH_KEY","");
  this._router.navigate(["login"]);
}
  
});
