import { Component, inject, OnInit } from '@angular/core';
import { InstitutemasterService } from '../../core/services/institute/institutemaster.service';
import { IApiModel } from '../../core/model/interfaces/APIResponse';
import { instituteModel } from '../../core/model/classes/institute';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/message/toast.service';
import { ToastMessages } from '../../core/constant/Constant'; 
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-institutemaster',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './institutemaster.component.html',
  styleUrl: './institutemaster.component.css',
})
export class InstitutemasterComponent implements OnInit {

  InstituremasterServ = inject(InstitutemasterService);
  toast = inject(ToastService);
  router=inject(Router)


  ngOnInit(): void {
    this.loadInstitute();
  }

  newInstituteMasterObj: instituteModel = new instituteModel();

  instituteMasterList: instituteModel[] = [];

  newInstituMasterForm: FormGroup = new FormGroup({
    instituteId: new FormControl(0),
    name: new FormControl(''),
    conatctNo: new FormControl(''),
    emailId: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
    state: new FormControl(''),
    location: new FormControl(''),
    ownerName: new FormControl(''),
    createdDate: new FormControl( new Date().toISOString().split('T')[0], Validators.required),
    gstNo: new FormControl(''),
  });

  loadInstitute() {
    console.log('institure master ');
    this.InstituremasterServ.getAllInstituteMaster().subscribe({
      next: (result: IApiModel) => {
        this.instituteMasterList = result.data;        
      },
      error: (error: IApiModel) => {
        console.error('Error loading packages:', error);        
      },
    });
  }

  OpenInstitureForm(){    
    this.router.navigate(['instituteForm']);
  }
  

  onEdit(id: number) {
    this.router.navigate(['instituteForm'], {
    queryParams: { 
      instituteId: id
    }
  });
  }

  

  onDeleteInstitute(id: number) {   
    const isDelete = confirm('Are you sure want to Delete');
    if (isDelete) {
      this.InstituremasterServ.deleteInstituteMaster(id).subscribe({
        next: (result: IApiModel) => {
          this.toast.showSuccess(ToastMessages.DELETE_SUCCESS);
          this.loadInstitute();
        },
        error: (error: IApiModel) => {
          this.toast.showError(ToastMessages.ERROR);
        },
      });
    }
  }

  filterInstitute(){
    debugger
  }
  
}
