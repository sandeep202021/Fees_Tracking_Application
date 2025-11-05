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


@Component({
  selector: 'app-institutemaster',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './institutemaster.component.html',
  styleUrl: './institutemaster.component.css',
})
export class InstitutemasterComponent implements OnInit {

  InstituremasterServ = inject(InstitutemasterService);
  toast = inject(ToastService);


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
        console.log(this.instituteMasterList);
        debugger;
      },
      error: (error: IApiModel) => {
        console.error('Error loading packages:', error);        
      },
    });
  }
 

  savaeInstitute() {
    debugger;
    this.newInstituteMasterObj = this.newInstituMasterForm.value;
    this.InstituremasterServ.createNewInstituteMaster(
      this.newInstituteMasterObj
    ).subscribe({
      next: (result: IApiModel) => {
       this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);
        this.loadInstitute();
        this.onCancel();
      },
      error: (error: IApiModel) => {
        console.error(error.message);
        this.toast.showError(ToastMessages.ERROR);
      },
    });
  }

  onEdit(data: instituteModel) {
    this.newInstituteMasterObj = data;
    this.newInstituMasterForm.patchValue({
      instituteId: data.instituteId,
      name: data.name,
      conatctNo: data.conatctNo,
      emailId: data.emailId,
      city: data.city,
      pincode: data.pincode,
      state: data.state,
      location: data.location,
      ownerName: data.ownerName,
      createdDate: data.createdDate,
      gstNo: data.gstNo,
    });
  }

  UpdateInstitute() {
    debugger;
    const updateformsdata = this.newInstituMasterForm.value;
    this.InstituremasterServ.updateNewInstituteMaster(
      updateformsdata.instituteId,
      updateformsdata
    ).subscribe({
      next: (result: IApiModel) => {
        this.toast.showSuccess(ToastMessages.UPDATE_SUCCESS);
        this.loadInstitute();
        this.onCancel();
      },
      error: (error: IApiModel) => {
        this.toast.showError(ToastMessages.ERROR);
      },
    });
  }

  onDeleteInstitute(id: number) {
    debugger;
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

  onCancel() {
    debugger;
    this.newInstituMasterForm.reset();
  }
}
