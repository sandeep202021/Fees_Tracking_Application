import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { BranchesService } from '../../core/services/branch/branches.service';
import { ToastService } from '../../core/services/message/toast.service';
import { BranchesModel } from '../../core/model/classes/branches';
import { IApiModel } from '../../core/model/interfaces/APIResponse';
import { ToastMessages } from '../../core/constant/Constant'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InstitutemasterService } from '../../core/services/institute/institutemaster.service';
import { instituteModel } from '../../core/model/classes/institute';

@Component({
  selector: 'app-branchmaster',
  imports: [CommonModule],
  templateUrl: './branchmaster.component.html',
  styleUrl: './branchmaster.component.css'
})
export class BranchmasterComponent implements OnInit {

  branchServ =inject(BranchesService);
  InstituremasterServ = inject(InstitutemasterService);
  toast = inject(ToastService);

  ngOnInit(): void {
      this.loadBranches();
      this.loadInstitute();
  }

  branchMasterList: BranchesModel[] = [];  
  instituteMasterList: instituteModel[] = [];

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
  }

  loadBranches(){    
   this.branchServ.getAllBranches().subscribe({
    next:(result:any) => {
      this.branchMasterList=result;
      console.log(result);
    },
    error:(error:any) => {
      console.log("error in this component")
     this.toast.showError(ToastMessages.ERROR);
    }    
   })
   debugger
  }

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

}
