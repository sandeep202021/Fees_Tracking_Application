import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { loginModel } from '../../../core/model/classes/master';
import { MasterServiceService } from '../../../core/services/master/master-service.service';
import { Router } from '@angular/router';
import { JsonpInterceptor } from '@angular/common/http';

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

  onLogin() {
   
    this.masterServ.login(this.loginObj).subscribe({
      next: (res: any) => {
        debugger
       localStorage.setItem('loginUser',JSON.stringify(res));
        // localStorage.setItem('token', res.token)

        this.router.navigateByUrl("master");
      },
      error: (error: any) => {
        alert(error.error.message);
        debugger
      }
    })
  }
}

