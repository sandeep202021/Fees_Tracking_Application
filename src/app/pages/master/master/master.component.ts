import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterModel } from '../../../core/model/classes/master';
import { MasterServiceService } from '../../../core/services/master/master-service.service';
import { IApiModel } from '../../../core/model/interfaces/APIResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-master',
  imports: [FormsModule, CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent implements OnInit {
  
   @ViewChild('masterModal') masterModal!: ElementRef;

  newMasterObj: MasterModel = new MasterModel();
  masterForOptions: string[] = ['PaymentMode', 'RefrenceBy'];

  masterServ = inject(MasterServiceService)
  toastr = inject(ToastrService);
  

  masterList: MasterModel[] = [];
  filteredMasterList: MasterModel[] = [];
  currentFilter: string = 'All';

  ngOnInit(): void {
    this.loadMaster();
  }

  loadMaster() {
    this.masterServ.getAllMaster().subscribe({
      next: (result: IApiModel) => {
        this.masterList = result.data;
        this.filteredMasterList = [...this.masterList];
        debugger
      }
    })
  }

  onSaveMaster() {
    this.masterServ.saveMaster(this.newMasterObj).subscribe({
      next: (result: IApiModel) => {
        //alert("save successful");
        this.toastr.success("Save Data Successful",'save')
        this.loadMaster();
        this.onCancel();
        this.closeModal();
      },
      error: (error: IApiModel) => {
         this.toastr.error(error.message, 'Can not delete!');        
      }
    })
  }

  onEdit(data: MasterModel) {
    this.newMasterObj = data;
  }

  onUpdateMaster() {
    this.masterServ.updateMaster(this.newMasterObj.masterId, this.newMasterObj).subscribe({
      next: (result: IApiModel) => {
       // alert("successfully updated record");
       this.toastr.success("Update Data Successful",'Upsate')
        this.loadMaster();
        this.onCancel() ;
        this.closeModal();
      },
      error: (error: IApiModel) => {
        //alert(error.message);
         this.toastr.error(error.message, 'Can not Save');
      }
    })
  }

  onDeleteCard(id: number) {
    const isDelete = confirm("Are you sure want to Delete");

    if (isDelete) {
      this.masterServ.deleteMaster(id).subscribe({
        next: (result: IApiModel) => {
         this.toastr.success("Delete Data Successful",'Deleted')
          this.loadMaster();
        },
        error: (error: IApiModel) => {
         // alert(error.message);
         this.toastr.error(error.message, 'Can not delete!');
        }
      })
    }
  }

  onPaymentMode(name: string) {
  this.currentFilter = name;  
  this.masterServ.filterMaster(name).subscribe({
    next: (res: IApiModel) => {
      
      this.filteredMasterList = res.data;      
    },
    error: (error: IApiModel) => {
          alert(error.message);
        }
  });
}

 onShowAll() {
    this.currentFilter = 'All';
    this.filteredMasterList = [...this.masterList];
  }

  onCancel() {
    this.newMasterObj = new MasterModel();
  }

   private closeModal() {
  // Find the close button in the modal and trigger click
  const modalElement = this.masterModal.nativeElement;
  const closeButton = modalElement.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
  
  if (closeButton) {
    closeButton.click();
  } else {
    // Fallback to manual cleanup
    this.manualModalCleanup();
  }
}
private manualModalCleanup() {
  const modalElement = this.masterModal.nativeElement;
  
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
