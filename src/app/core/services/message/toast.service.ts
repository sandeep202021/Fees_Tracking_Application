import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastMessages } from '../../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  showSuccess(messageObj = ToastMessages.SAVE_SUCCESS) {
    this.toastr.success(messageObj.message, messageObj.title);
  }

  showError(messageObj = ToastMessages.ERROR) {
    this.toastr.error(messageObj.message, messageObj.title);
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }
  
  show(key: 'save' | 'update' | 'delete' | 'error') {
    switch (key) {
      case 'save':
        this.showSuccess(ToastMessages.SAVE_SUCCESS); break;
      case 'update':
        this.showSuccess(ToastMessages.UPDATE_SUCCESS); break;
      case 'delete':
        this.showSuccess(ToastMessages.DELETE_SUCCESS); break;
      default:
        this.showError(); break;
    }
  }
}
