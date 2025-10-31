import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterModel } from '../../../core/model/classes/master';
import { MasterServiceService } from '../../../core/services/master/master-service.service';
import { IApiModel } from '../../../core/model/interfaces/APIResponse';

@Component({
  selector: 'app-master',
  imports: [FormsModule, CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent implements OnInit {


  newMasterObj: MasterModel = new MasterModel();
  masterForOptions: string[] = ['PaymentMode', 'RefrenceBy', 'Student Status', 'Fee Type'];

  masterServ = inject(MasterServiceService)
  masterList: MasterModel[] = [];

  ngOnInit(): void {
    this.loadMaster();
  }

  loadMaster() {
    this.masterServ.getAllMaster().subscribe({
      next: (result: IApiModel) => {
        this.masterList = result.data;
        debugger
      }
    })
  }

  onSaveMaster() {
    this.masterServ.saveMaster(this.newMasterObj).subscribe({
      next: (result: IApiModel) => {
        alert("save successful");
        this.loadMaster();
        this.onCancel()
      },
      error: (err: any) => {

      }
    })
  }

  onEdit(data: MasterModel) {
    this.newMasterObj = data;
  }

  onUpdateMaster() {
    this.masterServ.updateMaster(this.newMasterObj.masterId, this.newMasterObj).subscribe({
      next: (result: IApiModel) => {
        alert("successfully updated record");
        this.loadMaster();
        this.onCancel() ;
      },
      error: (error: IApiModel) => {
        alert(error.message);
      }
    })
  }

  onDeleteCard(id: number) {
    const isDelete = confirm("Are you sure want to Delete");

    if (isDelete) {
      this.masterServ.deleteMaster(id).subscribe({
        next: (result: IApiModel) => {
          alert("successfully deleted");
          this.loadMaster();
        },
        error: (error: IApiModel) => {
          alert(error.message);
        }
      })
    }
  }

  onPaymentMode(name: string) {
  this.masterServ.filterMaster(name).subscribe({
    next: (res) => {
      console.log('Filter API success:', res);
      
    },
    error: (err) => {
      console.error('Error fetching filter data:', err);
    }
  });
}


  onCancel() {
    this.newMasterObj = new MasterModel();
  }

}
