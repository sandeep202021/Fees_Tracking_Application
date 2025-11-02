import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { loginModel } from '../../../core/model/classes/master';
import { MasterServiceService } from '../../../core/services/master/master-service.service';
import { Router } from '@angular/router';
import { JsonpInterceptor } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: loginModel = new loginModel();
  masterServ = inject(MasterServiceService);
  router = inject(Router)
  toastr = inject(ToastrService);

  onLogin() {
    this.toastr.info('Logging in...', 'Please wait');
    this.masterServ.login(this.loginObj).subscribe({
      next: (res: any) => {
        debugger
        this.toastr.clear(); // Clear previous toasts
        this.toastr.success('Welcome!', 'LogIn Successful!');
       localStorage.setItem('loginUser',JSON.stringify(res));
        // localStorage.setItem('token', res.token)      
        this.router.navigateByUrl("master");
      },
      error: (error: any) => {
        this.toastr.clear(); // Clear loading toast
        this.toastr.error(error.error.message, 'Login Failed!');
        debugger;
      }
    })
  }
}

