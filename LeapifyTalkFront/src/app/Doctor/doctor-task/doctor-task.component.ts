import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-doctor-task',
  templateUrl: './doctor-task.component.html',
  styleUrls: ['./doctor-task.component.css']
})
export class DoctorTaskComponent implements OnInit {

  task! : FormGroup;
  Taskdata : any;
  Checkbox : any;
  loggedInUser: any;

  constructor(private httpService: HttpService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe(
      (user)=>{
        this.loggedInUser = user;
      })

   this.task=this.fb.group({
      Note : ['',[]],
    })

    this.TaskData();
  }

TaskData()
{
   this.httpService.TaskData({email : this.loggedInUser.email}).subscribe(
   (data :any) => {
      this.Taskdata = data;
   })
}

checkbox(_id : any, check : any)
{
   if(check == '0')
   {
      var Check = {
         _id : _id,
         check : '1'
      }
   this.httpService.UpdateTask(Check).subscribe(
   (data :any) => {
      // this.Checkbox = data;
      this.TaskData();
   })
   }
   else if(check == '1')
   {
      var Check = {
         _id : _id,
         check : '0'
      }
   this.httpService.UpdateTask(Check).subscribe(
   (data :any) => {
      // this.Checkbox = data;
      this.TaskData();
   })
   }
}

DeleteTask(_id : any)
{
   this.httpService.DeleteTask({id : _id}).subscribe(
   (data :any) => {
      data;
      this.TaskData();
   })
}

Task(task : any)
{       
   if (task.valid)
   {
      var Task = {
         email : this.loggedInUser.email,
         note : this.task.value.Note,
         check : '0'

      }
      this.httpService.Task(Task).subscribe(
         (task : any) => {
         task;
        //  console.log(task,'Task');
        this.TaskData();
        this.task.reset();
         });
   }

}

}
