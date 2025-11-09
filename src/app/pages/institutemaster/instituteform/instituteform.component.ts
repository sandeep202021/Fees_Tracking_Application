import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstitutemasterService } from '../../../core/services/institute/institutemaster.service';
import { ToastService } from '../../../core/services/message/toast.service';
import { Router,ActivatedRoute  } from '@angular/router';
import { instituteModel } from '../../../core/model/classes/institute';
import { IApiModel } from '../../../core/model/interfaces/APIResponse';
import { ToastMessages } from '../../../core/constant/Constant';
import { take } from 'rxjs/operators';


@Component({
   standalone: true,  
  selector: 'app-instituteform',
  imports: [ReactiveFormsModule],
  templateUrl: './instituteform.component.html',
  styleUrl: './instituteform.component.css'
})
export class InstituteformComponent {

  InstituremasterServ = inject(InstitutemasterService);  
  toast = inject(ToastService);
  router=inject(Router)
  route=inject(ActivatedRoute)

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

 ngOnInit(): void {
 this.route.queryParamMap.pipe(take(1)).subscribe(qpm => {
  
  if (!qpm || !(qpm as any).has('instituteId')) {    
    return;
  }

  const idStr = qpm.get('instituteId');
  if (!idStr) {
    console.log('instituteId is empty');
    return;
  }

  const id = Number(idStr);
  if (Number.isNaN(id)) {
    return;
  }

  this.loadInstituteById(id);
});
}

private loadInstituteById(id: number) {
  if (!id || Number.isNaN(id) || id <= 0) {
    return;
  }

  this.InstituremasterServ.getInstituteMasterById(id).subscribe({
    next: (res: any) => {
      const institute = res?.data ?? res;
      if (institute) this.newInstituMasterForm.patchValue(institute);
      else this.toast.showError(ToastMessages.ERROR);
    },
    error: err => {
      this.toast.showError(ToastMessages.ERROR);
    }
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

    UpdateInstitute() {
    debugger;
    const updateformsdata = this.newInstituMasterForm.value;
    this.InstituremasterServ.updateNewInstituteMaster(updateformsdata.instituteId, updateformsdata).subscribe({
      next: (result: IApiModel) => {
        this.toast.showSuccess(ToastMessages.UPDATE_SUCCESS);
         this.router.navigate(['institute']);
      },
      error: (error: IApiModel) => {
        this.toast.showError(ToastMessages.ERROR);
      },
    });
  }
   

  onCancel() {
    this.newInstituMasterForm.reset();   
  }
  
}
