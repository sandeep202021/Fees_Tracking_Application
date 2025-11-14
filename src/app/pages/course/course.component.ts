import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../core/services/course/course.service';
import { IApiModel } from '../../core/model/interfaces/APIResponse';
import { courseModel } from '../../core/model/classes/course';
import { CurrencyPipe } from '@angular/common';
import { ToastMessages } from '../../core/constant/Constant';
import { ToastService } from '../../core/services/message/toast.service';
import { InstitutemasterService } from '../../core/services/institute/institutemaster.service';
import { instituteModel } from '../../core/model/classes/institute';

@Component({
  selector: 'app-course',
  imports: [ReactiveFormsModule ,CurrencyPipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  
  ngOnInit(): void {
      this.loadingCourse();
      this.loadInstitute();
  }

  courseForm: FormGroup;
  courseList: courseModel [] = [];
  instituteMasterList: instituteModel[] = [];
  newCourseObj: courseModel = new courseModel;

   CourseServ = inject(CourseService)
   InstituremasterServ = inject(InstitutemasterService);
   toast = inject(ToastService);

  constructor(private formBuilder: FormBuilder){
    this.courseForm=this.formBuilder.group({
        courseId: [''],
        courseName: ['',Validators.required],
        courseCost: ['',[Validators.required, Validators.min(1)]],
        //creratedDate: [''],
        isActive: [true],
        duration: ['',Validators.required],
        instituteId: ['',Validators.required],
        courseDescription:['',Validators.required],
    })
  }

  onCancel() {
  this.courseForm.reset();
  }

  loadInstitute() {
    console.log('institure master ');
    this.InstituremasterServ.getAllInstituteMaster().subscribe({
      next: (result: IApiModel) => {
        this.instituteMasterList = result.data;        
      },
      error: (error: IApiModel) => {
        this.toast.showError(ToastMessages.ERROR);        
      },
    });
  }
  
  loadingCourse(){
    this.CourseServ.getAllCourse().subscribe({
      next:(result:any)=>{
        this.courseList=result;
      },
      error:(error:IApiModel)=>{
         console.error('Error loading packages:', error);   
      }
    })
  }

  onSubmit() {
      console.log('Form Submitted:', this.courseForm.value); 
      this.newCourseObj = this.courseForm.value;
      this.CourseServ.CreateNewCourse(this.newCourseObj).subscribe({
        next: (result: any) => {
                 this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);   
                 this.loadingCourse();
                 this.onCancel();       
        },
        error: (error: any) => {          
        this.toast.showError(ToastMessages.ERROR);
        }
      })         
  }

  onEdit(data:courseModel){
    debugger
    this.newCourseObj=data;
     this.courseForm.patchValue({
        courseId: data.courseId,
        courseName: data.courseName,
        courseCost: data.courseCost,
        duration: data.duration,
        instituteId: data.instituteId,
        isActive: data.isActive,
        courseDescription: data.courseDescription
        });
        debugger
  }

  onUpdate(){
    debugger
    const formsdata = this.courseForm.value;
    this.CourseServ.UpdateCourse(formsdata.courseId,formsdata).subscribe({
      next: (result: any) => {
          this.toast.showSuccess(ToastMessages.UPDATE_SUCCESS);
          debugger
          this.loadingCourse();
           this.onCancel();  
        },
        error: (error: any) => {
          this.toast.showError(ToastMessages.ERROR);
        },
    })
    debugger
  }

  onDelete(id:number){
    alert("hello")
    this.CourseServ.DeleteCourse(id).subscribe({
      next: (result: any) => {
          this.toast.showSuccess(ToastMessages.DELETE_SUCCESS);
          this.loadingCourse();
        },
        error: (error: any) => {
          this.toast.showError(ToastMessages.ERROR);
        },
    })
  }

}
