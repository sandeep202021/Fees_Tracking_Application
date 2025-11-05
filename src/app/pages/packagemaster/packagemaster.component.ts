import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PackageModel } from '../../core/model/classes/package';

import { IApiModel } from '../../core/model/interfaces/APIResponse';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PackagemasterService } from '../../core/services/packagemaster/packagemaster.service';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { YesNoPipe } from '../../shared/pipes/yes-no.pipe';

@Component({
  selector: 'app-packagemaster',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,YesNoPipe],
  templateUrl: './packagemaster.component.html',
  styleUrl: './packagemaster.component.css'
})
export class PackagemasterComponent implements OnInit {
  @ViewChild('packageModal') packageModal!: ElementRef;
  

  ngOnInit(): void {    
    this.loadPackages();
  }

  newPackageMasterObj: PackageModel = new PackageModel();
  packagemasterForOptions: string[] = ['Platinum', 'Diamond', 'Gold', 'Silver','Basic'];
  
    packagesServ = inject(PackagemasterService);
    toastr = inject(ToastrService);
    
  
    PackagesMasterList: PackageModel[] = [];
    
    newPackagemasterForm:FormGroup= new FormGroup({
          packageId: new FormControl(0),
          packageName: new FormControl('', [Validators.required, Validators.minLength(3)]),
          oneTimeTotalCost: new FormControl(0, [Validators.required, Validators.minLength(1)]),
          emiTotalCost: new FormControl(0, [Validators.required, Validators.minLength(1)]),
          maxBranches: new FormControl(0, [Validators.required, Validators.minLength(1)]),
          maxStudents: new FormControl(0, [Validators.required, Validators.minLength(1)]),
          isSmsAlert: new FormControl(false),
    });
    

    loadPackages() {
  this.packagesServ.getAllPackages().subscribe({
    next: (result: IApiModel) => {
      this.PackagesMasterList = result.data;        
    },
    error: (error:IApiModel) => {
      console.error('Error loading packages:', error);
      // Handle error appropriately
    }
  })
}

    onSavePackage(){
      debugger
    //  const formsValue= this.newPackagemasterForm.value;
    this.newPackageMasterObj= this.newPackagemasterForm.value;
     this.packagesServ.createNewPackagemaster(this.newPackageMasterObj).subscribe({
      next:(result:IApiModel)=>{
       //alert("package master successfully created");
       this.toastr.success("Save Data Successful",'save');
       this.loadPackages();
       this.onCancel();
      },
      error: (error: IApiModel) => {
         this.toastr.error(error.message, 'Can not delete!');       
      }
     })
     
    }

    onEdit(data:PackageModel){
      debugger
      this.newPackageMasterObj=data;
        this.newPackagemasterForm.patchValue({
        packageId: data.packageId,
        packageName: data.packageName,
        oneTimeTotalCost: data.oneTimeTotalCost,
        emiTotalCost: data.emiTotalCost,
        maxBranches: data.maxBranches,
        maxStudents: data.maxStudents,
        isSmsAlert: data.isSmsAlert
        });
    }
     
    onUpdatePackage(){
      debugger
       const formData = this.newPackagemasterForm.value;
      this.packagesServ.updateNewpackagemaster(formData.packageId,formData).subscribe({
        next:(result:IApiModel)=>{
         // alert("successfully updated");
          this.toastr.success("update Data Successful",'Update');
          this.loadPackages();
          this.onCancel();
          this.closeModal();
        },
        error:(error:IApiModel)=>{
          //alert(err.message);
          this.toastr.error(error.message);  
        }
      })
    }

    onDeletePackage(id:number){
      debugger
     const isDelete = confirm("Are you sure want to Delete")
     if(isDelete){
      this.packagesServ.deleteNewPackagemaster(id).subscribe({
        next:(result:IApiModel)=>{
          //alert("successfully deleted");
          this.toastr.success("Delete Data Successful",'Delete');
          this.loadPackages();          
        },
        error:(error:IApiModel)=>{
          //alert(error.message)
         this.toastr.error(error.message, 'Can not delete!');          }
      })
     } 
    }

    onCancel() {
      debugger
       this.newPackagemasterForm.reset();       
        //this.newPackageMasterObj = new PackageModel();
      }

     private closeModal() {
  // Find the close button in the modal and trigger click
  const modalElement = this.packageModal.nativeElement;
  const closeButton = modalElement.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
  
  if (closeButton) {
    closeButton.click();
  } else {
    // Fallback to manual cleanup
    this.manualModalCleanup();
  }
}
private manualModalCleanup() {
  const modalElement = this.packageModal.nativeElement;
  
  // Hide the modal
  modalElement.classList.remove('show');
  modalElement.style.display = 'none';
  
  // Clean up body
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  
  // Remove all backdrops
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => backdrop.remove());
  
  // Force reflow to ensure cleanup
  void modalElement.offsetHeight;
}

}
