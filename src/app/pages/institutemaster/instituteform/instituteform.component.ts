import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstitutemasterService } from '../../../core/services/institute/institutemaster.service';
import { ToastService } from '../../../core/services/message/toast.service';
import { Router } from '@angular/router';
import { instituteModel } from '../../../core/model/classes/institute';
import { IApiModel } from '../../../core/model/interfaces/APIResponse';
import { ToastMessages } from '../../../core/constant/Constant';

@Component({
  selector: 'app-instituteform',
  imports: [ReactiveFormsModule],
  templateUrl: './instituteform.component.html',
  styleUrl: './instituteform.component.css'
})
export class InstituteformComponent {

  InstituremasterServ = inject(InstitutemasterService);  
  toast = inject(ToastService);
  router=inject(Router)

  newInstituteMasterObj: instituteModel = new instituteModel();
  
  newInstituMasterForm: FormGroup = new FormGroup({
    instituteId: new FormControl(0),
    name: new FormControl('', Validators.required),
    conatctNo: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    createdDate: new FormControl( new Date().toISOString().split('T')[0], Validators.required),
    gstNo: new FormControl('', Validators.required),
  });

   savaeInstitute() {
      debugger;
      this.newInstituteMasterObj = this.newInstituMasterForm.value;
      this.InstituremasterServ.createNewInstituteMaster(
        this.newInstituteMasterObj
      ).subscribe({
        next: (result: IApiModel) => {
         this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);          
        },
        error: (error: IApiModel) => {          
          this.toast.showError(ToastMessages.ERROR);
        },
      });
      setTimeout(() => {   
        this.router.navigate(['institute']);
        }, 1000);      
    }

    backToInstitute(){
      this.router.navigate(['institute']);
    }
   
  onCancel() {
    this.newInstituMasterForm.reset();   
  }
  
}
