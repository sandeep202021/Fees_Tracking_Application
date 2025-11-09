import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BranchesService } from '../../core/services/branch/branches.service';
import { ToastService } from '../../core/services/message/toast.service';
import { BranchesModel } from '../../core/model/classes/branches';
import { IApiModel } from '../../core/model/interfaces/APIResponse';
import { ToastMessages } from '../../core/constant/Constant'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InstitutemasterService } from '../../core/services/institute/institutemaster.service';
import { instituteModel } from '../../core/model/classes/institute';
import { Subscription } from 'rxjs'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-branchmaster',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './branchmaster.component.html',
  styleUrl: './branchmaster.component.css'
})
export class BranchmasterComponent implements OnInit, OnDestroy {

  
  branchServ =inject(BranchesService);
  InstituremasterServ = inject(InstitutemasterService);
  toast = inject(ToastService);

  ngOnInit(): void {
      this.loadBranches();
      this.loadInstitute();
  }

  branchMasterList: BranchesModel[] = [];  
  instituteMasterList: instituteModel[] = [];
  subscriptionList: Subscription[] = [];

  loggedUser:any;

  selectedBranch: BranchesModel = new BranchesModel();


  newBranchMasterObj: BranchesModel = new BranchesModel();

  constructor(){
    const isLocalData = localStorage.getItem('InstituteData');
    if(isLocalData != null){
     this.loggedUser=JSON.parse(isLocalData);
    }
  }

  @ViewChild('formCol') formCol!: ElementRef;
  @ViewChild('tableCol') tableCol!: ElementRef;

  openForm() {
    const form = this.formCol.nativeElement;
    const table = this.tableCol.nativeElement;

    form.classList.remove('d-none');
    table.classList.remove('col-12');
    table.classList.add('col-8');
  }

  closeForm() {
    const form = this.formCol.nativeElement;
    const table = this.tableCol.nativeElement;

    form.classList.add('d-none');
    table.classList.remove('col-8');
    table.classList.add('col-12');

    this.onCancel();
  }

  newBranchMasterForm: FormGroup = new FormGroup({
    branchId: new FormControl(0),
    branchName: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl(''),
    location: new FormControl(''),
    instituteId: new FormControl(0),
    branchContactNo: new FormControl(''),
    branchEmail: new FormControl(''),
    branchCode: new FormControl( ''),    
  });

  loadBranches(){    
   const branch$ = this.branchServ.getAllBranches().subscribe({
    next:(result:any) => {
      this.branchMasterList=result;
      console.log(result);
    },
    error:(error:any) => {
      console.log("error in this component")
     this.toast.showError(ToastMessages.ERROR);
    }    
   })
   this.subscriptionList.push(branch$)
   debugger
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

  onGetBranchById(id: number) {
  this.branchServ.getBranchesByid(id).subscribe({
    next: (result: any) => {
      this.selectedBranch = result.data || result;      
    },
    error: (error: any) => {
      this.toast.showError(ToastMessages.ERROR);      
    }
  });
}


  onCreateBranch(){   
   const createbranch$ = this.newBranchMasterObj=this.newBranchMasterForm.value;
   this.branchServ.createNewBranches(this.newBranchMasterObj).subscribe({
    next: (result :any)=>{
     this.branchMasterList.push(result.data); 
     this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);     
    },
    error:(error: any)=>{
      this.toast.showError(ToastMessages.ERROR);
    }
   })
   this.subscriptionList.push(createbranch$)
   debugger
  }    

  onEdit(data: BranchesModel) {
       this.newBranchMasterObj = data;
       this.newBranchMasterForm.patchValue({     
       branchId: data.branchId,
       branchName: data.branchName,
       city: data.city,
       state: data.state,
       pincode: data.pincode,
       location: data.location,
       instituteId: data.instituteId,
       branchContactNo: data.branchContactNo,
       branchEmail: data.branchEmail,
       branchCode: data.branchCode,   
    });
     this.openForm();
  }

  onUpdateBranch(){
    debugger
    const formData = this.newBranchMasterForm.value;
    const updatebranch$ = this.branchServ.updateBranches(formData,formData.branchId).subscribe({
      next:(result : any)=>{
       this.toast.showSuccess(ToastMessages.UPDATE_SUCCESS);

       const index = this.branchMasterList.findIndex(
        (b) => b.branchId === formData.branchId
      );
      
      if (index !== -1) {
        this.branchMasterList[index] = { ...formData };
      }
      },
      error: (error: any)=>{
        this.toast.showError(ToastMessages.ERROR);
      }
    })
    this.onCancel();
    //this.loadBranches()
    this.subscriptionList.push(updatebranch$)
    debugger
  }

  onDeleteBranch(id:number){   
   const deletebranch$ = this.branchServ.deleteBranch(id).subscribe({
    next:(result: any) => {
     this.toast.showSuccess(ToastMessages.DELETE_SUCCESS);
     //this.loadBranches();
     this.branchMasterList = this.branchMasterList.filter(
        (branch) => branch.branchId !== id
      );
      debugger
    },
    error:(error: any ) => {
     this.toast.showError(ToastMessages.ERROR);
    }
   })
   this.subscriptionList.push(deletebranch$)
  }
  

  onCancel(){    
    this.newBranchMasterForm.reset();
  }

  ngOnDestroy(): void {
    //debugger;
    this.subscriptionList.forEach(sub => {
      sub.unsubscribe()
    })
}

}
